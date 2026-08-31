import { LucideIcon, Trophy, Zap, BatteryCharging, Target, ThumbsUp, HelpCircle, BatteryWarning, Bomb } from 'lucide-react';
import { TitleBadge, Question, AnswerRecord } from '../types/game';
import { getLocalDateString } from './date';

export function calculateScore(userGuess: number, officialBattery: number): { distance: number; score: number } {
  const distance = Math.abs(userGuess - officialBattery);
  const score = Math.max(0, 100 - distance);
  return { distance, score };
}

export function getCommentary(distance: number): string {
  if (distance === 0) {
    return '完美命中！你是不是偷看了出題者的腦袋？！';
  } else if (distance <= 3) {
    return '神級直覺！幾乎與官方答案完全重合！';
  } else if (distance <= 8) {
    return '超級精準！你對這個荒謬世界洞察力極高！';
  } else if (distance <= 15) {
    return '非常接近！直覺相當可靠喔！';
  } else if (distance <= 25) {
    return '還算靠譜！雖然有點差距但方向是對的。';
  } else if (distance <= 40) {
    return '稍微偏了！你的世界觀可能跟出題者不大一樣？';
  } else if (distance <= 60) {
    return '離譜落差！這已經是另一個平行宇宙的電量了！';
  } else {
    return '荒謬至極！馬鈴薯看了都搖頭的超遙遠答案！';
  }
}

/** Icon paired with getCommentary()'s text, one per distance tier — rendered
 * alongside the commentary instead of an emoji baked into the string. */
export function getCommentaryIcon(distance: number): LucideIcon {
  if (distance === 0) return Trophy;
  if (distance <= 3) return Zap;
  if (distance <= 8) return BatteryCharging;
  if (distance <= 15) return Target;
  if (distance <= 25) return ThumbsUp;
  if (distance <= 40) return HelpCircle;
  if (distance <= 60) return BatteryWarning;
  return Bomb;
}

// ---------------------------------------------------------------------
// 🔥 Combo bonus — a guess this close (or closer) to the official answer
// keeps a combo alive; one further than this breaks it. Matches the
// "非常接近" commentary tier and everything better than it, i.e. the
// distances a player would recognize as "a good guess", not a lucky miss.
// ---------------------------------------------------------------------
export const COMBO_HIT_DISTANCE = 15;

// Trailing streak of consecutive hits (distance <= COMBO_HIT_DISTANCE),
// counting back from the end of the list — breaks the moment one answer
// misses. Takes just the `distance` field so it works against either a full
// AnswerRecord history or a lighter-weight list of just-scored distances.
export function getCurrentCombo(answers: { distance: number }[]): number {
  let combo = 0;
  for (let i = answers.length - 1; i >= 0; i--) {
    if (answers[i].distance <= COMBO_HIT_DISTANCE) combo++;
    else break;
  }
  return combo;
}

// Bonus points for a combo of the given length. A single hit (combo === 1)
// doesn't pay out yet — it takes two in a row to feel like a streak — then
// +5 per additional hit, capped so one lucky run can't dwarf the base
// 0-100 accuracy scores it's layered on top of.
export function getComboBonus(comboCount: number): number {
  return Math.min(Math.max(0, comboCount - 1) * 5, 20);
}

// Per-answer combo bonus, in the same order as `answers` — for a results
// breakdown list and its total.
export function getComboBonusSeries(answers: { distance: number }[]): number[] {
  return answers.map((_, idx) => getComboBonus(getCurrentCombo(answers.slice(0, idx + 1))));
}

// ---------------------------------------------------------------------
// 📋 Wordle-style shareable result grid
// ---------------------------------------------------------------------

// One emoji square per answer, coarser than the 8-tier commentary ladder —
// just enough bands to read as a grid at a glance, the way Wordle's
// green/yellow/gray does.
export function getResultEmoji(distance: number): string {
  if (distance <= 8) return '🟩';
  if (distance <= 25) return '🟨';
  if (distance <= 40) return '🟧';
  return '🟥';
}

// Builds the shareable "today's daily challenge" text block: an emoji grid
// of how each answer landed, the average score, and the current streak —
// the same shape as a Wordle share (a spoiler-free result grid plus a
// one-line brag), handed to utils/share.ts's shareResult().
export function getDailyShareText(answers: AnswerRecord[], streakDays: number, dateStr: string): string {
  const grid = answers.map((a) => getResultEmoji(a.distance)).join('');
  const avgScore = answers.length > 0 ? Math.round(answers.reduce((acc, a) => acc + a.score, 0) / answers.length) : 0;
  const streakLine = streakDays > 1 ? `\n🔥 連續挑戰 ${streakDays} 天！` : '';
  return `🔋猜電量 每日挑戰 ${dateStr}\n${grid}  平均 ${avgScore}%${streakLine}\n萬物皆有電量，你猜得準嗎？快來試試！`;
}

export const TITLE_BADGES: TitleBadge[] = [
  {
    title: '電量靈媒 (Battery Psychic)',
    minAvgScore: 95,
    emoji: '🧙‍♂️',
    description: '你的直覺已經超越人類極限，萬物的電量在你眼裡一覽無遺！'
  },
  {
    title: '滿格神算 (Battery Oracle)',
    minAvgScore: 85,
    emoji: '🔮',
    description: '抓得超級準！無論多荒謬的題目都難不倒你的直覺！'
  },
  {
    title: '直覺充沛 (Intuitive Charger)',
    minAvgScore: 75,
    emoji: '⚡',
    description: '電量感知能力極強，玩派對遊戲的絕對主力！'
  },
  {
    title: '穩定中規中矩 (Balanced User)',
    minAvgScore: 60,
    emoji: '⚖️',
    description: '猜得四規八矩，偶爾神來一筆，偶爾大翻車！'
  },
  {
    title: '嚴重漏電 (Leaky Battery)',
    minAvgScore: 40,
    emoji: '🪫',
    description: '你的電量直覺似乎有點受潮，建議重新開機！'
  },
  {
    title: '馬鈴薯同路人 (Potato Soulmate)',
    minAvgScore: 0,
    emoji: '🥔',
    description: '完全無法用常人邏輯思考！但這樣的荒謬正是派對的核心樂趣！'
  }
];

export function getBadgeForScore(avgScore: number): TitleBadge {
  for (const badge of TITLE_BADGES) {
    if (avgScore >= badge.minAvgScore) {
      return badge;
    }
  }
  return TITLE_BADGES[TITLE_BADGES.length - 1];
}

// Unbiased Fisher-Yates shuffle. Accepts an optional random source (must
// return a float in [0, 1)) for deterministic/seeded shuffling — defaults to
// Math.random() for true randomness. Replaces the common but statistically
// biased `array.sort(() => 0.5 - Math.random())` pattern used across the app.
export function shuffleArray<T>(array: T[], random: () => number = Math.random): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Seeded pseudorandom string hash for Daily Challenge consistency
export function getDailySeed(dateStr?: string): number {
  const d = dateStr || getLocalDateString();
  let hash = 0;
  for (let i = 0; i < d.length; i++) {
    const char = d.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getDailyQuestions(allQuestions: Question[], dateStr?: string): Question[] {
  let currentSeed = getDailySeed(dateStr);
  const pseudoRandom = () => {
    const x = Math.sin(currentSeed++) * 10000;
    return x - Math.floor(x);
  };

  return shuffleArray(allQuestions, pseudoRandom).slice(0, 5);
}
