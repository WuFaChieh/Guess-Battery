import React from 'react';
import { motion } from 'framer-motion';
import { BatteryCharging } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface LoadingStateProps {
  label?: string;
}

// Shared loading indicator for every async/lazy-load boundary in the app
// (mode chunk loading, question pool init, etc.) — a single animated,
// on-brand placeholder instead of each call site inventing its own static
// "載入中..." text with no motion at all. `label` defaults to the localized
// generic loading text when the caller doesn't pass its own (already
// localized) label.
export const LoadingState: React.FC<LoadingStateProps> = ({ label }) => {
  const { t } = useLanguage();
  const resolvedLabel = label ?? t('loading_default');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full flex flex-col items-center justify-center gap-3 py-16 text-slate-400"
    >
      <motion.div
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BatteryCharging className="w-9 h-9 text-emerald-500" />
      </motion.div>
      <span className="text-xs font-bold tracking-wide">{resolvedLabel}</span>
    </motion.div>
  );
};
