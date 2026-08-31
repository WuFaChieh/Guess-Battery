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

Vitest covers pure functions only (`*.test.ts` next to the file it tests): `src/utils/gameLogic.ts` (scoring, commentary/badge tiers, the shuffle, the daily-seed determinism, the combo bonus, the Wordle-style share-grid text) and `src/utils/dailyStreak.ts` (the streak date math, via its exported `computeNextStreak`). UI components and the Supabase-backed matchmaking/PK-sync flows are still verified manually.

## Known issues

**ROOT CAUSE FOUND 2026-08-31 (evening): it's the Node version, not the shell.** The two "shell-dependent" theories below turned out to be a red herring — both Bash and PowerShell were failing for the same underlying reason. Confirmed by downloading the Node v22.21.1 (LTS) Windows zip distribution standalone (no system install, no admin rights needed — just unzipped it and pointed at `node_modules/vite/bin/vite.js` with that binary directly, alongside the project's normal node_modules) and running a build with it: **`vite build` completes cleanly in ~8s with a full `dist/` under Node 22.21.1**, on this exact machine, in this exact directory, right after freshly confirming the failure under the system's installed **Node v24.12.0** (same crash signature as always: dies right after `✓ 2071 modules transformed.`, before any chunk output). Also ruled out in the process: the on-disk `@rollup/rollup-win32-x64-msvc` native binary itself isn't corrupted (`require()`d and exercised standalone with no issue; deleting and reinstalling it fresh from npm didn't change the crash under Node 24). So this is a genuine incompatibility between Node 24.12.0 and Rollup 4.63.1's native Windows addon (`@rollup/rollup-win32-x64-msvc`) on this machine, surfacing during Rollup's native chunk-rendering call — not a project bug, not a shell quirk, and not disk/AV/corruption. **Fix: build with Node 22 (or any Node matching the `>=22.0.0` in `package.json`'s `engines`), not whatever Node 24.x is currently the system default here.** No version manager is installed on this machine (`nvm`/`fnm`/`volta` all absent; a `choco install nvm` attempt failed for lack of admin rights) — until one is set up, the standalone-zip workaround above (unzip Node 22, invoke `<that>/node.exe node_modules/vite/bin/vite.js build` or `... node_modules/.bin/tsc && ...` from inside this project directory) is the known-working path when a real local build is needed; the CI-only path (Vercel, GitHub Actions for iOS) is entirely unaffected since neither runs Node 24 here.

**UPDATE 2026-08-31: shell-dependent, not fully resolved.** `npm run build` hangs/crashes on this Windows dev machine, in this exact project directory, right after `vite build` logs "transforming... N modules transformed" — partway into Rollup's chunk-rendering phase, before any chunk/size output prints. A machine restart at 00:05 seemed to fix it (a `npm run build` run from a Bash/git-bash shell at 00:11 completed cleanly in ~5-6s with a full `dist/`, repeatably), but the same command run from a native **PowerShell** shell right after still fails every time — not by hanging this time, but by the process exiting with code `-1073740791` (`0xC0000409`, `STATUS_STACK_BUFFER_OVERRUN`) at that exact same point. So the failure is real and shell-dependent, not fixed outright: **prefer invoking `npm run build` (and anything that shells out to it, like `npm run cap:sync`) from Bash/git-bash on this machine, not PowerShell**, until this is understood better. `npm run dev`, `npx tsc --noEmit`, `npm run lint`, and `npm run test` are unaffected in either shell — only this later stage of a production build.

**UPDATE 2026-08-31 (later same day): the Bash workaround above stopped holding.** Re-ran `npm run build` from Bash/git-bash (twice, plus `npx vite build` directly, all backgrounded to a logfile per the no-`tail`-piping note below) while verifying an unrelated small diff (combo sound + dead-code removal, both already covered by passing `tsc`/`lint`/`test`) — every run died at the exact same point (`transforming...` / `✓ 2071 modules transformed.`), reproducibly, with no crash text printed this time and the wrapping subshell reporting exit code `127`. `dist/` was left untouched at its previous (02:14) contents each time, i.e. no partial/stale build got mistaken for a fresh one. So the "prefer Bash" guidance above is no longer reliable — it's not clear right now whether the underlying crash is a fresh regression or the same one manifesting differently, since a plain `127` here doesn't obviously decode to the earlier `STATUS_STACK_BUFFER_OVERRUN` NTSTATUS the way PowerShell reported it. Treat both shells as untrusted for `npm run build` on this machine until this is root-caused; `npm run dev`/`tsc --noEmit`/`lint`/`test` remain the reliable local checks, same as above.

