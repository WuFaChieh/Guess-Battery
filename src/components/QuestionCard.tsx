import React from 'react';
import { Question } from '../types/game';
import { CATEGORY_LABELS } from '../data/questions';

interface QuestionCardProps {
  question: Question;
  currentIndex?: number;
  totalQuestions?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex = 0,
  totalQuestions = 5
}) => {
  const catInfo = CATEGORY_LABELS[question.category] || { label: '荒謬萬物', icon: '🥔' };

  // Highlight key terms in title with warm amber text
  const formatTitle = (title: string) => {
    const keywords = [
      'Wi-Fi', 'ChatGPT', '馬鈴薯', '牛肉麵', '微分方程', '定積分', 
      '極限', '歐拉公式', '黃金分割率', '矩陣', '台大', '期末考', 
      '上班族', '企鵝', '柴犬', '柯基犬', '橡皮鴨', '蟑螂', '金魚', 
      '西瓜', '爆米花', '烏龍茶', '被褥', '麵包', '綠芽', '熱水'
    ];

    let highlighted = title;
    keywords.forEach((word) => {
      if (title.includes(word)) {
        highlighted = title.replace(word, `<span class="text-amber-300 font-extrabold">${word}</span>`);
      }
    });

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3 my-2">
      {/* Top Progress Pill & Dots */}
      <div className="flex flex-col items-center gap-2">
        <span className="px-3.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-emerald-400">
          第 {currentIndex + 1} / {totalQuestions} 題
        </span>

        {/* 5 Dots Progress Indicator */}
        <div className="flex items-center gap-2">
          {[...Array(totalQuestions)].map((_, i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50 scale-110'
                  : i < currentIndex
                  ? 'bg-emerald-700/50'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Question Card Box */}
      <div className="w-full bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden text-center my-1 backdrop-blur-sm">
        {/* Background Decorative Accents */}
        <div className="absolute top-4 right-5 opacity-15 text-amber-300 text-base select-none">⭐</div>
        <div className="absolute top-10 left-5 opacity-15 text-purple-300 text-[10px] select-none">⚡</div>
        <div className="absolute bottom-6 right-6 opacity-15 text-slate-400 text-lg select-none">?</div>

        {/* Category Pill Badge (Grounded Purple Pill) */}
        <div className="flex justify-start mb-4">
          <span className="px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <span>{catInfo.icon}</span>
            <span>{catInfo.label}</span>
          </span>
        </div>

        {/* Center Illustration / Icon */}
        <div className="my-2 flex justify-center">
          <div className="text-5xl animate-bounce-short">
            {question.emoji || '🥔'}
          </div>
        </div>

        {/* Question Title */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-100 leading-snug tracking-tight my-3 px-2">
          {formatTitle(question.title)}
        </h2>

        {/* Subtitle with Doodle Arrow */}
        <p className="text-xs text-slate-400 mt-2 flex items-center justify-center gap-1 opacity-90">
          <span>憑直覺猜出 0～100% 的電量數字！</span>
          <span className="text-slate-500 font-mono text-sm">⤾</span>
        </p>
      </div>
    </div>
  );
};
