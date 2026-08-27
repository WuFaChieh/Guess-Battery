import React from 'react';
import { GameMode } from '../types/game';
import { Volume2, VolumeX, Zap, Users, PlusCircle, Swords } from 'lucide-react';
import { setSoundEnabled } from '../utils/audio';

interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  soundOn: boolean;
  setSoundOn: (on: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  soundOn,
  setSoundOn
}) => {
  const toggleAudio = () => {
    const nextState = !soundOn;
    setSoundEnabled(nextState);
    setSoundOn(nextState);
  };

  const navItems: { mode: GameMode; label: string; icon: React.ReactNode; isComingSoon?: boolean }[] = [
    { mode: 'single_5', label: '經典速刷', icon: <Zap className="w-4 h-4 text-emerald-400" /> },
    { mode: 'party', label: '同屏派對', icon: <Users className="w-4 h-4 text-cyan-400" /> },
    { mode: 'custom', label: '自訂題庫', icon: <PlusCircle className="w-4 h-4 text-blue-400" /> },
    { mode: 'mutual_pk', label: '1v1 互相出題', icon: <Swords className="w-4 h-4 text-rose-400" />, isComingSoon: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3.5 py-2.5 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Top Brand Logo & Audio Row */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3">
          <div 
            onClick={() => onSelectMode('single_5')}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              🔋
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5 leading-none">
                猜電量 <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">MVP</span>
              </h1>
              <p className="text-[11px] text-slate-400 mt-0.5">萬物皆有電量，你猜得準嗎？</p>
            </div>
          </div>

          {/* Audio Toggle (Right-aligned on mobile, integrated into header row) */}
          <button
            onClick={toggleAudio}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors flex items-center gap-1.5 text-xs font-medium shrink-0"
            title={soundOn ? '關閉音效' : '開啟音效'}
          >
            {soundOn ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline text-xs">音效</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline text-xs">靜音</span>
              </>
            )}
          </button>
        </div>

        {/* Navigation Tabs (Smooth horizontal touch scroll on mobile) */}
        <div className="w-full sm:w-auto flex items-center gap-1 bg-slate-950/90 p-1 rounded-2xl border border-slate-800/80 overflow-x-auto no-scrollbar max-w-full">
          {navItems.map((item) => {
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => onSelectMode(item.mode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.isComingSoon && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 ml-0.5">
                    🔒 待更新
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
