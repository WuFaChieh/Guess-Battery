import { describe, it, expect } from 'vitest';
import {
  calculateScore,
  getCommentary,
  getCommentaryIcon,
  getBadgeForScore,
  TITLE_BADGES,
  shuffleArray,
  getDailySeed,
  getDailyQuestions,
  getCurrentCombo,
  getComboBonus,
  getComboBonusSeries,
  getResultEmoji,
  getDailyShareText,
  COMBO_HIT_DISTANCE
} from './gameLogic';
import type { Question, AnswerRecord } from '../types/game';

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

describe('getCurrentCombo', () => {
  const hit = { distance: COMBO_HIT_DISTANCE };
  const miss = { distance: COMBO_HIT_DISTANCE + 1 };

  it('is 0 for an empty history', () => {
    expect(getCurrentCombo([])).toBe(0);
  });

  it('counts consecutive hits ending at the last answer', () => {
    expect(getCurrentCombo([hit, hit, hit])).toBe(3);
  });

  it('breaks immediately on a miss, even after a long run of hits', () => {
    expect(getCurrentCombo([hit, hit, hit, miss])).toBe(0);
  });

  it('only counts the trailing run, not hits before an earlier miss', () => {
    expect(getCurrentCombo([hit, miss, hit, hit])).toBe(2);
  });

  it('treats exactly COMBO_HIT_DISTANCE as a hit, one more as a miss', () => {
    expect(getCurrentCombo([hit])).toBe(1);
    expect(getCurrentCombo([miss])).toBe(0);
  });
});

describe('getComboBonus', () => {
  it('pays nothing for zero or a single hit — a streak needs at least two', () => {
    expect(getComboBonus(0)).toBe(0);
    expect(getComboBonus(1)).toBe(0);
  });

  it('grows by 5 per hit beyond the first', () => {
    expect(getComboBonus(2)).toBe(5);
    expect(getComboBonus(3)).toBe(10);
    expect(getComboBonus(4)).toBe(15);
  });

  it('caps out instead of growing forever', () => {
    expect(getComboBonus(5)).toBe(20);
    expect(getComboBonus(50)).toBe(20);
  });
});

describe('getComboBonusSeries', () => {
  it('matches getComboBonus(getCurrentCombo(...)) at every prefix', () => {
    const answers = [
      { distance: 5 },
      { distance: 5 },
      { distance: 40 }, // breaks the combo
      { distance: 5 },
      { distance: 5 }
    ];
    expect(getComboBonusSeries(answers)).toEqual([0, 5, 0, 0, 5]);
  });

  it('returns an empty series for no answers', () => {
    expect(getComboBonusSeries([])).toEqual([]);
  });
});

describe('getResultEmoji', () => {
  it('bands distance into four tiers, best to worst', () => {
    expect(getResultEmoji(0)).toBe('🟩');
    expect(getResultEmoji(8)).toBe('🟩');
    expect(getResultEmoji(9)).toBe('🟨');
    expect(getResultEmoji(25)).toBe('🟨');
    expect(getResultEmoji(26)).toBe('🟧');
    expect(getResultEmoji(40)).toBe('🟧');
    expect(getResultEmoji(41)).toBe('🟥');
    expect(getResultEmoji(100)).toBe('🟥');
  });
});

describe('getDailyShareText', () => {
  const makeAnswer = (distance: number, score: number): AnswerRecord => ({
    question: { id: 'q', title: 't', officialBattery: 50, explanation: '', category: 'absurd', emoji: '🔋' },
    userGuess: 50 - distance,
    officialBattery: 50,
    distance,
    score,
    commentary: ''
  });

  it('includes one emoji per answer and the rounded average score', () => {
    const answers = [makeAnswer(0, 100), makeAnswer(50, 50)];
    const text = getDailyShareText(answers, 1, '2026-08-30');
    expect(text).toContain('🟩🟥');
    expect(text).toContain('平均 75%');
  });

  it('omits the streak line for a streak of 1 (nothing to brag about yet)', () => {
    const text = getDailyShareText([makeAnswer(0, 100)], 1, '2026-08-30');
    expect(text).not.toContain('連續挑戰');
  });

  it('includes the streak line once the streak is more than one day', () => {
    const text = getDailyShareText([makeAnswer(0, 100)], 5, '2026-08-30');
    expect(text).toContain('連續挑戰 5 天');
  });
});
