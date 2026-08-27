import React, { useState, useEffect } from 'react';
import { Question, AnswerRecord } from '../types/game';
import { getDailyQuestions } from '../utils/gameLogic';
import { QuestionCard } from './QuestionCard';
import { BatteryGauge } from './BatteryGauge';
import { SliderInput } from './SliderInput';
import { RevealScreen } from './RevealScreen';
import { GameOverModal } from './GameOverModal';
import { calculateScore } from '../utils/gameLogic';
import { Calendar, Sparkles } from 'lucide-react';

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

  useEffect(() => {
    const qList = getDailyQuestions(allQuestions, todayStr);
    setDailyQuestions(qList);
    setCurrentIndex(0);
    setCurrentGuess(50);
    setAnswers([]);
    setGameState('answering');
  }, [allQuestions, todayStr]);

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
    return <div className="text-center py-12 text-slate-400">載入每日題目中...</div>;
  }

  const currentQ = dailyQuestions[currentIndex];

  if (gameState === 'completed') {
    return (
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
        />
      )}
    </div>
  );
};
