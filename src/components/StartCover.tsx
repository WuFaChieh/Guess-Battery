import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Zap, Brain, PlusCircle } from 'lucide-react';
import { UnifiedBattery } from './UnifiedBattery';

interface StartCoverProps {
  onStartGame: () => void;
}

export const StartCover: React.FC<StartCoverProps> = ({ onStartGame }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-6 overflow-y-auto select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Author Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4 z-10"
      >
        <span className="px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-400 flex items-center gap-2 shadow-lg backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>遊戲作者：<strong className="text-emerald-400">冷月仙</strong></span>
        </span>
      </motion.div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center my-auto py-6 z-10 max-w-sm w-full gap-5">
        {/* Animated Vector Hero Battery */}
        <motion.div
          animate={{ scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full max-w-xs filter drop-shadow-[0_10px_25px_rgba(16,185,129,0.3)]"
        >
          <UnifiedBattery
            value={88}
            size="lg"
            faceExpression="( ⚡ 準備充能對決！ )"
          />
        </motion.div>

        {/* Title */}
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-lg flex items-center justify-center gap-2">
            <span>猜電量</span>
            <span className="text-emerald-400">⚡</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold text-emerald-400/90 tracking-widest uppercase">
            Guess the Battery
          </p>
          <p className="text-xs text-slate-400 font-medium mt-2 max-w-xs leading-relaxed">
            萬物皆有電量，你猜得準嗎？<br />
            無卡牌 · 無機制 · 只有荒謬直覺與爆笑揭曉！
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-3 gap-2 w-full mt-1 text-[11px] font-bold">
          <div className="p-2.5 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-1 text-slate-300">
            <Brain className="w-4 h-4 text-emerald-400" />
            <span>80+ 荒謬題</span>
          </div>
          <div className="p-2.5 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-1 text-slate-300">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>硬核數學</span>
          </div>
          <div className="p-2.5 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-1 text-slate-300">
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <span>自訂題庫</span>
          </div>
        </div>

        {/* Start Game Action Button */}
        <motion.button
          onClick={onStartGame}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          animate={{ boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 25px rgba(16,185,129,0.4)', '0 0 0px rgba(16,185,129,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-base sm:text-lg shadow-xl hover:brightness-110 active:scale-95 transition-all flex flex-col items-center justify-center gap-0.5 mt-3 group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 fill-slate-950 group-hover:translate-x-0.5 transition-transform" />
            <span>點擊開始遊戲 PRESS START</span>
          </div>
          <span className="text-[10px] opacity-80 font-bold tracking-wider">
            🎵 點擊即刻載入音樂與遊戲 ⚡
          </span>
        </motion.button>
      </div>

      {/* Footer copyright */}
      <div className="pb-3 text-center text-[11px] text-slate-600 font-semibold z-10">
        © 2026 猜電量 Guess the Battery · 作者：冷月仙
      </div>
    </div>
  );
};
