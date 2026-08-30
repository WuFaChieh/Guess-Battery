import { describe, it, expect } from 'vitest';
import { computeNextStreak, type DailyStreakState } from './dailyStreak';

const FRESH: DailyStreakState = { lastCompletedDate: null, currentStreak: 0, longestStreak: 0 };

describe('computeNextStreak', () => {
  it('starts a streak of 1 on the very first completion', () => {
    expect(computeNextStreak(FRESH, '2026-08-30')).toEqual({
      lastCompletedDate: '2026-08-30',
      currentStreak: 1,
      longestStreak: 1
    });
  });

  it('extends the streak when completed on the day right after the last one', () => {
    const prev: DailyStreakState = { lastCompletedDate: '2026-08-30', currentStreak: 3, longestStreak: 3 };
    expect(computeNextStreak(prev, '2026-08-31')).toEqual({
      lastCompletedDate: '2026-08-31',
      currentStreak: 4,
      longestStreak: 4
    });
  });

  it('resets to 1 after skipping a day', () => {
    const prev: DailyStreakState = { lastCompletedDate: '2026-08-28', currentStreak: 5, longestStreak: 5 };
    expect(computeNextStreak(prev, '2026-08-30')).toEqual({
      lastCompletedDate: '2026-08-30',
      currentStreak: 1,
      longestStreak: 5 // longest record is kept even after a reset
    });
  });

  it('is a no-op when called again for a day already recorded (e.g. replaying)', () => {
    const prev: DailyStreakState = { lastCompletedDate: '2026-08-30', currentStreak: 3, longestStreak: 3 };
    expect(computeNextStreak(prev, '2026-08-30')).toEqual(prev);
  });

  it('correctly crosses a month boundary when checking "yesterday"', () => {
    const prev: DailyStreakState = { lastCompletedDate: '2026-08-31', currentStreak: 10, longestStreak: 10 };
    expect(computeNextStreak(prev, '2026-09-01')).toEqual({
      lastCompletedDate: '2026-09-01',
      currentStreak: 11,
      longestStreak: 11
    });
  });

  it('tracks longestStreak independently of the current streak going forward', () => {
    let state = computeNextStreak(FRESH, '2026-08-01');
    state = computeNextStreak(state, '2026-08-02');
    state = computeNextStreak(state, '2026-08-03'); // currentStreak 3, longestStreak 3
    state = computeNextStreak(state, '2026-08-05'); // gap — resets current, keeps longest
    expect(state.currentStreak).toBe(1);
    expect(state.longestStreak).toBe(3);
  });
});
