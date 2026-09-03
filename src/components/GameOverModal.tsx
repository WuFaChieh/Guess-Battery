import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnswerRecord } from '../types/game';
import { getBadgeForScore, getBadgeTitle, getBadgeDescription, getComboBonusSeries, getLocalizedQuestionText } from '../utils/gameLogic';
import { playChargingSound, playScoreSound } from '../utils/audio';
import { UnifiedBattery } from './UnifiedBattery';
import { shareResult } from '../utils/share';
import confetti from 'canvas-confetti';
import { RotateCcw, Share2, Check, Sparkles, Zap, Plug, ClipboardList, Flame } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface GameOverModalProps {
  answers: AnswerRecord[];
  onRestart: () => void;
  gameModeName?: string;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  answers,
  onRestart,
  gameModeName
}) => {
  const { lang, t } = useLanguage();
  const resolvedModeName = gameModeName ?? t('mode_single_5');
  const [shareState, setShareState] = useState<'idle' | 'shared' | 'copied'>('idle');
  const [chargingProgress, setChargingProgress] = useState(0);
  const [isCharging, setIsCharging] = useState(true);

  const totalScore = answers.reduce((acc, a) => acc + a.score, 0);
  // avgScore/badge deliberately stay pure-accuracy — based on totalScore
  // alone — so a lucky combo run never inflates the title a player earns.
  const avgScore = answers.length > 0 ? Math.round(totalScore / answers.length) : 0;
  const badge = getBadgeForScore(avgScore);
  const comboBonusSeries = getComboBonusSeries(answers);
  const totalComboBonus = comboBonusSeries.reduce((acc, b) => acc + b, 0);
  const grandTotal = totalScore + totalComboBonus;

  // Dynamic facial expression for battery mascot. Plain text throughout — no
  // kaomoji here — keeps the results screen reading as a stats card rather
  // than mixing register with the loading screen's cuter mascot voice.
  const getBatteryFace = (val: number, done: boolean) => {
    if (!done) return t('face_charging');
    if (val >= 90) return t('face_90');
    if (val >= 70) return t('face_70');
    if (val >= 40) return t('face_40');
    return t('face_low');
  };

  // Charging Ceremony Animation on mount
  useEffect(() => {
    let current = 0;
    const target = avgScore;

    if (target === 0) {
      setIsCharging(false);
      return;
    }

    const stepTime = Math.max(12, Math.floor(1000 / target));

    const timer = setInterval(() => {
      current += 1;
      if (current >= target) {
        current = target;
        setChargingProgress(target);
        clearInterval(timer);
        
        setTimeout(() => {
          setIsCharging(false);
          playScoreSound(avgScore);
          confetti({
            particleCount: avgScore >= 80 ? 120 : 60,
            spread: 80,
            origin: { y: 0.5 }
          });
        }, 300);
      } else {
        setChargingProgress(current);
        if (current % 3 === 0) {
          playChargingSound(current); // Louder & punchier charging synth sound!
        }
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [avgScore]);

  const handleShare = async () => {
    const comboLine = totalComboBonus > 0 ? t('share_gameover_combo_line', { n: totalComboBonus }) : '';
    const shareText = t('share_gameover_text', {
      mode: resolvedModeName,
      total: grandTotal,
      comboLine,
      avg: avgScore,
      badgeTitle: getBadgeTitle(badge, lang),
      badgeEmoji: badge.emoji
    });
    const outcome = await shareResult(shareText);
    if (outcome === 'unavailable') return;
    setShareState(outcome);
    setTimeout(() => setShareState('idle'), 2500);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900/95 p-5 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-5 relative overflow-hidden my-2 select-none">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP PERMANENT HERO BATTERY (Never disappears, sits proudly at the very top!) */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="text-center mb-2">
          <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 inline-flex items-center gap-1.5">
            <Plug className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{isCharging ? t('gameover_charging') : t('gameover_charged')}</span>
          </span>
        </div>

        {/* Permanent Vector Battery Shell - 100% Crisp on all iOS & Android screens */}
        <UnifiedBattery
          value={chargingProgress}
          size="lg"
          faceExpression={getBatteryFace(chargingProgress, !isCharging)}
          isPlugged={true}
        />

        {isCharging && (
          <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 animate-pulse mt-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            {t('gameover_calculating')}
          </p>
        )}
      </div>

      {/* FULL REVEAL CONTENT (Slides in below the top battery when charging completes) */}
      {!isCharging && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-5 pt-2 border-t border-slate-800/80"
        >
          {/* Header Title */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{t('gameover_title')}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{t('gameover_mode_label', { name: resolvedModeName })}</p>
          </div>

          {/* Title Badge Card (Crystal ball emoji box removed!) */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 rounded-2xl border border-emerald-500/30 text-center relative overflow-hidden shadow-inner">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
              {t('gameover_badge_label')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-300 drop-shadow-md flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{getBadgeTitle(badge, lang)}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 max-w-md mx-auto leading-relaxed">
              {getBadgeDescription(badge, lang)}
            </p>

            {/* Score Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-slate-800">
              <div>
                <span className="text-xs text-slate-500 block">{t('gameover_total_score')}</span>
                <span className="text-2xl sm:text-3xl font-black text-white">{grandTotal}</span>
                <span className="text-xs text-slate-500"> / {answers.length * 100}{totalComboBonus > 0 ? '+' : ''}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">{t('gameover_avg_accuracy')}</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">{avgScore}%</span>
              </div>
            </div>

            {/* Combo Bonus Callout — only shown when a streak actually paid out */}
            {totalComboBonus > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-center gap-1.5 text-orange-300 text-xs sm:text-sm font-bold">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>{t('gameover_combo_bonus', { n: totalComboBonus })}</span>
              </div>
            )}
          </div>

          {/* Breakdown List */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <ClipboardList className="w-3.5 h-3.5" /> {t('gameover_breakdown')}
            </h4>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {answers.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-bold text-slate-500">#{idx + 1}</span>
                    <span className="truncate text-slate-200">{getLocalizedQuestionText(item.question, lang).title}</span>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-slate-400 text-[11px]">
                      {t('gameover_guess_vs_answer', { guess: item.userGuess, answer: item.officialBattery })}
                    </span>
                    {comboBonusSeries[idx] > 0 && (
                      <span className="font-extrabold px-2 py-0.5 rounded-md text-xs bg-orange-500/20 text-orange-300 flex items-center gap-0.5">
                        <Flame className="w-3 h-3" />+{comboBonusSeries[idx]}
                      </span>
                    )}
                    <span className={`font-extrabold px-2 py-0.5 rounded-md text-xs ${item.score >= 90 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
                      +{item.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleShare}
              className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border border-slate-700"
            >
              {shareState !== 'idle' ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-300" />}
              <span>{shareState === 'copied' ? t('share_copied') : shareState === 'shared' ? t('share_shared') : t('share_idle')}</span>
            </button>

            <button
              onClick={onRestart}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-purple-950/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-violet-400/30"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('gameover_restart')}</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
