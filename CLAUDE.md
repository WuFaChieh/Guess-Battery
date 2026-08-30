# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # tsc (type-check, no emit) then vite build -> dist/
npm run lint         # eslint .
npm run preview      # serve the production build locally
npx tsc --noEmit     # type-check only, without building
npm run cap:sync     # build + `cap sync` -> refreshes ios/ from dist/ and native deps
npm run cap:open:ios # open the Xcode project (needs a Mac; see iOS section below)
npm run test         # vitest run -- unit tests
npm run test:watch   # vitest in watch mode
```

Vitest covers `src/utils/gameLogic.ts`'s pure functions only (`*.test.ts` next to the file it tests) — scoring, commentary/badge tiers, the shuffle, and the daily-seed determinism. Nothing else in the codebase has test coverage; UI components and the Supabase-backed matchmaking/PK-sync flows are still verified manually.

## Architecture

**Stack**: React 18 + TypeScript + Vite, Tailwind for styling, Framer Motion for animation, `@supabase/supabase-js` for realtime PK matchmaking, `canvas-confetti` for celebration effects, `lucide-react` for icons, `@capacitor/*` for the native iOS shell. No router — the whole app is a single page with client-side mode switching.

### Dual target: website + native iOS app, developed in parallel

This is one React codebase shipped two ways, and **both are actively maintained — neither is a fallback for the other**:

- **Web**: deployed to Vercel (`vercel.json` rewrites everything to `index.html` for SPA routing).
- **iOS**: the same `dist/` build wrapped by Capacitor (`capacitor.config.ts`) into the native project under `ios/App`. `npm run cap:sync` rebuilds `dist/` and copies it into the native shell.

The dev machine for this project is Windows, which cannot open or build the Xcode project at all — there is no local way to verify the iOS side. Two things exist specifically to cover that gap:

- `.github/workflows/ios-build.yml` builds the iOS app (unsigned, for the Simulator) on a macOS GitHub Actions runner on every push/PR — this is the only build verification the iOS target gets short of an actual Mac.
- `scripts/fix-capacitor-spm-paths.mjs` (wired as `postcap:sync`) fixes `ios/App/CapApp-SPM/Package.swift`: `cap sync` writes local Swift package paths using the host OS's separator, and Windows backslashes there are not valid path separators for Swift Package Manager on macOS/Linux — every `cap sync` run on this machine would otherwise silently reintroduce a path Xcode/CI can't resolve.

**Keeping the two targets in parity**: don't branch app logic on platform by hand. The existing pattern (`src/utils/deviceBattery.ts`, `src/utils/share.ts`) is to call a `@capacitor/*` plugin unconditionally — each one detects the platform itself and either bridges to the real native API (iOS) or wraps the closest web equivalent, with a further graceful fallback (e.g. clipboard copy) when neither exists. Follow that shape for any new native-feeling feature instead of adding `Capacitor.isNativePlatform()` checks throughout feature code — it's what keeps the web build's behavior unchanged while the iOS build gets the real native API for free.

`capacitor.config.ts`'s `appId` (`com.guessbattery.app`) is a placeholder and must be replaced with a real reverse-DNS identifier before any App Store Connect record is created — it's effectively permanent once submitted.

The web build also carries a PWA manifest (`public/manifest.json`, `public/icons/`) and iOS-specific meta tags in `index.html` (`apple-touch-icon`, `apple-mobile-web-app-*`), so it can be "added to home screen" with a real icon on both Android and iOS Safari — the closest thing to an installed app for anyone using the web version before/without the native App Store release. `viewport-fit=cover` is also set there; `Navbar`/`BottomNav`/`StartCover` pad themselves with `env(safe-area-inset-*)` to compensate, for the native iOS shell's notch/Dynamic Island/home indicator (a no-op on the web, where those `env()` values just resolve to 0).

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

Claiming an opponent is guarded two ways against two players calling `startMatchmaking()` within the same instant: the claiming update is conditional on the target row still being `status='searching'` (`.select()`'d to confirm it actually took), and — the trickier case, since a symmetric race has each side claim the *other's* row rather than contending for the same one — only the side whose own row is the objectively *newer* of the pair (by server-assigned `created_at`) ever attempts to claim; the older side always falls through to listen-and-wait instead. Both sides agree on this ordering independently since they're comparing the same server timestamps, so exactly one side of any pair ever claims.

Bot opponents are deliberately made indistinguishable from real ones in the UI (`MutualPkGame.tsx` comments call this out explicitly) — `opponent.isBot`/`botDifficulty` only ever drive internal pacing and guess-error-margin logic (`utils/aiBots.ts`), never a UI "this is a bot" tell.

Real human-vs-human PK matches also sync the actual gameplay, not just matchmaking: once matched, both sides join a Supabase Realtime *broadcast* channel keyed by the match's `roomId` (`src/utils/pkRoomChannel.ts` — no schema/table needed beyond what matchmaking already sets up) and exchange their authored question and their guess directly. Plain broadcast has no message history for a late subscriber, so each side also broadcasts a `ready` event the moment its own subscription completes; a side that already sent something resends it on receiving a peer's `ready`, closing the race where a message is sent before the peer has finished joining. Generous timeouts (`PK_OPPONENT_QUESTION_TIMEOUT_MS`/`PK_OPPONENT_GUESS_TIMEOUT_MS`, `src/constants/gameConfig.ts`) fall back to a synthesized question/guess if the real opponent disappears mid-match, so a match can never hang forever. Bot matches are unaffected — they still fabricate both sides locally, same as before, since a bot has no real second party to sync with.

The Supabase schema (`supabase/matchmaking_queue.sql`) is **not applied automatically** — it must be run manually in the Supabase SQL editor (table, RLS policies, and enabling the table on `supabase_realtime`) before matchmaking will find real opponents. Without `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` set (see `.env.example`), every PK match silently falls back to a bot.

### Audio (`src/utils/audio.ts`)

All sound (BGM + SFX) is synthesized at runtime via the Web Audio API — no audio files. `withAudio`/`playTone`/`playNoteSequence` are shared plumbing: every effect function just describes an envelope/frequency shape and delegates scheduling to these. BGM runs on a `setInterval` arpeggiator and auto-pauses/resumes on `visibilitychange` so a backgrounded tab doesn't keep scheduling oscillators.

### Question data (`src/data/questions.ts`)

`INITIAL_QUESTIONS` is a large static array (`category: 'absurd' | 'math' | 'custom'`). `CATEGORY_LABELS` maps category keys to their filter-pill label/icon — used by `SinglePlayerGame`'s category selector. User-created questions get `custom_`-prefixed ids and/or `category: 'custom'`; several call sites check both (`q.category === 'custom' || q.id.startsWith('custom_')`) since imported/legacy custom decks may only satisfy one.

### Custom deck sharing (`src/components/CustomCreator.tsx`)

Sharing a custom deck posts to a Google Apps Script webhook URL from `VITE_GOOGLE_SHEETS_URL` (no hardcoded fallback — omitted on purpose, see comments in that file). Unset means sharing is disabled but local create/import/play still works.

### ESLint config

`react-hooks/exhaustive-deps` is set to `warn`, not the plugin's full v7+ "recommended" rule set — the rest of that set is React Compiler linting (purity, no-set-state-in-effect, immutability), which this codebase doesn't target and would hard-error on ordinary patterns used throughout (fetching in `useEffect`, `Date.now()` in `useState` initializers, etc.). See `eslint.config.js` comments.
