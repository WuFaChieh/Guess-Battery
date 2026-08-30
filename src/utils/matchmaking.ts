// Supabase Realtime matchmaking for 1v1 PK mode, with an automatic bot
// fallback so the mode always works even without a live opponent (or
// without Supabase configured at all).
//
// Requires a `matchmaking_queue` table with Realtime enabled — see
// supabase/matchmaking_queue.sql for the schema + RLS policies this expects.

import { supabase, isSupabaseConfigured } from './supabase';
import { getBotProfile, PlayerProfile, BotDifficulty } from './aiBots';
import { MATCHMAKING_TIMEOUT_MS } from '../constants/gameConfig';
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

/**
 * Creates a local bot opponent + room. Used both as the matchmaking timeout
 * fallback and as the immediate fallback when Supabase isn't reachable.
 */
export function spawnBotMatch(difficulty: BotDifficulty = 'medium'): MatchRoomData {
  const bot = getBotProfile();
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
  onMatched: (roomData: MatchRoomData) => void
): () => void {
  let settled = false;
  let cancelled = false;
  let channel: RealtimeChannel | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let queueEntryId: string | null = null;

  const teardown = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
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
        await supabase.from(QUEUE_TABLE).update({ status: 'cancelled' satisfies QueueStatus }).eq('id', queueEntryId);
      } catch (e) {
        console.debug('[matchmaking] cleanup error:', e);
      }
    }
    finish(spawnBotMatch());
  };

  const cancel = () => {
    cancelled = true;
    teardown();
  };

  if (!isSupabaseConfigured || !supabase) {
    // No backend configured — skip straight to a bot instead of burning the
    // full timeout on a connection that can never succeed.
    finish(spawnBotMatch());
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
      // unreachable rooms. `created_at` is a real, server-assigned
      // timestamp both sides already have (from their own insert and from
      // this query) and agree on, so exactly one side of any pair ever sees
      // itself as "newer" — that side claims; the other only ever listens.
      if (opponentRow && opponentRow.created_at < inserted.created_at) {
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
      channel = client
        .channel(`matchmaking-${queueEntryId}`)
        .on<QueueRow>(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: QUEUE_TABLE, filter: `id=eq.${queueEntryId}` },
          async (payload) => {
            const row = payload.new;
            if (row.status !== 'matched' || !row.room_id || !row.matched_with) return;

            let opponentName = '神秘對手';
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
          }
        )
        .subscribe();

      // 4. Give up on a real player after the timeout and fall back to a bot.
      timeoutId = setTimeout(fallbackToBot, MATCHMAKING_TIMEOUT_MS);
    } catch (e) {
      console.debug('[matchmaking] error, falling back to bot:', e);
      finish(spawnBotMatch());
    }
  })();

  return cancel;
}
