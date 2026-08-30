# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # tsc (type-check, no emit) then vite build -> dist/
npm run lint      # eslint .
npm run preview   # serve the production build locally
npx tsc --noEmit  # type-check only, without building
```

There is no test suite/framework configured in this project (no `test` script, no test runner in `package.json`).

## Architecture

**Stack**: React 18 + TypeScript + Vite, Tailwind for styling, Framer Motion for animation, `@supabase/supabase-js` for realtime PK matchmaking, `canvas-confetti` for celebration effects, `lucide-react` for icons. No router — the whole app is a single page with client-side mode switching. Deployed to Vercel (`vercel.json` rewrites everything to `index.html` for SPA routing).

### App shell and mode switching (`src/App.tsx`)

`App.tsx` owns top-level flow state: splash screen -> start cover -> main game shell. Once past the cover, it renders exactly one of four game mode components based on `currentMode: GameMode` (`src/types/game.ts`), switched via `Navbar`/`BottomNav`:

- `single_5` -> `SinglePlayerGame` — solo run through 5 questions, filterable by category
- `mutual_pk` -> `MutualPkGame` — 1v1 realtime PK battle
- `party` -> `PartyModeGame` — pass-and-play, 2-4 players on one device
- `custom` -> `CustomCreator` — build/import/manage a custom question deck

All four are `React.lazy()`-loaded (each is its own chunk) so a player who only plays one mode doesn't download the others — notably, `MutualPkGame`'s chunk carries the entire Supabase client and is by far the largest (only loaded if PK mode is opened). `SplashLoader` and `StartCover` are the only components that must render on first paint, so they're imported eagerly; both use Framer Motion, which is why the main chunk still includes it regardless of which mode is picked.

Custom questions are persisted to `localStorage` (`guess_battery_custom_questions`) and merged with `INITIAL_QUESTIONS` (`src/data/questions.ts`) into `allAvailableQuestions`, passed down to every mode that needs a question pool.

`DailyGame.tsx` and `getDailyQuestions()`/`getDailySeed()` (`src/utils/gameLogic.ts`) implement a deterministic "daily challenge" seeded by date, but `DailyGame` is not currently wired into `App.tsx` — it's dead code as of now, not a live mode.

### Scoring model

Every mode scores guesses the same way (`calculateScore` in `src/utils/gameLogic.ts`): `score = 100 - |guess - officialBattery|`, clamped at 0. `getCommentary`/`getCommentaryIcon` map the resulting distance to one of 8 flavor-text tiers; `getBadgeForScore` maps a session's average score to one of the `TITLE_BADGES`.

### PK mode matchmaking (`src/utils/matchmaking.ts`)

`startMatchmaking(userId, playerName, onMatched)` joins the Supabase `matchmaking_queue` table, checks for an already-waiting opponent, otherwise opens a Realtime channel subscribed to its own queue row and waits up to `MATCHMAKING_TIMEOUT_MS` (8s, `src/constants/gameConfig.ts`) for someone to claim it. If nothing works out — timeout, Supabase not configured (`isSupabaseConfigured` in `src/utils/supabase.ts`), or any error — it falls back to `spawnBotMatch()`, a local bot opponent. Callers get back a `cancel()` closure to tear down the timer/subscription on unmount.

Bot opponents are deliberately made indistinguishable from real ones in the UI (`MutualPkGame.tsx` comments call this out explicitly) — `opponent.isBot`/`botDifficulty` only ever drive internal pacing and guess-error-margin logic (`utils/aiBots.ts`), never a UI "this is a bot" tell.

Real human-vs-human PK matches only sync *matchmaking* (finding an opponent) — the actual question/guess exchange isn't synced over Realtime yet, so both bot and human opponents currently share the same locally-simulated guess flow. See comments in `MutualPkGame.tsx`'s `runSimultaneousChargingCeremony`/`handleMatched`.

The Supabase schema (`supabase/matchmaking_queue.sql`) is **not applied automatically** — it must be run manually in the Supabase SQL editor (table, RLS policies, and enabling the table on `supabase_realtime`) before matchmaking will find real opponents. Without `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` set (see `.env.example`), every PK match silently falls back to a bot.

### Audio (`src/utils/audio.ts`)

All sound (BGM + SFX) is synthesized at runtime via the Web Audio API — no audio files. `withAudio`/`playTone`/`playNoteSequence` are shared plumbing: every effect function just describes an envelope/frequency shape and delegates scheduling to these. BGM runs on a `setInterval` arpeggiator and auto-pauses/resumes on `visibilitychange` so a backgrounded tab doesn't keep scheduling oscillators.

### Question data (`src/data/questions.ts`)

`INITIAL_QUESTIONS` is a large static array (`category: 'absurd' | 'math' | 'custom'`). `CATEGORY_LABELS` maps category keys to their filter-pill label/icon — used by `SinglePlayerGame`'s category selector. User-created questions get `custom_`-prefixed ids and/or `category: 'custom'`; several call sites check both (`q.category === 'custom' || q.id.startsWith('custom_')`) since imported/legacy custom decks may only satisfy one.

### Custom deck sharing (`src/components/CustomCreator.tsx`)

Sharing a custom deck posts to a Google Apps Script webhook URL from `VITE_GOOGLE_SHEETS_URL` (no hardcoded fallback — omitted on purpose, see comments in that file). Unset means sharing is disabled but local create/import/play still works.

### ESLint config

`react-hooks/exhaustive-deps` is set to `warn`, not the plugin's full v7+ "recommended" rule set — the rest of that set is React Compiler linting (purity, no-set-state-in-effect, immutability), which this codebase doesn't target and would hard-error on ordinary patterns used throughout (fetching in `useEffect`, `Date.now()` in `useState` initializers, etc.). See `eslint.config.js` comments.
