import React from 'react';
import { GameMode } from '../types/game';
import { Zap, Trophy, Bookmark, Smile } from 'lucide-react';

interface BottomNavProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentMode, onSelectMode }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-900 px-4 pt-2 shadow-xl"
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1 items-center text-center">
        {/* Tab 1: 猜電量 */}
        <button
          onClick={() => onSelectMode('single_5')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentMode === 'single_5'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Zap className={`w-5 h-5 mb-0.5 ${currentMode === 'single_5' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span className="text-[11px]">猜電量</span>
        </button>

        {/* Tab 2: 1v1 對決 / 排行榜 */}
        <button
          onClick={() => onSelectMode('mutual_pk')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentMode === 'mutual_pk'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Trophy className={`w-5 h-5 mb-0.5 ${currentMode === 'mutual_pk' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span className="text-[11px]">1v1對決</span>
        </button>

        {/* Tab 3: 同屏派對 */}
        <button
          onClick={() => onSelectMode('party')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentMode === 'party'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Bookmark className={`w-5 h-5 mb-0.5 ${currentMode === 'party' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span className="text-[11px]">同屏派對</span>
        </button>

        {/* Tab 4: 自訂題庫 / 更多 */}
        <button
          onClick={() => onSelectMode('custom')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentMode === 'custom'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Smile className={`w-5 h-5 mb-0.5 ${currentMode === 'custom' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span className="text-[11px]">自訂題庫</span>
        </button>
      </div>
    </nav>
  );
};
