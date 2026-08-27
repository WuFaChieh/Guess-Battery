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

  // Dynamic gradient based on percentage
  const getGradient = (val: number) => {
    if (val >= 80) return 'from-lime-400 via-emerald-400 to-teal-400';
    if (val >= 50) return 'from-yellow-400 via-amber-400 to-emerald-400';
    if (val >= 20) return 'from-orange-500 via-amber-500 to-yellow-400';
    return 'from-rose-600 via-red-500 to-orange-500';
  };

  const getGlow = (val: number) => {
    if (val >= 80) return 'rgba(163, 230, 53, 0.4)';
    if (val >= 50) return 'rgba(245, 158, 11, 0.4)';
    return 'rgba(239, 68, 68, 0.4)';
  };

  const getBorderColor = (val: number) => {
    if (val >= 80) return 'border-lime-400/70';
    if (val >= 50) return 'border-amber-400/70';
    return 'border-rose-500/70';
  };

  const sizes = {
    sm: { container: 'w-36 h-16 p-1.5', text: 'text-xl font-black', cap: 'w-2.5 h-7 rounded-r-md' },
    md: { container: 'w-44 sm:w-52 h-20 sm:h-24 p-2', text: 'text-2xl sm:text-3xl font-black', cap: 'w-3 h-9 sm:h-10 rounded-r-lg' },
    lg: { container: 'w-full max-w-[340px] h-24 sm:h-28 p-2.5', text: 'text-4xl sm:text-5xl font-black', cap: 'w-3.5 h-11 sm:h-12 rounded-r-xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center select-none w-full my-2">
      {label && (
        <span className="text-xs font-bold text-slate-400 mb-1.5 tracking-wider flex items-center gap-1">
          <span>⚡</span>
          <span>{label}</span>
          <span>⚡</span>
        </span>
      )}

      <div className="flex items-center justify-center w-full">
        {/* Main Battery Outer Shell */}
        <div
          className={`relative bg-slate-950/90 border-2 ${getBorderColor(percentage)} rounded-[28px] ${currentSize.container} flex items-center shadow-2xl overflow-hidden backdrop-blur-md transition-colors`}
          style={{ boxShadow: `0 0 25px ${getGlow(percentage)}` }}
        >
          {/* Subtle interior vertical texture lines */}
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:12px_100%] pointer-events-none" />

          {/* Liquid Fill Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={animated ? { type: 'spring', stiffness: 120, damping: 15 } : { duration: 0.1 }}
            className={`h-full rounded-[20px] bg-gradient-to-r ${getGradient(percentage)} relative overflow-hidden flex items-center justify-end shadow-inner`}
          >
            {/* Glossy Top Highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20" />
          </motion.div>

          {/* Percentage Text Overlay (Centered, Bold Black Text like Mockup) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <span className={`${currentSize.text} text-slate-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)] tracking-tight`}>
              {percentage}%
            </span>
          </div>
        </div>

        {/* Battery Terminal Tip */}
        <div
          className={`bg-slate-800 border-2 border-l-0 ${getBorderColor(percentage)} ${currentSize.cap}`}
        />
      </div>
    </div>
  );
};