Also: within Bash/git-bash, the bare `cap` command (used by `npm run cap:sync`'s `cap sync` and `npm run cap:open:ios`) isn't resolved on `PATH` (exit 127, "command not found") even though `node_modules/.bin/cap`/`cap.cmd` exist and `npx cap` works fine — a PATH/shim resolution quirk of this Windows+git-bash combo, not a project bug. Run `npx cap sync` directly (still from Bash, to avoid the PowerShell build crash above) and then `node scripts/fix-capacitor-spm-paths.mjs` by hand (that's normally the `postcap:sync` hook, which only fires when npm itself invokes the `cap:sync` script) if `npm run cap:sync` won't resolve `cap`.

Ruled out earlier while diagnosing the original hang: corrupted `node_modules`, low disk space on `C:`, memory pressure, Windows Defender, this session's sandbox, and the project directory's Chinese name. This remains a local-machine issue, not a code defect — Vercel builds run on Vercel's own (Linux) infrastructure and are unaffected either way.

**DONE 2026-08-31**: the four primary CTA buttons now share one accent instead of a different gradient per mode/screen. `StartCover`/`SliderInput`'s lock button/PK mode's match+rematch buttons already used violet→indigo→purple; Party mode's start/next-round/restart buttons and `GameOverModal`/`RevealScreen`'s restart/next buttons (previously cyan→blue and emerald→teal respectively) were switched to match. Picked violet→indigo→purple as the target since `SliderInput`'s guess-lock button — shared by every mode — already made it the de facto dominant accent app-wide, so extending it elsewhere was the smaller diff. The bottom nav's per-mode colors were left untouched (that color-coding is a separate, intentional pattern, not a CTA). Out of scope and untouched on purpose: `Navbar`'s logo-icon gradient, `PartyModeGame`'s per-player avatar color palette (`from-emerald-500 to-teal-400`/`from-cyan-500 to-blue-400` at lines 19-20 — player identity colors, not a CTA), and `DeviceBatteryGame.tsx`, which is dead code (not imported/rendered anywhere) — unlike `DailyGame`, which is wired in and live as of 2026-08-31 (see Architecture below).

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

`App.tsx` owns top-level flow state: splash screen -> start cover -> main game shell. Once past the cover, it renders exactly one of five game mode components based on `currentMode: GameMode` (`src/types/game.ts`), switched via `Navbar`/`BottomNav`:

- `single_5` -> `SinglePlayerGame` — solo run through 5 questions, filterable by category
- `daily` -> `DailyGame` — the Daily Challenge (see below); reached via `Navbar`'s menu or the `DailyChallengeBanner` shown above the mode content whenever `currentMode === 'single_5'`, not via `BottomNav` (its 4-tab grid was left alone rather than squeezed to 5)
- `mutual_pk` -> `MutualPkGame` — 1v1 realtime PK battle
- `party` -> `PartyModeGame` — pass-and-play, 2-4 players on one device
- `custom` -> `CustomCreator` — build/import/manage a custom question deck

All five are `React.lazy()`-loaded (each is its own chunk) so a player who only plays one mode doesn't download the others — notably, `MutualPkGame`'s chunk carries the entire Supabase client and is by far the largest (only loaded if PK mode is opened). `SplashLoader`, `StartCover`, and `DailyChallengeBanner` are the only components that must render on first paint (the banner needs to be visible without opening any mode), so they're imported eagerly; `StartCover` uses Framer Motion, which is why the main chunk still includes it regardless of which mode is picked.

Custom questions are persisted to `localStorage` (`guess_battery_custom_questions`) and merged with `INITIAL_QUESTIONS` (`src/data/questions.ts`) into `allAvailableQuestions`, passed down to every mode that needs a question pool.

### Scoring model

Every mode scores guesses the same way (`calculateScore` in `src/utils/gameLogic.ts`): `score = 100 - |guess - officialBattery|`, clamped at 0. `getCommentary`/`getCommentaryIcon` map the resulting distance to one of 8 flavor-text tiers; `getBadgeForScore` maps a session's average score to one of the `TITLE_BADGES` — deliberately based on `score` alone (see Combo below), so a lucky streak never inflates the title a player earns.

### Combo bonus (`getCurrentCombo`/`getComboBonus`/`getComboBonusSeries`, `src/utils/gameLogic.ts`)

`single_5` and `daily` (not Party or PK — see below) layer a combo system on top of the base score: a guess within `COMBO_HIT_DISTANCE` (15) of the official answer extends a streak; anything further breaks it back to 0. `getCurrentCombo` derives the current streak length purely from an `AnswerRecord[]` history's trailing `distance` values — no separate combo state — so `QuestionCard` (a live "連擊中" chip while answering) and `RevealScreen`/`GameOverModal` (the reveal celebration and the results breakdown/total) all compute it the same way from whatever `answers` they already have. `getComboBonus` pays nothing for a single hit (needs two in a row to feel like a streak), then +5 per hit beyond that, capped at +20. Not wired into `PartyModeGame`/`MutualPkGame` — a combo spanning different players' turns, or PK's single-question format, wouldn't mean the same thing.

**FIXED 2026-08-31**: `RevealScreen`'s combo sting originally had no sound function of its own — despite reading like it did in the feature's commit message, it re-triggered `playMatchFoundSound()` (PK matchmaking's "match found" sting) layered after the normal `playScoreSound()`. Gave it a real dedicated `playComboSound()` (`src/utils/audio.ts`, square-wave two-note rise, distinct timbre from the PK sting) so combo/PK sounds no longer share an identity.

### Daily Challenge & streak (`DailyGame.tsx`, `src/utils/dailyStreak.ts`)

`DailyGame` plays the same 5-question flow as `SinglePlayerGame`, but the questions come from `getDailyQuestions()`/`getDailySeed()` (`src/utils/gameLogic.ts`) — a deterministic shuffle seeded by today's date string, so every player sees the same 5 questions on the same day (Wordle-style). On completing it, `dailyStreak.ts`'s `recordDailyCompletion()` updates a `currentStreak`/`longestStreak` persisted to `localStorage` (`guess_battery_daily_streak`); `computeNextStreak`, the pure date-diffing core of that, is what's actually unit-tested (extends on the very next day, resets to 1 after any gap, is a no-op replaying the same day). The completed view adds a streak banner and a "分享今日戰績方格" button above the shared `GameOverModal`, building a Wordle-style emoji grid (`getResultEmoji`/`getDailyShareText`) rather than touching `GameOverModal` itself.

Both the daily seed and the streak's day boundary come from `new Date().toISOString().slice(0, 10)` — UTC, not local time. For a player east of UTC (this dev machine's zone included), "today" flips over at their local morning hours rather than at their midnight; a session straddling that window could see the daily puzzle/streak roll over earlier than they'd expect. Pre-existing behavior from the original `getDailySeed()` (not introduced by the streak feature) and not yet fixed — switching to a local-date key would fix it but wasn't in scope when this was wired up.

### PK mode matchmaking (`src/utils/matchmaking.ts`)

`startMatchmaking(userId, playerName, onMatched)` joins the Supabase `matchmaking_queue` table, checks for an already-waiting opponent, otherwise opens a Realtime channel subscribed to its own queue row and waits up to `MATCHMAKING_TIMEOUT_MS` (8s, `src/constants/gameConfig.ts`) for someone to claim it. If nothing works out — timeout, Supabase not configured (`isSupabaseConfigured` in `src/utils/supabase.ts`), or any error — it falls back to `spawnBotMatch()`, a local bot opponent. Callers get back a `cancel()` closure to tear down the timer/subscription on unmount.

Claiming an opponent is guarded two ways against two players calling `startMatchmaking()` within the same instant: the claiming update is conditional on the target row still being `status='searching'` (`.select()`'d to confirm it actually took), and — the trickier case, since a symmetric race has each side claim the *other's* row rather than contending for the same one — only the side whose own row is the objectively *newer* of the pair (by server-assigned `created_at`) ever attempts to claim; the older side always falls through to listen-and-wait instead. Both sides agree on this ordering independently since they're comparing the same server timestamps, so exactly one side of any pair ever claims.

Bot opponents are deliberately made indistinguishable from real ones in the UI (`MutualPkGame.tsx` comments call this out explicitly) — `opponent.isBot`/`botDifficulty` only ever drive internal pacing and guess-error-margin logic (`utils/aiBots.ts`), never a UI "this is a bot" tell.

Real human-vs-human PK matches also sync the actual gameplay, not just matchmaking: once matched, both sides join a Supabase Realtime *broadcast* channel keyed by the match's `roomId` (`src/utils/pkRoomChannel.ts` — no schema/table needed beyond what matchmaking already sets up) and exchange their authored question and their guess directly. Plain broadcast has no message history for a late subscriber, so each side also broadcasts a `ready` event the moment its own subscription completes; a side that already sent something resends it on receiving a peer's `ready`, closing the race where a message is sent before the peer has finished joining. Generous timeouts (`PK_OPPONENT_QUESTION_TIMEOUT_MS`/`PK_OPPONENT_GUESS_TIMEOUT_MS`, `src/constants/gameConfig.ts`) fall back to a synthesized question/guess if the real opponent disappears mid-match, so a match can never hang forever. Bot matches are unaffected — they still fabricate both sides locally, same as before, since a bot has no real second party to sync with.

The "synthesized question" in both of those fallback cases (an actual bot match, or a real match's opponent-question timeout) is drawn from `src/utils/humanAiDeck.ts`'s `HUMAN_BOT_QUESTIONS` — a small fixed deck of pre-written human-sounding questions (`MutualPkGame.tsx`'s `fabricateOpponentQuestion`). The opponent's synthesized *guess*, and bot *identity* (name/avatar via `getBotProfile()`), both always go through `aiBots.ts` instead — so there is exactly one bot identity/guessing system (`aiBots.ts`), with `humanAiDeck.ts` scoped to fallback question content only. **FIXED 2026-08-31**: `humanAiDeck.ts` used to also export a second, unused identity/guessing system (`HUMAN_BOT_PROFILES` named/tiered personas, `generateHumanBotGuess()`) that nothing imported — dead code left over from an earlier design, since removed, so the file now only contains what's actually wired in.

The Supabase schema (`supabase/matchmaking_queue.sql`) is **not applied automatically** — it must be run manually in the Supabase SQL editor (table, RLS policies, and enabling the table on `supabase_realtime`) before matchmaking will find real opponents. Without `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` set (see `.env.example`), every PK match silently falls back to a bot.

### Audio (`src/utils/audio.ts`)

All sound (BGM + SFX) is synthesized at runtime via the Web Audio API — no audio files. `withAudio`/`playTone`/`playNoteSequence` are shared plumbing: every effect function just describes an envelope/frequency shape and delegates scheduling to these. BGM runs on a `setInterval` arpeggiator and auto-pauses/resumes on `visibilitychange` so a backgrounded tab doesn't keep scheduling oscillators.

### Question data (`src/data/questions.ts`)

`INITIAL_QUESTIONS` is a large static array (`category: 'absurd' | 'math' | 'custom'`). `CATEGORY_LABELS` maps category keys to their filter-pill label/icon — used by `SinglePlayerGame`'s category selector. User-created questions get `custom_`-prefixed ids and/or `category: 'custom'`; several call sites check both (`q.category === 'custom' || q.id.startsWith('custom_')`) since imported/legacy custom decks may only satisfy one.

### Custom deck sharing (`src/components/CustomCreator.tsx`)

Sharing a custom deck posts to a Google Apps Script webhook URL from `VITE_GOOGLE_SHEETS_URL` (no hardcoded fallback — omitted on purpose, see comments in that file). Unset means sharing is disabled but local create/import/play still works.

### ESLint config

`react-hooks/exhaustive-deps` is set to `warn`, not the plugin's full v7+ "recommended" rule set — the rest of that set is React Compiler linting (purity, no-set-state-in-effect, immutability), which this codebase doesn't target and would hard-error on ordinary patterns used throughout (fetching in `useEffect`, `Date.now()` in `useState` initializers, etc.). See `eslint.config.js` comments.
