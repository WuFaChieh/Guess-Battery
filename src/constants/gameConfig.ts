// Centralized tunable timing/probability constants for PK-mode matchmaking
// and its bot fallback, so these values live in one place instead of being
// scattered as magic numbers across utils/matchmaking.ts and utils/aiBots.ts.

/** Bot skill tiers used for the PK-mode fallback opponent. */
export type BotDifficulty = 'easy' | 'medium' | 'hard';

/** How long startMatchmaking() waits for a real player before falling back to a bot (ms). */
export const MATCHMAKING_TIMEOUT_MS = 8000;

/** Simulated bot "thinking time" range before it submits a guess (ms). */
export const BOT_THINKING_TIME_MIN_MS = 1500;
export const BOT_THINKING_TIME_MAX_MS = 3500;

/** Bot guess error margin (percentage points on the 0-100 battery scale), per difficulty tier. */
export const BOT_DIFFICULTY_ERROR_RANGE: Record<BotDifficulty, { min: number; max: number }> = {
  easy: { min: 20, max: 25 },
  medium: { min: 15, max: 20 },
  hard: { min: 8, max: 15 }
};
