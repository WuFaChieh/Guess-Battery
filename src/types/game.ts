export type QuestionCategory = 'calculus' | 'geometry' | 'algebra' | 'mechanics' | 'economics' | 'finance' | 'cs' | 'custom';

export interface Question {
  id: string;
  title: string;
  officialBattery: number; // 0 to 100
  explanation: string;
  category: QuestionCategory;
  emoji: string;
  // English translations of title/explanation — present on every built-in
  // question (src/data/questions.ts), absent on user-authored custom
  // questions (there's no way to auto-translate what a player typed, so an
  // English session just falls back to showing their original text — see
  // getLocalizedQuestionText() in utils/gameLogic.ts).
  titleEn?: string;
  explanationEn?: string;
  // A trace-the-code snippet (category: 'cs' questions only) rendered as a
  // monospace block in QuestionCard, above the (language-specific) title
  // text. Code itself isn't translated — Python syntax reads the same in
  // either UI language, so there's no codeEn counterpart.
  code?: string;
}

export type GameMode = 'single_5' | 'mutual_pk' | 'party' | 'custom' | 'daily';

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
  /** Stable key for looking up this badge's localized title/description —
   * see badge_<id>_title / badge_<id>_desc in src/i18n/translations.ts. */
  id: string;
  title: string;
  minAvgScore: number;
  emoji: string;
  description: string;
}
