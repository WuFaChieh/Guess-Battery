import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types/game';
import { BatteryGauge } from './BatteryGauge';
import { calculateScore, getCommentary, getCommentaryIcon, getComboBonus, getLocalizedQuestionText } from '../utils/gameLogic';
import { playRevealSound, playScoreSound, playComboSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { ArrowRight, Trophy, Lightbulb, Flame } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface RevealScreenProps {
  question: Question;
  userGuess: number;
  onNext: () => void;
  isLastQuestion?: boolean;
  /** Combo streak as of this answer (0 = no combo). */
  comboCount?: number;
}

export const RevealScreen: React.FC<RevealScreenProps> = ({
  question,
  userGuess,
  onNext,
  isLastQuestion = false,
  comboCount = 0
}) => {
  const { lang, t } = useLanguage();
  const { title, explanation } = getLocalizedQuestionText(question, lang);
  const { distance, score } = calculateScore(userGuess, question.officialBattery);
  const commentary = getCommentary(distance, lang);
  const CommentaryIcon = getCommentaryIcon(distance);
  const comboBonus = getComboBonus(comboCount);

  useEffect(() => {
    playRevealSound();
    const timer = setTimeout(() => {
      playScoreSound(score);
      if (comboBonus > 0) {
        // A dedicated sting for the combo bonus itself, layered after the
        // regular score sound, so a combo reads as its own little event
        // instead of blending into the normal reveal.
        playComboSound();
      }
      if (score >= 90) {
        confetti({
          particleCount: score === 100 ? 100 : 50,
          spread: score === 100 ? 100 : 60,
          origin: { y: 0.6 }
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [score, comboBonus]);

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900/90 p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center gap-4 sm:gap-6">
      {/* Title */}
      <div className="text-center px-1">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          {t('reveal_badge')}
        </span>
        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mt-2 leading-snug">
          {title}
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
          <BatteryGauge value={userGuess} label={t('reveal_your_guess')} size="md" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <BatteryGauge value={question.officialBattery} label={t('reveal_official_answer')} size="md" />
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
            {t('reveal_distance')}<strong className="text-amber-400 font-bold">{distance}%</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            {t('reveal_score')}
            <strong className={`font-black text-lg sm:text-xl ${score >= 90 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
              +{score}
            </strong>
          </span>
        </div>

        {/* Combo bonus celebration — only appears once a streak actually pays out */}
        {comboBonus > 0 && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 15 }}
            className="px-3.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-300 text-xs sm:text-sm font-bold flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>{t('reveal_combo', { n: comboCount, bonus: comboBonus })}</span>
          </motion.div>
        )}

        {/* Reaction commentary */}
        <p className="text-emerald-300 font-bold text-sm sm:text-base md:text-lg flex items-center gap-1.5 justify-center mt-0.5">
          <CommentaryIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${score === 100 ? 'text-amber-400 animate-spin' : 'text-emerald-400'}`} />
          <span>{commentary}</span>
        </p>

        {/* Official Explanation */}
        <div className="mt-1.5 p-3 bg-slate-900 rounded-xl text-xs text-slate-300 border border-slate-800/80 leading-relaxed text-left w-full">
          <span className="font-bold text-amber-400 flex items-center gap-1 mb-0.5">
            <Lightbulb className="w-3.5 h-3.5" /> {t('reveal_explanation_label')}
          </span>
          {explanation}
        </div>
      </motion.div>

      {/* Next Question Button */}
      <button
        onClick={onNext}
        className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-black text-base sm:text-lg shadow-lg shadow-purple-950/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-violet-400/30"
      >
        <span>{isLastQuestion ? t('reveal_finish') : t('reveal_next')}</span>
        {isLastQuestion ? <Trophy className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
      </button>
    </div>
  );
};
