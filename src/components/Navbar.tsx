import React, { useEffect, useRef, useState } from 'react';
import { GameMode } from '../types/game';
import { Volume2, Volume1, VolumeX, Menu, Zap, Users, PlusCircle, Swords, X, Lock, Calendar, Flame } from 'lucide-react';
import { setVolume, playTickSound } from '../utils/audio';
import { getDailyStreak } from '../utils/dailyStreak';

interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  volume: number; // 0 to 1
  onVolumeChange: (volume: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  volume,
  onVolumeChange
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [volumePopoverOpen, setVolumePopoverOpen] = useState(false);
  const [dailyStreakDays, setDailyStreakDays] = useState(0);

  // Remembers the last non-zero volume so the mute button can restore it
  // instead of just snapping back to 100%.
  const lastNonZeroVolumeRef = useRef(volume > 0 ? volume : 0.7);
  useEffect(() => {
    if (volume > 0) lastNonZeroVolumeRef.current = volume;
  }, [volume]);

  const applyVolume = (next: number) => {
    setVolume(next);
    onVolumeChange(next);
  };

  const toggleMute = () => {
    applyVolume(volume > 0 ? 0 : lastNonZeroVolumeRef.current);
  };

  const VolumeIcon = volume <= 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  const navItems: { mode: GameMode; label: string; icon: React.ReactNode; isComingSoon?: boolean }[] = [
    { mode: 'single_5', label: '經典速刷', icon: <Zap className="w-4 h-4 text-emerald-400" /> },
    { mode: 'daily', label: '每日挑戰', icon: <Calendar className="w-4 h-4 text-purple-400" /> },
    { mode: 'party', label: '同屏派對', icon: <Users className="w-4 h-4 text-cyan-400" /> },
    { mode: 'custom', label: '自訂題庫', icon: <PlusCircle className="w-4 h-4 text-blue-400" /> },
    { mode: 'mutual_pk', label: '1v1 互考 PK', icon: <Swords className="w-4 h-4 text-rose-400" /> }
  ];

  return (
    <header
      className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-900 px-4 pb-3 shadow-md"
      style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}
    >
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
          {/* Volume Button — opens a popover with a real slider instead of
              only toggling mute/on, so players can actually dial the level. */}
          <div className="relative">
            <button
              onClick={() => {
                setVolumePopoverOpen((open) => !open);
                setMenuOpen(false);
              }}
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-all shadow-sm active:scale-95"
              title="音量設定"
              aria-label="音量設定"
              aria-expanded={volumePopoverOpen}
            >
              <VolumeIcon className={`w-5 h-5 ${volume > 0 ? 'text-emerald-400' : 'text-slate-500'}`} />
            </button>

            {volumePopoverOpen && (
              <div
                className="absolute right-0 top-12 w-48 p-3.5 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-200 z-50"
              >
                <button
                  onClick={toggleMute}
                  className="shrink-0 text-slate-300 hover:text-emerald-400 transition-colors"
                  title={volume > 0 ? '靜音' : '取消靜音'}
                  aria-label={volume > 0 ? '靜音' : '取消靜音'}
                >
                  <VolumeIcon className={`w-4 h-4 ${volume > 0 ? 'text-emerald-400' : 'text-slate-500'}`} />
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={Math.round(volume * 100)}
                  onChange={(e) => applyVolume(Number(e.target.value) / 100)}
                  onMouseUp={playTickSound}
                  onTouchEnd={playTickSound}
                  aria-label="音量"
                  aria-valuetext={`${Math.round(volume * 100)}%`}
                  className="flex-1 h-2 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
                <span className="shrink-0 w-8 text-right text-[11px] font-bold text-slate-400 tabular-nums">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => {
              setMenuOpen((open) => {
                const next = !open;
                // Refresh right when the drawer opens, so a streak earned by
                // finishing today's Daily Challenge shows up immediately
                // instead of waiting for some unrelated re-render.
                if (next) setDailyStreakDays(getDailyStreak().currentStreak);
                return next;
              });
              setVolumePopoverOpen(false);
            }}
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-all shadow-sm active:scale-95"
            title="選單"
            aria-label="選單"
            aria-expanded={menuOpen}
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
                {item.mode === 'daily' && dailyStreakDays > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30 inline-flex items-center gap-0.5">
                    <Flame className="w-2.5 h-2.5" /> {dailyStreakDays} 天
                  </span>
                )}
                {item.isComingSoon && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 inline-flex items-center gap-0.5">
                    <Lock className="w-2.5 h-2.5" /> 待更新
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
