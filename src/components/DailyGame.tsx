import React, { useState, useEffect, useRef } from 'react';
import { Question, AnswerRecord } from '../types/game';
import { getDailyQuestions, calculateScore, getCurrentCombo, getDailyShareText } from '../utils/gameLogic';
import { getDailyStreak, recordDailyCompletion, type DailyStreakState } from '../utils/dailyStreak';
import { QuestionCard } from './QuestionCard';
import { BatteryGauge } from './BatteryGauge';
import { SliderInput } from './SliderInput';
import { RevealScreen } from './RevealScreen';
import { GameOverModal } from './GameOverModal';
import { LoadingState } from './LoadingState';
import { shareResult } from '../utils/share';
import { Calendar, Sparkles, Flame, Share2, Check } from 'lucide-react';

interface DailyGameProps {
  allQuestions: Question[];
}

export const DailyGame: React.FC<DailyGameProps> = ({ allQuestions }) => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const [dailyQuestions, setDailyQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<number>(50);
  const [gameState, setGameState] = useState<'answering' | 'revealing' | 'completed'>('answering');
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [streak, setStreak] = useState<DailyStreakState>(() => getDailyStreak());
  const [shareState, setShareState] = useState<'idle' | 'shared' | 'copied'>('idle');
  // Guards against re-recording the streak if this component re-renders
  // while already completed (e.g. a parent re-render) — the streak should
  // only advance once per actual finish, not once per render.
  const hasRecordedRef = useRef(false);

  useEffect(() => {
    const qList = getDailyQuestions(allQuestions, todayStr);
    setDailyQuestions(qList);
    setCurrentIndex(0);
    setCurrentGuess(50);
    setAnswers([]);
    setGameState('answering');
    hasRecordedRef.current = false;
  }, [allQuestions, todayStr]);

  useEffect(() => {
    if (gameState === 'completed' && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      setStreak(recordDailyCompletion(todayStr));
    }
  }, [gameState, todayStr]);

  const handleShareDaily = async () => {
    const shareText = getDailyShareText(answers, streak.currentStreak, todayStr);
    const outcome = await shareResult(shareText);
    if (outcome === 'unavailable') return;
    setShareState(outcome);
    setTimeout(() => setShareState('idle'), 2500);
  };

  const handleSubmitGuess = () => {
    const q = dailyQuestions[currentIndex];
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
    if (currentIndex + 1 < dailyQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentGuess(50);
      setGameState('answering');
    } else {
      setGameState('completed');
    }
  };

  if (dailyQuestions.length === 0) {
    return <LoadingState label="載入每日題目中..." />;
  }

  const currentQ = dailyQuestions[currentIndex];

  if (gameState === 'completed') {
    return (
      <div className="w-full flex flex-col items-center gap-3">
        {/* Streak + Wordle-style shareable result grid — the daily-specific
            extras GameOverModal itself stays agnostic of. */}
        <div className="w-full max-w-xl mx-auto bg-slate-900/90 p-4 rounded-2xl border border-orange-500/30 shadow-lg flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-orange-300 font-bold text-sm">
            <Flame className="w-5 h-5 text-orange-400" />
            <span>連續挑戰 {streak.currentStreak} 天！</span>
            {streak.longestStreak > streak.currentStreak && (
              <span className="text-[11px] text-slate-500 font-medium">（最佳 {streak.longestStreak} 天）</span>
            )}
          </div>
          <button
            onClick={handleShareDaily}
            className="shrink-0 py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 border border-slate-700"
          >
            {shareState !== 'idle' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-300" />}
            <span>{shareState === 'copied' ? '已複製戰績方格！' : shareState === 'shared' ? '已開啟分享！' : '分享今日戰績方格'}</span>
          </button>
        </div>

        <GameOverModal
          answers={answers}
          onRestart={() => {
            setCurrentIndex(0);
            setCurrentGuess(50);
            setAnswers([]);
            setGameState('answering');
          }}
          gameModeName={`每日挑戰 (${todayStr})`}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Daily Banner */}
      <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-4 py-2 rounded-2xl text-purple-300 text-xs font-bold mb-3 shadow-sm">
        <Calendar className="w-4 h-4 text-purple-400" />
        <span>每日限定題目 (日期：{todayStr})</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
      </div>

      {gameState === 'answering' && (
        <div className="w-full flex flex-col items-center">
          <QuestionCard
            question={currentQ}
            currentIndex={currentIndex}
            totalQuestions={dailyQuestions.length}
            comboCount={getCurrentCombo(answers)}
          />

          <BatteryGauge value={currentGuess} label="今日猜測" size="lg" />

          <SliderInput
            value={currentGuess}
            onChange={setCurrentGuess}
            onSubmit={handleSubmitGuess}
          />
        </div>
      )}

      {gameState === 'revealing' && (
        <RevealScreen
          question={currentQ}
          userGuess={currentGuess}
          onNext={handleNextQuestion}
          isLastQuestion={currentIndex === dailyQuestions.length - 1}
          comboCount={getCurrentCombo(answers)}
        />
      )}
    </div>
  );
};
