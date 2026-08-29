import React from 'react';
import { UnifiedBattery } from './UnifiedBattery';

interface BatteryGaugeProps {
  value: number; // 0 to 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  colorOverride?: string;
}

// Memoized: a thin wrapper around UnifiedBattery, itself often re-rendered
// on high-frequency timer ticks (slider drags, charging ceremonies).
const BatteryGaugeComponent: React.FC<BatteryGaugeProps> = ({
  value,
  label = '你猜的電量',
  size = 'lg',
  animated = true
}) => {
  return (
    <UnifiedBattery
      value={value}
      label={label}
      size={size}
      animated={animated}
    />
  );
};

export const BatteryGauge = React.memo(BatteryGaugeComponent);
BatteryGauge.displayName = 'BatteryGauge';
