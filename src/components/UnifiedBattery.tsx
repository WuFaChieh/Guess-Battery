import React, { useId } from 'react';
import { Zap, Plug } from 'lucide-react';

interface UnifiedBatteryProps {
  value: number; // 0 to 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  faceExpression?: string;
  isPlugged?: boolean;
}

// Memoized: this renders inside high-frequency timer ticks (the PK charging
// ceremony re-renders its parent every ~35ms) and is pure w.r.t. its props,
// so React.memo skips re-rendering batteries whose props haven't changed.
const UnifiedBatteryComponent: React.FC<UnifiedBatteryProps> = ({
  value,
  label,
  size = 'md',
  animated = true,
  faceExpression,
  isPlugged = false
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round(value)));

  // Unique per-instance IDs so multiple batteries on screen at once
  // (e.g. player vs. opponent) never collide on the same SVG def IDs.
  const uid = useId();
  const gradId = `battGrad_${uid}`;
  const glossId = `glassGloss_${uid}`;
  const clipId = `innerBatteryClip_${uid}`;

  // Dynamic gradient colors based on percentage
  const getColors = (val: number) => {
    if (val >= 80) return { start: '#10b981', middle: '#14b8a6', end: '#10b981', border: '#10b981', glow: 'rgba(16, 185, 129, 0.25)' };
    if (val >= 50) return { start: '#d97706', middle: '#eab308', end: '#d97706', border: '#f59e0b', glow: 'rgba(245, 158, 11, 0.25)' };
    if (val >= 20) return { start: '#ea580c', middle: '#f97316', end: '#ea580c', border: '#f97316', glow: 'rgba(249, 115, 22, 0.25)' };
    return { start: '#be123c', middle: '#e11d48', end: '#be123c', border: '#f43f5e', glow: 'rgba(244, 63, 94, 0.25)' };
  };

  const colors = getColors(percentage);

  // Responsive max widths
  const sizeClasses = {
    sm: 'w-36 sm:w-44',
    md: 'w-48 sm:w-60',
    lg: 'w-full max-w-[320px]'
  };

  // Internal fill width calculation (max inner fill width = 250px)
  const maxFillWidth = 254;
  const currentFillWidth = (percentage / 100) * maxFillWidth;

  return (
    <div className="flex flex-col items-center justify-center select-none w-full my-1">
      {label && (
        <span className="text-xs font-bold text-slate-400 mb-1 tracking-wider flex items-center gap-1">
          <Zap className="w-3 h-3 opacity-60" />
          <span>{label}</span>
        </span>
      )}

      {/* Vector SVG Battery - 100% Crisp & Undistorted on all iOS & Android screens */}
      <div className={`relative ${sizeClasses[size]} aspect-[320/140] flex items-center justify-center`}>
        <svg
          viewBox="0 0 320 140"
          className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
          style={{ filter: `drop-shadow(0 0 12px ${colors.glow})` }}
        >
          <defs>
            {/* Liquid Fill Gradient */}
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.start} />
              <stop offset="50%" stopColor={colors.middle} />
              <stop offset="100%" stopColor={colors.end} />
            </linearGradient>

            {/* Glossy Top Glass Highlight */}
            <linearGradient id={glossId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
            </linearGradient>

            {/* Clip path for battery inner liquid container */}
            <clipPath id={clipId}>
              <rect x="15" y="15" width="254" height="110" rx="18" ry="18" />
            </clipPath>
          </defs>

          {/* 1. Main Outer Battery Body Shell */}
          <rect
            x="10"
            y="10"
            width="264"
            height="120"
            rx="24"
            ry="24"
            fill="#090d16"
            stroke={colors.border}
            strokeWidth="3.5"
            strokeOpacity="0.75"
          />

          {/* 2. Positive Terminal Tip (Unified in same SVG - Never breaks or clips!) */}
          <path
            d="M 276 46 L 288 46 C 294 46 298 50 298 56 L 298 84 C 298 90 294 94 288 94 L 276 94 Z"
            fill="#1e293b"
            stroke={colors.border}
            strokeWidth="3.5"
            strokeOpacity="0.75"
          />

          {/* 3. Interior Grid Texture Lines */}
          <g opacity="0.1" stroke="#ffffff" strokeWidth="1">
            <line x1="65" y1="15" x2="65" y2="125" />
            <line x1="115" y1="15" x2="115" y2="125" />
            <line x1="165" y1="15" x2="165" y2="125" />
            <line x1="215" y1="15" x2="215" y2="125" />
          </g>

          {/* 4. Liquid Fill Bar */}
          <g clipPath={`url(#${clipId})`}>
            <rect
              x="15"
              y="15"
              width={currentFillWidth}
              height="110"
              rx="16"
              ry="16"
              fill={`url(#${gradId})`}
              className={animated ? 'transition-all duration-300 ease-out' : ''}
            />

            {/* Glossy Overlay */}
            <rect x="15" y="15" width="254" height="110" fill={`url(#${glossId})`} pointerEvents="none" />
          </g>
        </svg>

        {/* 5. Center Text Overlay (Face Expression & Percentage) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pr-6">
          {faceExpression && (
            <span className="text-[11px] sm:text-xs font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mb-0.5 flex items-center gap-1">
              {isPlugged && <Plug className="w-3 h-3" />}
              <span>{faceExpression}</span>
            </span>
          )}
          <span className="text-2xl sm:text-4xl font-black text-white tracking-tight tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export const UnifiedBattery = React.memo(UnifiedBatteryComponent);
UnifiedBattery.displayName = 'UnifiedBattery';
