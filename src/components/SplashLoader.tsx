import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { playChargingSound, playScoreSound } from '../utils/audio';
import { UnifiedBattery } from './UnifiedBattery';
import { useLanguage } from '../i18n/LanguageContext';

interface SplashLoaderProps {
  onComplete: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    // Organic fluctuating loading steps with distinct noticeable pauses (~1.1s total)
    const steps = [
      { target: 34, speed: 12, pauseAfter: 180 }, // Fast initial charge 0% -> 34%, then distinct 180ms pause
      { target: 82, speed: 10, pauseAfter: 140 }, // High speed burst 34% -> 82%, then 140ms micro-pause
      { target: 100, speed: 12, pauseAfter: 220 } // Final complete to 100%
    ];

    let currentStep = 0;
    let currentVal = 0;

    const runLoading = () => {
      if (currentStep >= steps.length) {
        setProgress(100);
        playScoreSound(100);
        setTimeout(() => {
          onComplete();
        }, 300);
        return;
      }

      const { target, speed, pauseAfter } = steps[currentStep];

      const interval = setInterval(() => {
        currentVal += 1;
        if (currentVal > target) currentVal = target;
        setProgress(currentVal);

        if (currentVal % 3 === 0) {
          playChargingSound(currentVal);
        }

        if (currentVal >= target) {
          clearInterval(interval);
          currentStep += 1;
          setTimeout(runLoading, pauseAfter); // Distinct noticeable pause between steps!
        }
      }, speed);
    };

    runLoading();
  }, [onComplete]);

  // Cute mascot facial expressions based on battery charge %
  const getMascotExpression = (val: number) => {
    if (val < 30) return { face: '( ｡>﹏<｡ )', label: t('splash_stage_boot') };
    if (val < 70) return { face: '( ｡• ᵕ •｡ )', label: t('splash_stage_charging') };
    if (val < 99) return { face: '( ≧ᗜ≦ )', label: t('splash_stage_full') };
    return { face: '( ✧ω✧ )', label: t('splash_stage_done') };
  };

  const mascot = getMascotExpression(progress);

  return (
    // No AnimatePresence here: App.tsx wraps the splash/cover/shell switch in
    // one, which is what lets this `exit` actually play (see its comment).
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 select-none"
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cute Mascot Battery Container */}
      <div className="relative flex flex-col items-center gap-4 z-10 max-w-xs w-full">
        {/* Floating Emoji Sparks */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-4xl filter drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        >
          🔋
        </motion.div>

        {/* Unified Vector Battery - 100% Crisp on all iOS & Android screens */}
        <UnifiedBattery
          value={progress}
          size="lg"
          faceExpression={mascot.face}
        />

        {/* Status Label */}
        <motion.div
          key={mascot.label}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-emerald-400/90 tracking-wider flex items-center gap-1.5 mt-1"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>{mascot.label}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
