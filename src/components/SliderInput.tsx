import React from 'react';
import { playTickSound } from '../utils/audio';
import { Lock, Sparkles, Skull, BatteryWarning, BatteryMedium, Zap, Bomb, ArrowUp } from 'lucide-react';

interface SliderInputProps {
  value: number;
  onChange: (val: number) => void;
  onSubmit: () => void;
  disabled?: boolean;
  submitLabel?: string;
}

// Memoized: re-renders on every slider tick in parents that also drive
// timer-based animations, so it's worth skipping when its own props are
// unchanged. Effective only when parents pass stable onChange/onSubmit
// callbacks (see the useCallback wiring in MutualPkGame/PartyModeGame/
// SinglePlayerGame).
// Same charge-level color breakpoints as UnifiedBattery's getColors(), so the
// slider's filled portion always agrees with the battery gauge sitting right
// above it, instead of a static rainbow that doesn't track the actual value.
function getFillColor(val: number): string {
  if (val >= 80) return '#10b981'; // emerald
  if (val >= 50) return '#f59e0b'; // amber
  if (val >= 20) return '#f97316'; // orange
  return '#f43f5e'; // rose
}

const TRACK_BG = '#1e293b'; // slate-800, matches the app's card surfaces

const SliderInputComponent: React.FC<SliderInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  submitLabel = '鎖定答案並揭曉！'
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value, 10);
    if (newVal !== value) {
      playTickSound();
      onChange(newVal);
    }
  };

  const fillColor = getFillColor(value);
  const trackStyle: React.CSSProperties = {
    background: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${value}%, ${TRACK_BG} ${value}%, ${TRACK_BG} 100%)`
  };

  const presets = [
    { label: '0%', val: 0, Icon: Skull, iconColor: 'text-slate-500' },
    { label: '25%', val: 25, Icon: BatteryWarning, iconColor: 'text-rose-500' },
    { label: '50%', val: 50, Icon: BatteryMedium, iconColor: 'text-amber-500' },
    { label: '75%', val: 75, Icon: Zap, iconColor: 'text-emerald-500' },
    { label: '100%', val: 100, Icon: Bomb, iconColor: 'text-teal-400' }
  ];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-5 my-2">
      {/* Spectrum Range Slider */}
      <div className="w-full px-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1.5 px-1">
          <span>0</span>
          <span>100</span>
        </div>

        {/* Muted Spectrum Track Slider Container */}
        <div className="relative w-full flex flex-col items-center">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={handleSliderChange}
            disabled={disabled}
            style={trackStyle}
            className="w-full h-3 rounded-full appearance-none cursor-pointer accent-emerald-400 shadow-md touch-action-none z-10 transition-[background] duration-150"
          />

          {/* Ticks under track */}
          <div className="w-full flex justify-between px-1 mt-1 opacity-20">
            {[...Array(11)].map((_, i) => (
              <span key={i} className="w-0.5 h-1.5 bg-slate-300 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Preset Cards (0%, 25%, 50%, 75%, 100%) */}
      <div className="grid grid-cols-5 gap-2 w-full">
        {presets.map((p) => {
          const isSelected = value === p.val;
          return (
            <button
              key={p.val}
              onClick={() => {
                playTickSound();
                onChange(p.val);
              }}
              disabled={disabled}
              className={`py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-emerald-950/50 border-2 border-emerald-500/60 text-emerald-300 font-bold shadow-md shadow-emerald-950/40 scale-105'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className={`text-xs tabular-nums ${isSelected ? 'text-emerald-300 font-bold' : 'text-slate-300'}`}>
                {p.label}
              </span>
              <p.Icon className={`w-4 h-4 mt-1 ${isSelected ? 'text-emerald-300' : p.iconColor}`} />
            </button>
          );
        })}
      </div>

      {/* Main Lock Pill Button (Royal Indigo/Violet Gradient for distinct contrast) */}
      <div className="w-full flex flex-col items-center gap-2 mt-1">
        <button
          onClick={onSubmit}
          disabled={disabled}
          className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-indigo-950/70 border border-indigo-500/30 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Lock className="w-5 h-5 text-white stroke-[2.5]" />
          <span>{submitLabel}</span>
          <Sparkles className="w-4 h-4 text-purple-200" />
        </button>

        {/* Caption pointing back up at the lock button */}
        <p className="text-xs text-slate-400 font-medium flex items-center gap-1 opacity-80">
          <ArrowUp className="w-3.5 h-3.5" />
          <span>準備好了就鎖定吧！</span>
        </p>
      </div>
    </div>
  );
};

export const SliderInput = React.memo(SliderInputComponent);
SliderInput.displayName = 'SliderInput';
