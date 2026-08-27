import React, { useState } from 'react';
import { GameMode } from '../types/game';
import { Volume2, VolumeX, Menu, Zap, Users, PlusCircle, Swords, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-900 px-4 py-3 shadow-md">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left: Battery Logo + Title */}
        <div 
          onClick={() => onSelectMode('single_5')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-2xl shadow-md shadow-emerald-950/50 group-hover:scale-105 transition-transform">
            🔋
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-slate-100 leading-none">
              猜電量
            </h1>
            <p className="text-xs text-emerald-400/80 font-bold mt-0.5 tracking-wide">
              Guess the Battery
            </p>
          </div>
        </div>

        {/* Right: Circular Volume & Menu Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Volume Button */}
          <button
            onClick={toggleAudio}
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-all shadow-sm active:scale-95"
            title={soundOn ? '關閉音效' : '開啟音效'}
          >
            {soundOn ? (
              <Volume2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-500" />
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-all shadow-sm active:scale-95"
            title="選單"
          >
            {menuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
          </button>
        </div>
      </div>

      {/* Slide-Down Menu Drawer for Mode Selection */}
      {menuOpen && (
        <div className="max-w-md mx-auto mt-3 p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl flex flex-col gap-1.5 animate-in slide-in-from-top duration-200">
          <span className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
            選擇遊戲模式
          </span>
          {navItems.map((item) => {
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => {
                  onSelectMode(item.mode);
                  setMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.isComingSoon && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                    🔒 待更新
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
