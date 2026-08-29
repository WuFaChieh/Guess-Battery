-- Schema for PK-mode Realtime matchmaking (src/utils/matchmaking.ts).
--
-- Run this once in the Supabase project's SQL editor. It is NOT applied
-- automatically — the client code in matchmaking.ts assumes this table,
-- these policies, and Realtime already exist.

create extension if not exists "pgcrypto"; -- for gen_random_uuid()

create table if not exists matchmaking_queue (
  id           uuid primary key default gen_random_uuid(),
  user_id      text not null,
  player_name  text not null,
  status       text not null default 'searching'
                 check (status in ('searching', 'matched', 'cancelled')),
  matched_with uuid references matchmaking_queue(id),
  room_id      uuid,
  created_at   timestamptz not null default now()
);

-- Rows go stale fast (an 8s search window); index keeps the "who's waiting"
-- scan in startMatchmaking() cheap even as the table accumulates old rows.
create index if not exists matchmaking_queue_status_created_at_idx
  on matchmaking_queue (status, created_at);

alter table matchmaking_queue enable row level security;

-- This is an anonymous, casual party game with no sensitive data in this
-- table (nicknames + status only) — policies are intentionally permissive
-- rather than scoped per-user. Tighten these if that ever changes.
create policy "anyone can join the queue"
  on matchmaking_queue for insert
  with check (true);

create policy "anyone can read the queue"
  on matchmaking_queue for select
  using (true);

create policy "anyone can update queue rows to record a match"
  on matchmaking_queue for update
  using (true);

-- Required for the client's `.channel(...).on('postgres_changes', ...)`
-- subscription to receive UPDATE events on this table.
alter publication supabase_realtime add table matchmaking_queue;

-- Optional housekeeping: periodically clear out abandoned rows (e.g. via a
-- scheduled Supabase Edge Function / pg_cron job), since this schema has no
-- automatic expiry. Left out of the client for now — not required for the
-- matchmaking flow itself.
-- delete from matchmaking_queue where created_at < now() - interval '10 minutes';
