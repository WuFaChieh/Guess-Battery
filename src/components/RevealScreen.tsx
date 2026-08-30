import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types/game';
import { BatteryGauge } from './BatteryGauge';
import { calculateScore, getCommentary, getCommentaryIcon } from '../utils/gameLogic';
import { playRevealSound, playScoreSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { ArrowRight, Trophy, Lightbulb } from 'lucide-react';

interface RevealScreenProps {
  question: Question;
  userGuess: number;
  onNext: () => void;
  isLastQuestion?: boolean;
}

export const RevealScreen: React.FC<RevealScreenProps> = ({
  question,
  userGuess,
  onNext,
  isLastQuestion = false
}) => {
  const { distance, score } = calculateScore(userGuess, question.officialBattery);
  const commentary = getCommentary(distance);
  const CommentaryIcon = getCommentaryIcon(distance);

  useEffect(() => {
    playRevealSound();
    const timer = setTimeout(() => {
      playScoreSound(score);
      if (score >= 90) {
        confetti({
          particleCount: score === 100 ? 100 : 50,
          spread: score === 100 ? 100 : 60,
          origin: { y: 0.6 }
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900/90 p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center gap-4 sm:gap-6">
      {/* Title */}
      <div className="text-center px-1">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          揭曉答案
        </span>
        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mt-2 leading-snug">
          {question.title}
        </h3>
      </div>

      {/* Dual Battery Comparison */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full items-center justify-items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <BatteryGauge value={userGuess} label="你的猜測" size="md" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <BatteryGauge value={question.officialBattery} label="官方答案" size="md" />
        </motion.div>
      </div>

      {/* Distance & Score Banner */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 text-center flex flex-col items-center gap-2"
      >
        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm">
          <span className="text-slate-400">
            差距：<strong className="text-amber-400 font-bold">{distance}%</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            得分：
            <strong className={`font-black text-lg sm:text-xl ${score >= 90 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
              +{score}
            </strong>
          </span>
        </div>

        {/* Reaction commentary */}
        <p className="text-emerald-300 font-bold text-sm sm:text-base md:text-lg flex items-center gap-1.5 justify-center mt-0.5">
          <CommentaryIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${score === 100 ? 'text-amber-400 animate-spin' : 'text-emerald-400'}`} />
          <span>{commentary}</span>
        </p>

        {/* Official Explanation */}
        <div className="mt-1.5 p-3 bg-slate-900 rounded-xl text-xs text-slate-300 border border-slate-800/80 leading-relaxed text-left w-full">
          <span className="font-bold text-amber-400 flex items-center gap-1 mb-0.5">
            <Lightbulb className="w-3.5 h-3.5" /> 官方電量解說：
          </span>
          {question.explanation}
        </div>
      </motion.div>

      {/* Next Question Button */}
      <button
        onClick={onNext}
        className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-base sm:text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
      >
        <span>{isLastQuestion ? '進入總結算' : '下一題'}</span>
        {isLastQuestion ? <Trophy className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
      </button>
    </div>
  );
};
