// Realtime sync for an in-progress 1v1 PK match between two real players,
// once utils/matchmaking.ts has already paired them onto a shared `roomId`.
//
// Uses a Supabase Realtime *broadcast* channel — no table or schema beyond
// what matchmaking_queue.sql already sets up — so each side's authored
// question and guess reach the other side directly. Before this existed,
// MutualPkGame.tsx fabricated both under the hood for every match, bot or
// real (see its former comments calling that out): two real humans matched
// against each other never actually exchanged anything beyond who they were
// paired with.
//
// Bot matches never call this — spawnBotMatch()'s roomId has no real second
// party on the other end to broadcast to.

import { supabase } from './supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export type PkRoomEvent =
  | { type: 'question'; fromUserId: string; title: string; officialBattery: number }
  | { type: 'guess'; fromUserId: string; guess: number }
  // Broadcast the moment our own subscription finishes joining. Plain
  // broadcast has no message history for a late subscriber — if we send our
  // question/guess before the *other* side has finished joining the channel
  // (a real race: their join is triggered by their own postgres_changes
  // notification, which can lag a beat behind ours), they simply never
  // receive it. `ready` lets whichever side joins later announce itself so
  // the earlier side can resend anything it already sent, closing that gap
  // without either side needing to guess at timing.
  | { type: 'ready'; fromUserId: string };

export interface PkRoomConnection {
  send: (event: PkRoomEvent) => void;
  leave: () => void;
}

/**
 * Joins the Realtime broadcast channel for a matched PK room. `onEvent` fires
 * for every event the *other* player sends — `broadcast.self: false` already
 * excludes our own sends, and the `fromUserId` check is a second, cheap guard
 * against ever reacting to an echo of our own message. Also fires a `ready`
 * event (locally, via `onEvent`) once our own subscription is confirmed —
 * callers that already have something to send should treat this the same as
 * a `ready` received from the wire (see MutualPkGame's resend-on-ready).
 *
 * Returns null if Supabase isn't configured. Callers only need to handle that
 * defensively, not treat it as a real-world case: matchmaking.ts only ever
 * hands back a non-bot MatchRoomData when Supabase produced the match in the
 * first place, so a caller holding a real roomId always has a live client.
 */
export function joinPkRoom(
  roomId: string,
  selfUserId: string,
  onEvent: (event: PkRoomEvent) => void
): PkRoomConnection | null {
  if (!supabase) return null;
  const client = supabase;

  console.debug('[pkRoomChannel] joining topic', `pk-room-${roomId}`, 'as', selfUserId);

  const channel: RealtimeChannel = client
    .channel(`pk-room-${roomId}`, { config: { broadcast: { self: false } } })
    .on('broadcast', { event: 'pk' }, ({ payload }) => {
      const event = payload as PkRoomEvent;
      if (event.fromUserId === selfUserId) return;
      console.debug('[pkRoomChannel] received', event.type, 'from', event.fromUserId);
      onEvent(event);
    });

  channel.subscribe((status) => {
    console.debug('[pkRoomChannel] channel status:', status, 'topic', `pk-room-${roomId}`);
    if (status === 'SUBSCRIBED') {
      // Tell the room we're here — see the `ready` case above for why.
      channel
        .send({ type: 'broadcast', event: 'pk', payload: { type: 'ready', fromUserId: selfUserId } })
        .then((res) => console.debug('[pkRoomChannel] ready send result:', res));
    }
  });

  return {
    send: (event) => {
      console.debug('[pkRoomChannel] sending', event.type);
      channel
        .send({ type: 'broadcast', event: 'pk', payload: event })
        .then((res) => console.debug('[pkRoomChannel] send result:', res));
    },
    leave: () => {
      client.removeChannel(channel);
    }
  };
}
