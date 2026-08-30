import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Question, AnswerRecord } from '../types/game';
import { QuestionCard } from './QuestionCard';
import { BatteryGauge } from './BatteryGauge';
import { SliderInput } from './SliderInput';
import { RevealScreen } from './RevealScreen';
import { GameOverModal } from './GameOverModal';
import { LoadingState } from './LoadingState';
import { calculateScore, shuffleArray, getCurrentCombo } from '../utils/gameLogic';
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

  // Latest-value ref for allQuestions. App.tsx rebuilds `allAvailableQuestions`
  // as a fresh array on every one of its renders (even when nothing in it
  // actually changed), so depending on `allQuestions` by reference — directly
  // or via a useCallback dep — would make `initGame` a new function (and
  // trigger a re-shuffle) on every unrelated parent re-render. Reading through
  // a ref instead lets `initGame` stay stable across those, while still always
  // seeing the current pool when it actually runs. (Assigning during render is
  // safe here — it's idempotent and only ever read later, from effects/handlers.)
  const allQuestionsRef = useRef(allQuestions);
  allQuestionsRef.current = allQuestions;

  // Initialize randomized questions pool. Depends only on `questionCount`, so
  // its identity — and the init effect below that depends on it — only
  // changes when the question count actually changes.
  const initGame = useCallback((catFilter: string) => {
    const source = allQuestionsRef.current;
    let pool: Question[];

    if (catFilter === 'custom') {
      pool = source.filter((q) => q.category === 'custom' || q.id.startsWith('custom_'));
      if (pool.length === 0) {
        pool = source;
      }
    } else if (catFilter !== 'all') {
      pool = source.filter((q) => q.category === catFilter && !q.id.startsWith('custom_'));
      if (pool.length === 0) {
        pool = source;
      }
    } else {
      pool = source;
    }

    const finalQuestions = shuffleArray(pool).slice(0, Math.min(questionCount, pool.length));

    setQuestions(finalQuestions);
    setCurrentIndex(0);
    setCurrentGuess(50);
    setAnswers([]);
    setGameState('answering');
  }, [questionCount]);

  // Single init effect covering every re-init trigger — a new initialCategory
  // from the parent, the in-component category filter changing
  // selectedCategory, questionCount changing, or the question pool's size
  // changing (questions added/removed) — so mounting only ever shuffles the
  // question pool once. Previously this was two separate effects that both
  // fired on mount, double-initializing (and double-shuffling) every game
  // session. `allQuestions.length` is included purely to trigger a re-init
  // when the pool size changes; `initGame` reads the current pool via the ref
  // above rather than this effect passing it along.
  useEffect(() => {
    const catFilter = initialCategory || selectedCategory;
    if (catFilter !== selectedCategory) {
      setSelectedCategory(catFilter);
    }
    initGame(catFilter);
  }, [initialCategory, selectedCategory, initGame, allQuestions.length]);

  // Memoized so SliderInput's onSubmit prop stays referentially stable across
  // re-renders that don't touch the question/guess state this actually reads.
  const handleSubmitGuess = useCallback(() => {
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
  }, [questions, currentIndex, currentGuess]);

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
    return <LoadingState label="載入題庫中..." />;
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
      {/* Category Filter Selector (Equal-width Grid - 100% Scrollbar Free) */}
      <div className={`grid ${hasCustomQuestions ? 'grid-cols-4' : 'grid-cols-3'} gap-1 max-w-md w-full p-1 mb-2 bg-slate-900/80 rounded-2xl border border-slate-800 select-none`}>
        {Object.entries(CATEGORY_LABELS).map(([key, item]) => {
          // Hide custom filter if user hasn't created custom questions yet
          if (key === 'custom' && !hasCustomQuestions) return null;

          const isActive = selectedCategory === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`py-1.5 px-1 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all flex items-center justify-center gap-1 ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="text-xs">{item.icon}</span>
              <span>{item.label}</span>
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
            comboCount={getCurrentCombo(answers)}
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
          comboCount={getCurrentCombo(answers)}
        />
      )}
    </div>
  );
};
