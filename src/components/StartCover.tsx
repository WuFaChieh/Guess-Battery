import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { UnifiedBattery } from './UnifiedBattery';

interface StartCoverProps {
  onStartGame: () => void;
}

export const StartCover: React.FC<StartCoverProps> = ({ onStartGame }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-6 select-none overflow-hidden">
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Author Credit Tag */}
      <div className="pt-6 z-10">
        <span className="px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-400 flex items-center gap-2 shadow-md backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>遊戲作者：<strong className="text-emerald-400">冷月仙</strong></span>
        </span>
      </div>

      {/* Center Cool Hero Section */}
      <div className="flex flex-col items-center text-center my-auto z-10 max-w-xs w-full gap-6">
        {/* Animated Vector Hero Battery */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full filter drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]"
        >
          <UnifiedBattery
            value={100}
            size="lg"
            faceExpression="( ⚡💯⚡ 電量滿載！ )"
          />
        </motion.div>

        {/* Minimal Cool Title */}
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
            猜電量 <span className="text-emerald-400">⚡</span>
          </h1>
          <p className="text-xs font-bold text-emerald-400/90 tracking-widest uppercase">
            Guess the Battery
          </p>
          <p className="text-xs text-slate-400 font-medium mt-2">
            萬物皆有電量，你猜得準嗎？
          </p>
        </div>

        {/* Minimalist Cool START Button */}
        <motion.button
          onClick={onStartGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 0px rgba(16,185,129,0)',
              '0 0 25px rgba(16,185,129,0.45)',
              '0 0 0px rgba(16,185,129,0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-base sm:text-lg shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 mt-2 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>⚡ 開始遊戲 START</span>
        </motion.button>
      </div>

      {/* Footer copyright */}
      <div className="pb-4 text-center text-[11px] text-slate-600 font-semibold z-10">
        © 2026 猜電量 Guess the Battery · 作者：冷月仙
      </div>
    </div>
  );
};
