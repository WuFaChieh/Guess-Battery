import React, { useState, useEffect } from 'react';
import { Question, AnswerRecord } from '../types/game';
import { QuestionCard } from './QuestionCard';
import { BatteryGauge } from './BatteryGauge';
import { SliderInput } from './SliderInput';
import { RevealScreen } from './RevealScreen';
import { GameOverModal } from './GameOverModal';
import { calculateScore } from '../utils/gameLogic';
import { Filter } from 'lucide-react';
import { CATEGORY_LABELS } from '../data/questions';

interface SinglePlayerGameProps {
  allQuestions: Question[];
  questionCount?: number;
  gameModeName?: string;
  initialCategory?: string;
  onReturnHome?: () => void;
}

export const SinglePlayerGame: React.FC<SinglePlayerGameProps> = ({
  allQuestions,
  questionCount = 5,
  gameModeName = '經典速刷',
  initialCategory = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<number>(50);
  const [gameState, setGameState] = useState<'answering' | 'revealing' | 'completed'>('answering');
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  // Check if custom questions exist
  const hasCustomQuestions = allQuestions.some((q) => q.category === 'custom' || q.id.startsWith('custom_'));

  // Initialize randomized questions pool
  const initGame = (catFilter = selectedCategory) => {
    let pool: Question[] = [];

    if (catFilter === 'custom') {
      pool = allQuestions.filter((q) => q.category === 'custom' || q.id.startsWith('custom_'));
      if (pool.length === 0) {
        pool = allQuestions;
      }
    } else if (catFilter !== 'all') {
      pool = allQuestions.filter((q) => q.category === catFilter && !q.id.startsWith('custom_'));
      if (pool.length === 0) {
        pool = allQuestions;
      }
    } else {
      pool = allQuestions;
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const finalQuestions = shuffled.slice(0, Math.min(questionCount, pool.length));
    
    setQuestions(finalQuestions);
    setCurrentIndex(0);
    setCurrentGuess(50);
    setAnswers([]);
    setGameState('answering');
  };

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      initGame(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    initGame(selectedCategory);
  }, [selectedCategory, questionCount, allQuestions.length]);

  const handleSubmitGuess = () => {
    const q = questions[currentIndex];
    const { distance, score } = calculateScore(currentGuess, q.officialBattery);
    
    const newRecord: AnswerRecord = {
      question: q,
      userGuess: currentGuess,
      officialBattery: q.officialBattery,
      distance,
      score,
      commentary: ''
    };

    setAnswers((prev) => [...prev, newRecord]);
    setGameState('revealing');
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentGuess(50);
      setGameState('answering');
    } else {
      setGameState('completed');
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        載入題庫中...
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  if (gameState === 'completed') {
    return (
      <GameOverModal
        answers={answers}
        onRestart={() => initGame(selectedCategory)}
        gameModeName={selectedCategory === 'custom' ? '自訂題庫試玩' : gameModeName}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Category Filter Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto max-w-xl w-full p-2 mb-2 bg-slate-900/60 rounded-2xl border border-slate-800">
        <Filter className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
        {Object.entries(CATEGORY_LABELS).map(([key, item]) => {
          // Hide custom filter if user hasn't created custom questions yet
          if (key === 'custom' && !hasCustomQuestions) return null;

          const isActive = selectedCategory === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.icon} {item.label}
            </button>
          );
        })}
      </div>

      {gameState === 'answering' && (
        <div className="w-full flex flex-col items-center">
          {/* Question Card */}
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
          />

          {/* Real-time Battery Gauge Preview */}
          <BatteryGauge value={currentGuess} label="你猜的電量" size="lg" />

          {/* Interactive Slider Input */}
          <SliderInput
            value={currentGuess}
            onChange={setCurrentGuess}
            onSubmit={handleSubmitGuess}
          />
        </div>
      )}

      {gameState === 'revealing' && (
        <RevealScreen
          question={currentQuestion}
          userGuess={currentGuess}
          onNext={handleNextQuestion}
          isLastQuestion={currentIndex === questions.length - 1}
        />
      )}
    </div>
  );
};
