export type QuestionCategory = 'absurd' | 'math' | 'custom';

export interface Question {
  id: string;
  title: string;
  officialBattery: number; // 0 to 100
  explanation: string;
  category: QuestionCategory;
  emoji: string;
}

export type GameMode = 'single_5' | 'mutual_pk' | 'party' | 'custom';

export interface AnswerRecord {
  question: Question;
  userGuess: number;
  officialBattery: number;
  distance: number;
  score: number;
  commentary: string;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
  totalScore: number;
  guesses: Record<string, number>; // questionId -> guess
}

export interface PartyRoundResult {
  question: Question;
  results: {
    player: Player;
    guess: number;
    distance: number;
    score: number;
  }[];
  bestPlayer: Player;
}

export interface TitleBadge {
  title: string;
  minAvgScore: number;
  emoji: string;
  description: string;
}
