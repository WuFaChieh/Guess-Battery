import React, { useEffect, useState } from 'react';
import { AnswerRecord } from '../types/game';
import { getBadgeForScore } from '../utils/gameLogic';
import confetti from 'canvas-confetti';
import { RotateCcw, Share2, Check, Sparkles } from 'lucide-react';

interface GameOverModalProps {
  answers: AnswerRecord[];
  onRestart: () => void;
  gameModeName?: string;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  answers,
  onRestart,
  gameModeName = '單人速刷'
}) => {
  const [copied, setCopied] = useState(false);

  const totalScore = answers.reduce((acc, a) => acc + a.score, 0);
  const avgScore = answers.length > 0 ? Math.round(totalScore / answers.length) : 0;
  const badge = getBadgeForScore(avgScore);

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
  }, []);

  const handleShare = () => {
    const shareText = `🔋【猜電量 Guess the Battery】\n我在《${gameModeName}》中獲得了 ${totalScore} 分（平均 ${avgScore} 分）！\n獲得榮譽稱號：${badge.title} ${badge.emoji}\n\n「萬物皆有電量，你猜得準嗎？」快來挑戰你的荒謬直覺！`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/95 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* Header Banner */}
      <div className="text-center relative">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-4xl mb-2">
          {badge.emoji}
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">遊戲大結算</h2>
        <p className="text-xs text-slate-400 mt-1">模式：{gameModeName}</p>
      </div>

      {/* Title Badge Card */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-emerald-500/30 text-center relative overflow-hidden shadow-inner">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block mb-1">
          獲得榮譽稱號
        </span>
        <h3 className="text-2xl md:text-3xl font-black text-emerald-300 drop-shadow-md flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <span>{badge.title}</span>
        </h3>
        <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
          {badge.description}
        </p>

        {/* Score Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-800">
          <div>
            <span className="text-xs text-slate-500 block">總得分</span>
            <span className="text-3xl font-black text-white">{totalScore}</span>
            <span className="text-xs text-slate-500"> / {answers.length * 100}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">平均精準度</span>
            <span className="text-3xl font-black text-emerald-400">{avgScore}%</span>
          </div>
        </div>
      </div>

      {/* Breakdown List */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          📋 每題數據紀錄
        </h4>
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
          {answers.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="font-bold text-slate-500">#{idx + 1}</span>
                <span className="truncate text-slate-200">{item.question.title}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-slate-400">
                  猜 <strong className="text-white">{item.userGuess}%</strong> / 答 <strong className="text-amber-400">{item.officialBattery}%</strong>
                </span>
                <span className={`font-black px-2 py-0.5 rounded-lg ${item.score >= 90 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
                  +{item.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          onClick={handleShare}
          className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 border border-slate-700"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-300" />}
          <span>{copied ? '成績已複製到剪貼簿！' : '分享成績戰報'}</span>
        </button>

        <button
          onClick={onRestart}
          className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>再玩一局！</span>
        </button>
      </div>
    </div>
  );
};
