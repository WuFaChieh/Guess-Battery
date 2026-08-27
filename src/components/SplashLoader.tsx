import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playChargingSound, playScoreSound } from '../utils/audio';
import { UnifiedBattery } from './UnifiedBattery';

interface SplashLoaderProps {
  onComplete: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast, snappy fluctuating loading progress steps (~0.7s total)
    const steps = [
      { target: 28, speed: 6 },   // Fast start
      { target: 38, speed: 18 },  // Brief organic pause
      { target: 75, speed: 7 },   // Fast burst fill
      { target: 88, speed: 14 },  // Quick micro-slowdown
      { target: 100, speed: 5 }   // Final complete
    ];

    let currentStep = 0;
    let currentVal = 0;

    const runLoading = () => {
      if (currentStep >= steps.length) {
        setProgress(100);
        playScoreSound(100);
        setTimeout(() => {
          onComplete();
        }, 220);
        return;
      }

      const { target, speed } = steps[currentStep];

      const interval = setInterval(() => {
        currentVal += 2;
        if (currentVal > target) currentVal = target;
        setProgress(currentVal);

        if (currentVal % 4 === 0) {
          playChargingSound(currentVal); // Punchy pitch-rising charging synth audio!
        }

        if (currentVal >= target) {
          clearInterval(interval);
          currentStep += 1;
          setTimeout(runLoading, currentStep === 2 ? 40 : 15);
        }
      }, speed);
    };

    runLoading();
  }, [onComplete]);

  // Cute mascot facial expressions based on battery charge %
  const getMascotExpression = (val: number) => {
    if (val < 30) return { face: '( ｡>﹏<｡ )', label: '開機充能中...' };
    if (val < 70) return { face: '( ｡• ᵕ •｡ )', label: '熱量與直覺蓄積中...' };
    if (val < 99) return { face: '( ≧ᗜ≦ )', label: '能量滿載！' };
    return { face: '( ⚡💯⚡ )', label: '萬物皆有電量！' };
  };

  const mascot = getMascotExpression(progress);

  return (
    <AnimatePresence>
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
            <span className="animate-spin text-amber-400 text-sm">⚡</span>
            <span>{mascot.label}</span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
