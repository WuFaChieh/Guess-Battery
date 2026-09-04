// Supabase Realtime matchmaking for 1v1 PK mode, with an automatic bot
// fallback so the mode always works even without a live opponent (or
// without Supabase configured at all).
//
// Requires a `matchmaking_queue` table with Realtime enabled — see
// supabase/matchmaking_queue.sql for the schema + RLS policies this expects.

import { supabase, isSupabaseConfigured } from './supabase';
import { getBotProfile, PlayerProfile, BotDifficulty } from './aiBots';
import { MATCHMAKING_TIMEOUT_MS } from '../constants/gameConfig';
import { Language, translate } from '../i18n/translations';
import type { RealtimeChannel } from '@supabase/supabase-js';

const QUEUE_TABLE = 'matchmaking_queue';

// A newly-matched real opponent has no stored avatar in matchmaking_queue
// (the table only tracks identity + status), so this fills PlayerProfile's
// required `avatar` field for that path.
const DEFAULT_PLAYER_AVATAR = '🙂';

/** Lifecycle of a `matchmaking_queue` row. */
export type QueueStatus = 'searching' | 'matched' | 'cancelled';

export interface MatchRoomData {
  roomId: string;
  isBot: boolean;
  opponent: PlayerProfile;
  /** The queue row this player owns — present only for real (non-bot) matches. */
  queueEntryId?: string;
  /** Present only for bot matches, so the caller can pace the bot's reply accordingly. */
  botDifficulty?: BotDifficulty;
}

interface QueueRow {
  id: string;
  user_id: string;
  player_name: string;
  status: QueueStatus;
  matched_with: string | null;
  room_id: string | null;
  created_at: string;
}

interface QueueInsertPayload {
  user_id: string;
  player_name: string;
  status: QueueStatus;
}

interface QueueMatchUpdate {
  status: QueueStatus;
  matched_with: string;
  room_id: string;
}

function generateRoomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for non-secure contexts where crypto.randomUUID is unavailable.
  return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// Is `self` the newer of the two rows? Used to decide which side of a pair
// attempts the claim below — see the comment there. Two rows landing with
// the *identical* created_at (confirmed to happen in practice: Postgres's
// now() resolution can tie for requests that arrive close enough together)
// would make a plain `<` comparison false on both sides, so neither side
// ever claims and both sit waiting until the timeout. `id` (a uuid, unique
// per row) breaks the tie the same way on both sides — whichever side's own
// id compares greater considers itself newer — since both sides are
// comparing the same two ids, exactly one of them wins.
function isNewer(self: Pick<QueueRow, 'id' | 'created_at'>, other: Pick<QueueRow, 'id' | 'created_at'>): boolean {
  if (self.created_at !== other.created_at) return self.created_at > other.created_at;
  return self.id > other.id;
}

/**
 * Creates a local bot opponent + room. Used both as the matchmaking timeout
 * fallback and as the immediate fallback when Supabase isn't reachable.
 */
export function spawnBotMatch(difficulty: BotDifficulty = 'medium', lang: Language = 'zh'): MatchRoomData {
  const bot = getBotProfile(lang);
  return {
    roomId: `bot_${generateRoomId()}`,
    isBot: true,
    opponent: bot,
    botDifficulty: difficulty
  };
}

/**
 * Joins the Supabase `matchmaking_queue`, listens via Realtime for up to
 * MATCHMAKING_TIMEOUT_MS for a real player to be paired against, and
 * automatically spawns a bot match if nobody shows up in time — or
 * immediately if Supabase isn't configured/reachable at all.
 *
 * Returns a `cancel()` function; call it (e.g. from a React effect's cleanup)
 * to stop searching and tear down the timer/subscription before a match is
 * found, so no stale callback fires after the caller has moved on.
 */
