import React from 'react';
import { UnifiedBattery } from './UnifiedBattery';
import { useLanguage } from '../i18n/LanguageContext';

interface BatteryGaugeProps {
  value: number; // 0 to 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  colorOverride?: string;
}

// Memoized: a thin wrapper around UnifiedBattery, itself often re-rendered
// on high-frequency timer ticks (slider drags, charging ceremonies). `label`
// defaults to the localized generic guess label when the caller doesn't pass
// its own (already localized) label.
const BatteryGaugeComponent: React.FC<BatteryGaugeProps> = ({
  value,
  label,
  size = 'lg',
  animated = true
}) => {
  const { t } = useLanguage();
  return (
    <UnifiedBattery
      value={value}
      label={label ?? t('battery_guess_label')}
      size={size}
      animated={animated}
    />
  );
};

export const BatteryGauge = React.memo(BatteryGaugeComponent);
BatteryGauge.displayName = 'BatteryGauge';
