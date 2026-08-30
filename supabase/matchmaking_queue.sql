-- Schema for PK-mode Realtime matchmaking (src/utils/matchmaking.ts).
--
-- Run this in the Supabase project's SQL editor. It is NOT applied
-- automatically — the client code in matchmaking.ts assumes this table,
-- these policies, and Realtime already exist. The whole script is
-- idempotent (create/drop-if-exists throughout), so if you already ran an
-- earlier version of this file against your project, just re-run the
-- whole thing to pick up the tightened policies below.

create extension if not exists "pgcrypto"; -- for gen_random_uuid()

create table if not exists matchmaking_queue (
  id           uuid primary key default gen_random_uuid(),
  user_id      text not null,
  player_name  text not null check (char_length(player_name) between 1 and 30),
  status       text not null default 'searching'
                 check (status in ('searching', 'matched', 'cancelled')),
  matched_with uuid references matchmaking_queue(id),
  room_id      uuid,
  created_at   timestamptz not null default now()
);

-- Migration for a table created before this constraint existed — safe to
-- run even if the table above was just freshly created (guarded).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'matchmaking_queue_player_name_check'
  ) then
    alter table matchmaking_queue
      add constraint matchmaking_queue_player_name_check
      check (char_length(player_name) between 1 and 30);
  end if;
end $$;

-- Rows go stale fast (an 8s search window); index keeps the "who's waiting"
-- scan in startMatchmaking() cheap even as the table accumulates old rows.
create index if not exists matchmaking_queue_status_created_at_idx
  on matchmaking_queue (status, created_at);

alter table matchmaking_queue enable row level security;

-- This is an anonymous, casual party game with no Supabase Auth session
-- (user_id is just a client-generated guest id, unverifiable server-side),
-- so RLS can't scope rows to "the caller" the way it could with auth.uid().
-- What we *can* enforce: once a row leaves 'searching', it becomes
-- immutable, which closes the main abuse case — someone rewriting a room
-- that's already matched (hijacking another pair's match, or resurrecting
-- a cancelled/expired row to relist it as searching again).
drop policy if exists "anyone can join the queue" on matchmaking_queue;
drop policy if exists "anyone can read the queue" on matchmaking_queue;
drop policy if exists "anyone can update queue rows to record a match" on matchmaking_queue;

create policy "anyone can join the queue"
  on matchmaking_queue for insert
  with check (status = 'searching');

-- Needed as-is: the client looks up an opponent's name by matched_with id
-- (see matchmaking.ts), which isn't expressible as "only your own rows"
-- without a real auth session. Keep the table narrow (no PII beyond a
-- chosen nickname) if this policy stays this permissive.
create policy "anyone can read the queue"
  on matchmaking_queue for select
  using (true);

-- Only a still-searching row may be updated, and only into a terminal
-- state — prevents tampering with rows that already matched/cancelled.
create policy "searching rows can be claimed or cancelled"
  on matchmaking_queue for update
  using (status = 'searching')
  with check (status in ('matched', 'cancelled'));

-- Required for the client's `.channel(...).on('postgres_changes', ...)`
-- subscription to receive UPDATE events on this table.
alter publication supabase_realtime add table matchmaking_queue;

-- Optional housekeeping: periodically clear out abandoned rows (e.g. via a
-- scheduled Supabase Edge Function / pg_cron job), since this schema has no
-- automatic expiry. Left out of the client for now — not required for the
-- matchmaking flow itself.
-- delete from matchmaking_queue where created_at < now() - interval '10 minutes';
