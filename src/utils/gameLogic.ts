import { TitleBadge, Question } from '../types/game';

export function calculateScore(userGuess: number, officialBattery: number): { distance: number; score: number } {
  const distance = Math.abs(userGuess - officialBattery);
  const score = Math.max(0, 100 - distance);
  return { distance, score };
}

export function getCommentary(distance: number): string {
  if (distance === 0) {
    return '💯 完美命中！你是不是偷看了出題者的腦袋？！';
  } else if (distance <= 3) {
    return '⚡ 神級直覺！幾乎與官方答案完全重合！';
  } else if (distance <= 8) {
    return '🔋 超級精準！你對這個荒謬世界洞察力極高！';
  } else if (distance <= 15) {
    return '🎯 非常接近！直覺相當可靠喔！';
  } else if (distance <= 25) {
    return '👍 還算靠譜！雖然有點差距但方向是對的。';
  } else if (distance <= 40) {
    return '🤔 稍微偏了！你的世界觀可能跟出題者不大一樣？';
  } else if (distance <= 60) {
    return '🪫 離譜落差！這已經是另一個平行宇宙的電量了！';
  } else {
    return '💥 荒謬至極！馬鈴薯看了都搖頭的超遙遠答案！';
  }
}

export const TITLE_BADGES: TitleBadge[] = [
  {
    title: '⚡ 電量靈媒 (Battery Psychic)',
    minAvgScore: 95,
    emoji: '🧙‍♂️',
    description: '你的直覺已經超越人類極限，萬物的電量在你眼裡一覽無遺！'
  },
  {
    title: '🔋 滿格神算 (Battery Oracle)',
    minAvgScore: 85,
    emoji: '🔮',
    description: '抓得超級準！無論多荒謬的題目都難不倒你的直覺！'
  },
  {
    title: '🔌 直覺充沛 (Intuitive Charger)',
    minAvgScore: 75,
    emoji: '⚡',
    description: '電量感知能力極強，玩派對遊戲的絕對主力！'
  },
  {
    title: '📱 穩定中規中矩 (Balanced User)',
    minAvgScore: 60,
    emoji: '⚖️',
    description: '猜得四規八矩，偶爾神來一筆，偶爾大翻車！'
  },
  {
    title: '🪫 嚴重漏電 (Leaky Battery)',
    minAvgScore: 40,
    emoji: '🪫',
    description: '你的電量直覺似乎有點受潮，建議重新開機！'
  },
  {
    title: '🥔 馬鈴薯同路人 (Potato Soulmate)',
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
  const d = dateStr || new Date().toISOString().slice(0, 10);
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
