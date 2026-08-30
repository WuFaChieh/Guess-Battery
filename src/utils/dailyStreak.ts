// Tracks the Daily Challenge's "come back tomorrow" streak — how many
// consecutive days in a row the player has completed today's 5 questions.
// Mirrors audio.ts's shape: a pure state-transition function the localStorage
// read/write wraps around, so the actual streak math is unit-testable without
// mocking storage.

export interface DailyStreakState {
  lastCompletedDate: string | null; // YYYY-MM-DD
  currentStreak: number;
  longestStreak: number;
}

const STORAGE_KEY = 'guess_battery_daily_streak';
const DEFAULT_STATE: DailyStreakState = { lastCompletedDate: null, currentStreak: 0, longestStreak: 0 };

function yesterdayOf(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

// Pure — given the previous streak state and today's date, computes the
// state after completing today's challenge. Completing the same day twice
// (e.g. replaying via "再玩一局" after already finishing today) is a no-op;
// completing on the day right after lastCompletedDate extends the streak;
// any bigger gap (or no prior completion) starts a fresh streak of 1.
export function computeNextStreak(prev: DailyStreakState, todayStr: string): DailyStreakState {
  if (prev.lastCompletedDate === todayStr) return prev;
  const nextCurrent = prev.lastCompletedDate === yesterdayOf(todayStr) ? prev.currentStreak + 1 : 1;
  return {
    lastCompletedDate: todayStr,
    currentStreak: nextCurrent,
    longestStreak: Math.max(prev.longestStreak, nextCurrent)
  };
}

export function getDailyStreak(): DailyStreakState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
  } catch {
    // localStorage unavailable (private browsing, etc.) — fall back to a fresh streak
  }
  return DEFAULT_STATE;
}

// Call once when the player finishes today's Daily Challenge. Safe to call
// more than once on the same day (e.g. replaying) — see computeNextStreak.
export function recordDailyCompletion(todayStr: string = new Date().toISOString().slice(0, 10)): DailyStreakState {
  const next = computeNextStreak(getDailyStreak(), todayStr);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore — nothing else to do if storage is unavailable
  }
  return next;
}

export function hasPlayedToday(todayStr: string = new Date().toISOString().slice(0, 10)): boolean {
  return getDailyStreak().lastCompletedDate === todayStr;
}
