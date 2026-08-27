import React from 'react';
import { playTickSound } from '../utils/audio';
import { Lock, Sparkles } from 'lucide-react';

interface SliderInputProps {
  value: number;
  onChange: (val: number) => void;
  onSubmit: () => void;
  disabled?: boolean;
  submitLabel?: string;
}

export const SliderInput: React.FC<SliderInputProps> = ({
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

  const presets = [
    { label: '0%', val: 0, icon: '💀' },
    { label: '25%', val: 25, icon: '🪫' },
    { label: '50%', val: 50, icon: '🔋' },
    { label: '75%', val: 75, icon: '⚡' },
    { label: '100%', val: 100, icon: '💥' }
  ];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-5 my-2">
      {/* Rainbow Range Spectrum Slider */}
      <div className="w-full px-2">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 mb-1.5 px-1">
          <span>0</span>
          <span>100</span>
        </div>

        {/* Rainbow Spectrum Track Slider Container */}
        <div className="relative w-full flex flex-col items-center">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={handleSliderChange}
            disabled={disabled}
            className="w-full h-3 bg-gradient-to-r from-rose-500 via-amber-400 via-lime-400 to-teal-400 rounded-full appearance-none cursor-pointer accent-white shadow-lg touch-action-none z-10"
          />

          {/* Ticks under track */}
          <div className="w-full flex justify-between px-1 mt-1 opacity-25">
            {[...Array(11)].map((_, i) => (
              <span key={i} className="w-0.5 h-1.5 bg-white rounded-full" />
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
                  ? 'bg-emerald-950/60 border-2 border-emerald-400 text-lime-400 font-extrabold shadow-lg shadow-emerald-500/20 scale-105'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className={`text-xs ${isSelected ? 'text-lime-300 font-extrabold' : 'text-slate-200'}`}>
                {p.label}
              </span>
              <span className="text-sm mt-1">{p.icon}</span>
            </button>
          );
        })}
      </div>

      {/* Main Lock Pill Button & Doodle */}
      <div className="w-full flex flex-col items-center gap-2 mt-1">
        <button
          onClick={onSubmit}
          disabled={disabled}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-lime-300 via-emerald-400 to-teal-400 text-slate-950 font-black text-lg sm:text-xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
        >
          <Lock className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          <span>{submitLabel}</span>
          <Sparkles className="w-5 h-5 text-slate-950" />
        </button>

        {/* Doodle caption */}
        <p className="text-xs text-slate-400 font-medium flex items-center gap-1 opacity-85">
          <span>⤤</span>
          <span>準備好了就鎖定吧！</span>
        </p>
      </div>
    </div>
  );
};
