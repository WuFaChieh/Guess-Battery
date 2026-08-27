import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnswerRecord } from '../types/game';
import { getBadgeForScore } from '../utils/gameLogic';
import { playChargingSound, playScoreSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { RotateCcw, Share2, Check, Sparkles, Zap, Plug } from 'lucide-react';

interface GameOverModalProps {
  answers: AnswerRecord[];
  onRestart: () => void;
  gameModeName?: string;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  answers,
  onRestart,
  gameModeName = '經典速刷'
}) => {
  const [copied, setCopied] = useState(false);
  const [chargingProgress, setChargingProgress] = useState(0);
  const [isCharging, setIsCharging] = useState(true);

  const totalScore = answers.reduce((acc, a) => acc + a.score, 0);
  const avgScore = answers.length > 0 ? Math.round(totalScore / answers.length) : 0;
  const badge = getBadgeForScore(avgScore);

  // Dynamic facial expression for battery mascot
  const getBatteryFace = (val: number, done: boolean) => {
    if (!done) return '( 🔌⚡ 充能精準度... )';
    if (val >= 90) return '( ⚡💯⚡ 神級精準大師！ )';
    if (val >= 70) return '( ≧ᗜ≦ 高電量充滿！ )';
    if (val >= 40) return '( ｡• ᵕ •｡ 滿意充電完成 )';
    return '( 🪫 需再接再厲！ )';
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

  const handleShare = () => {
    const shareText = `🔋【猜電量 Guess the Battery】\n我在《${gameModeName}》中獲得了 ${totalScore} 分（平均精準度 ${avgScore}%）！\n獲得榮譽稱號：${badge.title} ${badge.emoji}\n\n「萬物皆有電量，你猜得準嗎？」快來挑戰你的直覺！`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
            <span>{isCharging ? '成果充電進行中...' : '成果充電完成！'}</span>
          </span>
        </div>

        {/* Permanent Battery Shell */}
        <div className="flex items-center justify-center w-full max-w-xs my-1">
          <div className="relative bg-slate-950 border-2 border-emerald-500/60 rounded-[24px] w-full h-22 sm:h-24 p-2 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:10px_100%] pointer-events-none" />

            {/* Charging Fill Bar */}
            <motion.div
              className="h-full rounded-[16px] bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 relative overflow-hidden flex items-center justify-center shadow-inner"
              style={{ width: `${chargingProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/20" />
            </motion.div>

            {/* Counter Overlay & Mascot Expression */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
              <span className="text-[11px] sm:text-xs font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {getBatteryFace(chargingProgress, !isCharging)}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight">
                {chargingProgress}%
              </span>
            </div>
          </div>
          <div className="bg-slate-800 border-2 border-l-0 border-emerald-500/60 w-3 h-10 rounded-r-xl" />
        </div>

        {isCharging && (
          <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 animate-pulse mt-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            正在累積計算您的直覺精準度電量...
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
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">遊戲成果大結算</h2>
            <p className="text-xs text-slate-400 mt-0.5">模式：{gameModeName}</p>
          </div>

          {/* Title Badge Card (Crystal ball emoji box removed!) */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 rounded-2xl border border-emerald-500/30 text-center relative overflow-hidden shadow-inner">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
              獲得榮譽稱號
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-300 drop-shadow-md flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{badge.title}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 max-w-md mx-auto leading-relaxed">
              {badge.description}
            </p>

            {/* Score Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-slate-800">
              <div>
                <span className="text-xs text-slate-500 block">總得分</span>
                <span className="text-2xl sm:text-3xl font-black text-white">{totalScore}</span>
                <span className="text-xs text-slate-500"> / {answers.length * 100}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">平均精準度</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">{avgScore}%</span>
              </div>
            </div>
          </div>

          {/* Breakdown List */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              📋 每題數據紀錄
            </h4>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {answers.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-bold text-slate-500">#{idx + 1}</span>
                    <span className="truncate text-slate-200">{item.question.title}</span>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-slate-400 text-[11px]">
                      猜 <strong className="text-white">{item.userGuess}%</strong> / 答 <strong className="text-amber-400">{item.officialBattery}%</strong>
                    </span>
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
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-300" />}
              <span>{copied ? '成績已複製到剪貼簿！' : '分享成績戰報'}</span>
            </button>

            <button
              onClick={onRestart}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-950/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>再玩一局！</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