export function startMatchmaking(
  userId: string,
  playerName: string,
  onMatched: (roomData: MatchRoomData) => void,
  lang: Language = 'zh'
): () => void {
  let settled = false;
  let cancelled = false;
  let channel: RealtimeChannel | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let pollIntervalId: ReturnType<typeof setInterval> | null = null;
  let queueEntryId: string | null = null;

  const teardown = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (pollIntervalId) {
      clearInterval(pollIntervalId);
      pollIntervalId = null;
    }
    if (channel && supabase) {
      supabase.removeChannel(channel);
      channel = null;
    }
  };

  const finish = (roomData: MatchRoomData) => {
    if (settled || cancelled) return;
    settled = true;
    teardown();
    onMatched(roomData);
  };

  const fallbackToBot = async () => {
    if (settled || cancelled) return;
    // Mark our own queue entry as cancelled so it stops showing up as an
    // open opponent for players who search after we've already left.
    if (queueEntryId && supabase) {
      try {
        // Guarded on our row still being 'searching': without this, a side
        // that times out right after actually being claimed by a real
        // opponent (status already flipped to 'matched' server-side) would
        // stomp its own row back to 'cancelled' — harmless to either
        // player's in-memory session by that point, but it corrupts the
        // queue table's history of what really happened.
        await supabase
          .from(QUEUE_TABLE)
          .update({ status: 'cancelled' satisfies QueueStatus })
          .eq('id', queueEntryId)
          .eq('status', 'searching' satisfies QueueStatus);
      } catch (e) {
        console.debug('[matchmaking] cleanup error:', e);
      }
    }
    finish(spawnBotMatch('medium', lang));
  };

  const cancel = () => {
    cancelled = true;
    teardown();
  };

  if (!isSupabaseConfigured || !supabase) {
    // No backend configured — skip straight to a bot instead of burning the
    // full timeout on a connection that can never succeed.
    finish(spawnBotMatch('medium', lang));
    return cancel;
  }

  const client = supabase;

  (async () => {
    try {
      // 1. Join the queue.
      const insertPayload: QueueInsertPayload = { user_id: userId, player_name: playerName, status: 'searching' };
      const { data: inserted, error: insertError } = await client
        .from(QUEUE_TABLE)
        .insert(insertPayload)
        .select<'*', QueueRow>()
        .single();

      if (cancelled) return;
      if (insertError || !inserted) throw insertError ?? new Error('Failed to join matchmaking queue');
      queueEntryId = inserted.id;

      // 2. Look for another player who's already waiting.
      const { data: candidates } = await client
        .from(QUEUE_TABLE)
        .select<'*', QueueRow>()
        .eq('status', 'searching' satisfies QueueStatus)
        .neq('id', queueEntryId)
        .order('created_at', { ascending: true })
        .limit(1);

      if (cancelled) return;
      const opponentRow = candidates?.[0];

      // Only the side whose own row is the *newer* of the pair ever attempts
      // to claim — the older side always falls through to listen-and-wait
      // instead, below. Without this, two players calling startMatchmaking()
      // within the same instant can each independently query and see the
      // *other* as their available candidate (both SELECTs can land before
      // either has claimed anything), and each would generate their own
      // room_id for the pair — claiming the *other's* row, not the same row,
      // so a same-row `.eq('status','searching')` guard alone can't catch
      // it: both claims target different rows and so both can succeed,
      // leaving the two sides matched into two different, mutually
      // unreachable rooms. `created_at`/`id` are real, server-assigned
      // values both sides already have (from their own insert and from this
      // query) and agree on, so exactly one side of any pair ever sees
      // itself as "newer" (see isNewer's tie-break) — that side claims; the
      // other only ever listens.
      if (opponentRow && isNewer(inserted, opponentRow)) {
        const roomId = generateRoomId();
        const claimOpponent: QueueMatchUpdate = { status: 'matched', matched_with: queueEntryId, room_id: roomId };
        const { data: claimedOpponent } = await client
          .from(QUEUE_TABLE)
          .update(claimOpponent)
          .eq('id', opponentRow.id)
          .eq('status', 'searching' satisfies QueueStatus)
          .select<'id', Pick<QueueRow, 'id'>>('id');

        if (cancelled) return;

        if (claimedOpponent && claimedOpponent.length > 0) {
          const claimSelf: QueueMatchUpdate = { status: 'matched', matched_with: opponentRow.id, room_id: roomId };
          await client.from(QUEUE_TABLE).update(claimSelf).eq('id', queueEntryId).eq('status', 'searching' satisfies QueueStatus);

          finish({
            roomId,
            isBot: false,
            opponent: { id: opponentRow.user_id, name: opponentRow.player_name, avatar: DEFAULT_PLAYER_AVATAR },
            queueEntryId: queueEntryId ?? undefined
          });
          return;
        }
        // A third, even-newer player claimed opponentRow first (or beat us
        // to it for some other reason) — fall through to listen-and-wait;
        // our own row is untouched and still 'searching'.
      }

      // 3. Nobody waiting yet — listen for a later player matching *with us*.
      //
      // Resolves a row once we know it's been claimed (status==='matched'),
      // whether we learned that from the Realtime subscription below or from
      // the polling fallback beside it — shared so both paths report the
      // same shape to `onMatched` and neither can double-fire (`finish` is
      // itself idempotent via `settled`).
      const resolveMatchedRow = async (row: Pick<QueueRow, 'status' | 'room_id' | 'matched_with'>) => {
        if (row.status !== 'matched' || !row.room_id || !row.matched_with) return;

        let opponentName = translate(lang, 'pk_mystery_opponent');
        try {
          const { data: opponentRow } = await client
            .from(QUEUE_TABLE)
            .select<'player_name', Pick<QueueRow, 'player_name'>>('player_name')
            .eq('id', row.matched_with)
            .single();
          if (opponentRow) opponentName = opponentRow.player_name;
        } catch (e) {
          console.debug('[matchmaking] opponent lookup error:', e);
        }

        finish({
          roomId: row.room_id,
          isBot: false,
          opponent: { id: row.matched_with, name: opponentName, avatar: DEFAULT_PLAYER_AVATAR },
          queueEntryId: queueEntryId ?? undefined
        });
      };

      channel = client
        .channel(`matchmaking-${queueEntryId}`)
        .on<QueueRow>(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: QUEUE_TABLE, filter: `id=eq.${queueEntryId}` },
          (payload) => resolveMatchedRow(payload.new)
        )
        .subscribe();

      // 3b. Belt-and-suspenders poll of our own row, alongside the Realtime
      // subscription above rather than instead of it. Confirmed in practice
      // (see CLAUDE.md's matchmaking known-issue writeup) that the listening
      // side's `postgres_changes` callback can simply never fire even though
      // the claiming side's write genuinely lands — a Realtime delivery gap,
      // not a client-code bug — which otherwise silently burns the full
      // timeout and hands out a bot despite a real, already-matched opponent
      // waiting on the other end. Polling our own row directly is a plain
      // REST read (no Realtime dependency) and only runs while still
      // waiting, so it costs a handful of extra reads per search, not per
      // player online.
      const pollIntervalMs = Math.min(1500, Math.max(500, MATCHMAKING_TIMEOUT_MS / 5));
      pollIntervalId = setInterval(async () => {
        if (settled || cancelled || !queueEntryId) return;
        try {
          const { data: ownRow } = await client
            .from(QUEUE_TABLE)
            .select<'status,room_id,matched_with', Pick<QueueRow, 'status' | 'room_id' | 'matched_with'>>('status,room_id,matched_with')
            .eq('id', queueEntryId)
            .single();
          if (ownRow) await resolveMatchedRow(ownRow);
        } catch (e) {
          console.debug('[matchmaking] poll error:', e);
        }
      }, pollIntervalMs);

      // 4. Give up on a real player after the timeout and fall back to a bot.
      timeoutId = setTimeout(fallbackToBot, MATCHMAKING_TIMEOUT_MS);
    } catch (e) {
      console.debug('[matchmaking] error, falling back to bot:', e);
      finish(spawnBotMatch('medium', lang));
    }
  })();

  return cancel;
}
