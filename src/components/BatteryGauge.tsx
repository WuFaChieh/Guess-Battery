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
  label,
  size = 'md',
  animated = true,
  colorOverride
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round(value)));

  // Determine battery level theme
  const getBatteryTheme = (val: number) => {
    if (colorOverride) return { color: colorOverride, glow: colorOverride, bg: 'bg-emerald-500' };
    if (val >= 80) {
      return {
        color: 'from-emerald-500 to-teal-400',
        glow: 'rgba(16, 185, 129, 0.4)',
        border: 'border-emerald-500/40',
        text: 'text-emerald-400',
        icon: '⚡'
      };
    } else if (val >= 40) {
      return {
        color: 'from-amber-500 to-yellow-400',
        glow: 'rgba(245, 158, 11, 0.4)',
        border: 'border-amber-500/40',
        text: 'text-amber-400',
        icon: '🔋'
      };
    } else if (val >= 1) {
      return {
        color: 'from-rose-600 to-red-500',
        glow: 'rgba(239, 68, 68, 0.4)',
        border: 'border-rose-500/40',
        text: 'text-rose-400',
        icon: '🪫'
      };
    } else {
      return {
        color: 'from-slate-700 to-slate-800',
        glow: 'rgba(51, 65, 85, 0.2)',
        border: 'border-slate-700',
        text: 'text-slate-500',
        icon: '💀'
      };
    }
  };

  const theme = getBatteryTheme(percentage);

  // Size styling
  const containerSizes = {
    sm: 'w-36 h-16 p-1.5',
    md: 'w-48 h-24 p-2',
    lg: 'w-64 h-32 p-3'
  };

  const capSizes = {
    sm: 'w-2.5 h-7 rounded-r-md',
    md: 'w-3.5 h-10 rounded-r-lg',
    lg: 'w-4 h-14 rounded-r-xl'
  };

  const textSizes = {
    sm: 'text-lg font-extrabold',
    md: 'text-2xl font-black',
    lg: 'text-4xl font-black'
  };

  return (
    <div className="flex flex-col items-center justify-center select-none my-2">
      {label && (
        <span className="text-xs font-semibold text-slate-400 mb-1 tracking-wider uppercase">
          {label}
        </span>
      )}

      <div className="flex items-center">
        {/* Main Battery Outer Shell */}
        <div
          className={`relative bg-slate-900/90 border-2 ${theme.border} rounded-2xl ${containerSizes[size]} flex items-center shadow-2xl overflow-hidden backdrop-blur-sm`}
          style={{ boxShadow: `0 0 20px ${theme.glow}` }}
        >
          {/* Background grid line effect */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px)] bg-[size:10px_100%]" />

          {/* Liquid Fill Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={animated ? { type: 'spring', stiffness: 120, damping: 15 } : { duration: 0.1 }}
            className={`h-full rounded-xl bg-gradient-to-r ${theme.color} relative overflow-hidden flex items-center justify-end px-2`}
          >
            {/* Shimmer/Gloss effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/20" />

            {/* Pulsing light overlay for high battery */}
            {percentage >= 80 && (
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-white/10"
              />
            )}
          </motion.div>

          {/* Number Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <span className={`${textSizes[size]} text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight flex items-center gap-1`}>
              <span>{theme.icon}</span>
              <span>{percentage}%</span>
            </span>
          </div>
        </div>

        {/* Battery Positive Terminal Tip */}
        <div
          className={`bg-slate-800 border-2 border-l-0 ${theme.border} ${capSizes[size]}`}
        />
      </div>
    </div>
  );
};
