import React from 'react';
import { UnifiedBattery } from './UnifiedBattery';

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
  return (
    <UnifiedBattery
      value={value}
      label={label}
      size={size}
      animated={animated}
    />
  );
};
