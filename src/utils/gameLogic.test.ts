import { describe, it, expect } from 'vitest';
import {
  calculateScore,
  getCommentary,
  getCommentaryIcon,
  getBadgeForScore,
  TITLE_BADGES,
  shuffleArray,
  getDailySeed,
  getDailyQuestions
} from './gameLogic';
import type { Question } from '../types/game';

describe('calculateScore', () => {
  it('scores a perfect guess as 100 with zero distance', () => {
    expect(calculateScore(50, 50)).toEqual({ distance: 0, score: 100 });
  });

  it('is symmetric — guessing high or low by the same amount scores the same', () => {
    expect(calculateScore(70, 50)).toEqual({ distance: 20, score: 80 });
    expect(calculateScore(30, 50)).toEqual({ distance: 20, score: 80 });
  });

  it('clamps score at 0 instead of going negative for a very wrong guess', () => {
    expect(calculateScore(100, 0)).toEqual({ distance: 100, score: 0 });
  });
});

describe('getCommentary / getCommentaryIcon', () => {
  // Every tier boundary from gameLogic.ts's if/else chain, so a future edit
  // that reorders or off-by-ones a threshold fails loudly here instead of
  // silently changing what players see.
  const boundaries = [0, 3, 8, 15, 25, 40, 60, 61];

  it('returns non-empty commentary for every boundary distance', () => {
    for (const distance of boundaries) {
      expect(getCommentary(distance).length).toBeGreaterThan(0);
    }
  });

  it('pairs a distinct-enough icon with each tier (adjacent tiers never share an icon)', () => {
    const icons = boundaries.map(getCommentaryIcon);
    for (let i = 1; i < icons.length; i++) {
      // Skip the 60/61 pair — 60 and 61 are different tiers (<=60 vs >60) so
      // they're covered by the general adjacent check like every other pair.
      expect(icons[i]).not.toBe(icons[i - 1]);
    }
  });

  it('treats a huge gap the same as any other "way off" distance', () => {
    expect(getCommentary(100)).toBe(getCommentary(61));
    expect(getCommentaryIcon(100)).toBe(getCommentaryIcon(61));
  });
});

describe('getBadgeForScore', () => {
  it('picks the highest-tier badge the score still qualifies for', () => {
    expect(getBadgeForScore(100).title).toBe(TITLE_BADGES[0].title);
    expect(getBadgeForScore(95).title).toBe(TITLE_BADGES[0].title);
  });

  it('falls just short of a tier at one point below its threshold', () => {
    const psychic = TITLE_BADGES[0]; // minAvgScore: 95
    const oracle = TITLE_BADGES[1]; // minAvgScore: 85
    expect(getBadgeForScore(psychic.minAvgScore - 1).title).toBe(oracle.title);
  });

  it('never fails to return a badge, even for the worst possible score', () => {
    expect(getBadgeForScore(0).title).toBe(TITLE_BADGES[TITLE_BADGES.length - 1].title);
  });
});

describe('shuffleArray', () => {
  it('preserves length and the exact set of elements', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);
    expect(shuffled).toHaveLength(original.length);
    expect([...shuffled].sort()).toEqual([...original].sort());
  });

  it('does not mutate the input array', () => {
    const original = [1, 2, 3];
    const originalCopy = [...original];
    shuffleArray(original);
    expect(original).toEqual(originalCopy);
  });

  it('is deterministic for a given random source (needed for the daily seed to be stable)', () => {
    const fixedRandom = (() => {
      const seq = [0.1, 0.9, 0.2, 0.5, 0.05];
      let i = 0;
      return () => seq[i++ % seq.length];
    })();
    const a = shuffleArray([1, 2, 3, 4, 5], fixedRandom);
    const fixedRandomAgain = (() => {
      const seq = [0.1, 0.9, 0.2, 0.5, 0.05];
      let i = 0;
      return () => seq[i++ % seq.length];
    })();
    const b = shuffleArray([1, 2, 3, 4, 5], fixedRandomAgain);
    expect(a).toEqual(b);
  });
});

describe('getDailySeed', () => {
  it('is deterministic for the same date string', () => {
    expect(getDailySeed('2026-08-30')).toBe(getDailySeed('2026-08-30'));
  });

  it('differs between different dates (not a constant)', () => {
    expect(getDailySeed('2026-08-30')).not.toBe(getDailySeed('2026-08-31'));
  });

  it('always returns a non-negative integer', () => {
    const seed = getDailySeed('2026-01-01');
    expect(Number.isInteger(seed)).toBe(true);
    expect(seed).toBeGreaterThanOrEqual(0);
  });
});

describe('getDailyQuestions', () => {
  const pool: Question[] = Array.from({ length: 20 }, (_, i) => ({
    id: `q${i}`,
    title: `Question ${i}`,
    officialBattery: i * 5,
    explanation: '',
    category: 'absurd',
    emoji: '🔋'
  }));

  it('returns the same 5 questions in the same order for the same date — this is the whole point of a "daily" challenge', () => {
    const a = getDailyQuestions(pool, '2026-08-30');
    const b = getDailyQuestions(pool, '2026-08-30');
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
    expect(a).toHaveLength(5);
  });

  it('gives a different selection for a different date', () => {
    const day1 = getDailyQuestions(pool, '2026-08-30').map((q) => q.id);
    const day2 = getDailyQuestions(pool, '2026-08-31').map((q) => q.id);
    expect(day1).not.toEqual(day2);
  });

  it('never returns more questions than the pool has', () => {
    const smallPool = pool.slice(0, 3);
    expect(getDailyQuestions(smallPool, '2026-08-30')).toHaveLength(3);
  });
});
