// Fallback AI bot used when PK matchmaking can't find a real opponent in time.
// See utils/matchmaking.ts for where this plugs in (spawnBotMatch), and
// utils/humanAiDeck.ts for the separate "looks like a real player" bot deck
// used inside an already-started 1v1 match.

import {
  BotDifficulty,
  BOT_DIFFICULTY_ERROR_RANGE,
  BOT_THINKING_TIME_MIN_MS,
  BOT_THINKING_TIME_MAX_MS
} from '../constants/gameConfig';

// Re-exported so existing `import { BotDifficulty } from '../utils/aiBots'`
// call sites keep working — the type itself now lives in gameConfig.ts
// alongside the numeric constants that are keyed by it.
export type { BotDifficulty };

/** A player's identity as shown in PK mode — real or bot. */
export interface PlayerProfile {
  id: string;
  name: string;
  avatar: string;
}

/** A bot's profile is just a PlayerProfile drawn from the bot roster. */
export type BotProfile = PlayerProfile;

const BOT_NAMES = ['菜菜', '阿柴', '阿特', '小仙', '歐拉', '極限', '阿龍', '小柯'];
const BOT_AVATARS = ['🌱', '🐕', '💻', '🔮', '🤓', '🎯', '🐉', '🐱'];

/** Returns a random bot nickname + avatar for a fallback PK opponent. */
export function getBotProfile(): BotProfile {
  const idx = Math.floor(Math.random() * BOT_NAMES.length);
  return {
    id: `bot_${Date.now()}_${idx}`,
    name: BOT_NAMES[idx],
    avatar: BOT_AVATARS[idx]
  };
}

/**
 * Calculates a bot's guess for the given answer with realistic human-like
 * noise: a random ±15-25% error margin (narrower for harder bots) applied in
 * a random direction, clamped to the valid 0-100 range.
 */
export function getBotGuess(actualAnswer: number, difficulty: BotDifficulty = 'medium'): number {
  const { min, max } = BOT_DIFFICULTY_ERROR_RANGE[difficulty];
  const errorMargin = min + Math.random() * (max - min);
  const direction = Math.random() > 0.5 ? 1 : -1;
  const guess = Math.round(actualAnswer + direction * errorMargin);
  return Math.min(100, Math.max(0, guess));
}

/**
 * Simulates human "thinking time" before a bot submits its guess: waits a
 * random delay (see BOT_THINKING_TIME_MIN_MS/MAX_MS in gameConfig.ts), then
 * invokes `callback` with the computed guess. Returns the underlying timeout
 * id so callers can `clearTimeout` it on unmount/cancel — mirrors the
 * timer-cleanup pattern used elsewhere in the app.
 */
export function scheduleBotAction(
  callback: (guess: number) => void,
  actualAnswer: number,
  difficulty: BotDifficulty = 'medium'
): ReturnType<typeof setTimeout> {
  const thinkingTime = BOT_THINKING_TIME_MIN_MS + Math.random() * (BOT_THINKING_TIME_MAX_MS - BOT_THINKING_TIME_MIN_MS);
  return setTimeout(() => {
    callback(getBotGuess(actualAnswer, difficulty));
  }, thinkingTime);
}
