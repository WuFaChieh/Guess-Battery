import { Question } from '../types/game';
import { INITIAL_QUESTIONS } from '../data/questions';

export interface AiBot {
  id: string;
  name: string; // 2字名字
  avatar: string;
  difficulty: '弱' | '普通' | '強';
  description: string;
  minError: number;
  maxError: number;
}

export const AI_BOTS: AiBot[] = [
  // 弱 (Easy)
  {
    id: 'bot_weak_1',
    name: '菜菜',
    avatar: '🌱',
    difficulty: '弱',
    description: '剛加入的實習生，憑感覺隨性出牌！',
    minError: 15,
    maxError: 30
  },
  {
    id: 'bot_weak_2',
    name: '阿柴',
    avatar: '🐕',
    difficulty: '弱',
    description: '柴犬直覺，喜歡猜極端爆表數值！',
    minError: 14,
    maxError: 28
  },

  // 普通 (Medium)
  {
    id: 'bot_normal_1',
    name: '阿特',
    avatar: '💻',
    difficulty: '普通',
    description: '標準計算機，估算相當中規中矩。',
    minError: 7,
    maxError: 14
  },
  {
    id: 'bot_normal_2',
    name: '小仙',
    avatar: '🔮',
    difficulty: '普通',
    description: '直覺型選手，感應力十分穩定！',
    minError: 6,
    maxError: 12
  },

  // 強 (Hard)
  {
    id: 'bot_hard_1',
    name: '歐拉',
    avatar: '🤓',
    difficulty: '強',
    description: '微積分大師，擅長精準對應極限！',
    minError: 1,
    maxError: 5
  },
  {
    id: 'bot_hard_2',
    name: '極限',
    avatar: '🎯',
    difficulty: '強',
    description: '算法狂人，幾乎擁有神級精準度！',
    minError: 0,
    maxError: 4
  }
];

// Helper to pick an AI bot by difficulty or random
export function getRandomBot(preferredDifficulty?: '弱' | '普通' | '強'): AiBot {
  let pool = AI_BOTS;
  if (preferredDifficulty) {
    pool = AI_BOTS.filter((b) => b.difficulty === preferredDifficulty);
    if (pool.length === 0) pool = AI_BOTS;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

// Calculate AI guess based on official battery and bot difficulty
export function getAiGuess(officialBattery: number, bot: AiBot): number {
  const errorRange = bot.minError + Math.random() * (bot.maxError - bot.minError);
  const direction = Math.random() > 0.5 ? 1 : -1;
  const guess = Math.round(officialBattery + direction * errorRange);
  return Math.min(100, Math.max(0, guess));
}

// AI randomly picks 3 questions to challenge player
export function getAiChallengeQuestions(count = 3): Question[] {
  const shuffled = [...INITIAL_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
