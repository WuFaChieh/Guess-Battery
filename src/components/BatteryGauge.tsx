import React from 'react';
import { motion } from 'framer-motion';

interface BatteryGaugeProps {
  value: number; // 0 to 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  colorOverride?: string;
}

export const BatteryGauge: React.FC<BatteryGaugeProps> = ({
  value,
  label = '你猜的電量',
  size = 'lg',
  animated = true
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round(value)));

  // Grounded, muted gradients (reduced neon intensity for natural, human aesthetic)
  const getGradient = (val: number) => {
    if (val >= 80) return 'from-emerald-600 via-teal-600 to-emerald-500';
    if (val >= 50) return 'from-amber-600 via-yellow-600 to-amber-500';
    if (val >= 20) return 'from-orange-600 via-amber-600 to-yellow-600';
    return 'from-rose-700 via-red-700 to-rose-600';
  };

  const getGlow = (val: number) => {
    if (val >= 80) return 'rgba(16, 185, 129, 0.15)';
    if (val >= 50) return 'rgba(217, 119, 6, 0.15)';
    return 'rgba(225, 29, 72, 0.15)';
  };

  const getBorderColor = (val: number) => {
    if (val >= 80) return 'border-emerald-600/50';
    if (val >= 50) return 'border-amber-600/50';
    return 'border-rose-600/50';
  };

  const sizes = {
    sm: { container: 'w-36 h-16 p-1.5', text: 'text-xl font-extrabold', cap: 'w-2.5 h-7 rounded-r-md' },
    md: { container: 'w-44 sm:w-52 h-20 sm:h-24 p-2', text: 'text-2xl sm:text-3xl font-black', cap: 'w-3 h-9 sm:h-10 rounded-r-lg' },
    lg: { container: 'w-full max-w-[340px] h-24 sm:h-28 p-2.5', text: 'text-4xl sm:text-5xl font-black', cap: 'w-3.5 h-11 sm:h-12 rounded-r-xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center select-none w-full my-2">
      {label && (
        <span className="text-xs font-semibold text-slate-400 mb-1.5 tracking-wider flex items-center gap-1">
          <span className="opacity-60">⚡</span>
          <span>{label}</span>
          <span className="opacity-60">⚡</span>
        </span>
      )}

      <div className="flex items-center justify-center w-full">
        {/* Main Battery Outer Shell */}
        <div
          className={`relative bg-slate-900/90 border-2 ${getBorderColor(percentage)} rounded-[26px] ${currentSize.container} flex items-center shadow-xl overflow-hidden backdrop-blur-sm transition-colors`}
          style={{ boxShadow: `0 4px 20px ${getGlow(percentage)}` }}
        >
          {/* Subtle interior vertical texture lines */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:12px_100%] pointer-events-none" />

          {/* Liquid Fill Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={animated ? { type: 'spring', stiffness: 120, damping: 15 } : { duration: 0.1 }}
            className={`h-full rounded-[18px] bg-gradient-to-r ${getGradient(percentage)} relative overflow-hidden flex items-center justify-end shadow-inner`}
          >
            {/* Soft Top Highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20" />
          </motion.div>

          {/* Percentage Text Overlay (Clean, Bold Text) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <span className={`${currentSize.text} text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] tracking-tight`}>
              {percentage}%
            </span>
          </div>
        </div>

        {/* Battery Terminal Tip */}
        <div
          className={`bg-slate-800/90 border-2 border-l-0 ${getBorderColor(percentage)} ${currentSize.cap}`}
        />
      </div>
    </div>
  );
};
