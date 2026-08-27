import React from 'react';
import { playTickSound } from '../utils/audio';
import { Minus, Plus, Lock } from 'lucide-react';

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
  submitLabel = '🔒 鎖定答案並揭曉'
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value, 10);
    if (newVal !== value) {
      playTickSound();
      onChange(newVal);
    }
  };

  const adjustValue = (delta: number) => {
    const newVal = Math.min(100, Math.max(0, value + delta));
    if (newVal !== value) {
      playTickSound();
      onChange(newVal);
    }
  };

  const presets = [
    { label: '0%', val: 0, text: '沒電 💀' },
    { label: '25%', val: 25, text: '低電 🪫' },
    { label: '50%', val: 50, text: '半滿 🔋' },
    { label: '75%', val: 75, text: '充沛 ⚡' },
    { label: '100%', val: 100, text: '滿格 💥' }
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/80 p-3.5 sm:p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col gap-4 sm:gap-5">
      {/* Slider Control with Steppers */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          onClick={() => adjustValue(-5)}
          disabled={disabled || value <= 0}
          className="px-2 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 font-bold transition-all text-xs flex items-center shrink-0"
          title="減少 5%"
        >
          -5%
        </button>
        <button
          onClick={() => adjustValue(-1)}
          disabled={disabled || value <= 0}
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-all shrink-0"
          title="減少 1%"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Range Input */}
        <div className="flex-1 px-1 sm:px-2 relative flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={handleSliderChange}
            disabled={disabled}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 touch-action-none"
          />
        </div>

        <button
          onClick={() => adjustValue(1)}
          disabled={disabled || value >= 100}
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-all shrink-0"
          title="增加 1%"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => adjustValue(5)}
          disabled={disabled || value >= 100}
          className="px-2 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 font-bold transition-all text-xs flex items-center shrink-0"
          title="增加 5%"
        >
          +5%
        </button>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
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
              className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
              }`}
            >
              <span>{p.label}</span>
              <span className="text-[10px] opacity-75 font-normal">{p.text.split(' ')[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Lock Answer Button */}
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-base sm:text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
      >
        <Lock className="w-5 h-5 text-slate-950" />
        <span>{submitLabel}</span>
      </button>
    </div>
  );
};
