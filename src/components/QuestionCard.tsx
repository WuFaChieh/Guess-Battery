import React from 'react';
import { Question } from '../types/game';
import { CATEGORY_LABELS } from '../data/questions';
import { HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentIndex?: number;
  totalQuestions?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions
}) => {
  const catInfo = CATEGORY_LABELS[question.category] || { label: '荒謬問題', icon: '⚡' };

  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden text-center my-4">
      {/* Background Decorative Aura */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Top Header Tag */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
          <span>{catInfo.icon}</span>
          <span>{catInfo.label}</span>
        </span>

        {typeof currentIndex === 'number' && typeof totalQuestions === 'number' && (
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-300">
            第 {currentIndex + 1} / {totalQuestions} 題
          </span>
        )}
      </div>

      {/* Question Emoji & Text */}
      <div className="my-3">
        <div className="text-5xl mb-3 animate-bounce-short inline-block">
          {question.emoji || '🔋'}
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white leading-relaxed tracking-tight drop-shadow-md">
          {question.title}
        </h2>
      </div>

      <p className="text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
        <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
        凭直覺猜出出題者心中的 0～100% 電量！
      </p>
    </div>
  );
};
