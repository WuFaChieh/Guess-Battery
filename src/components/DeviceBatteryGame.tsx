import React, { useState, useEffect } from 'react';
import { getDeviceBattery, DeviceBatteryInfo } from '../utils/deviceBattery';
import { BatteryGauge } from './BatteryGauge';
import { SliderInput } from './SliderInput';
import { calculateScore, getCommentary } from '../utils/gameLogic';
import { playRevealSound, playScoreSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Smartphone, Zap, RefreshCw, RotateCcw, ArrowRight } from 'lucide-react';

export const DeviceBatteryGame: React.FC = () => {
  const [batteryInfo, setBatteryInfo] = useState<DeviceBatteryInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userGuess, setUserGuess] = useState<number>(50);
  const [gameState, setGameState] = useState<'prompt' | 'guessing' | 'revealed'>('prompt');
  const [scoreResult, setScoreResult] = useState<{ distance: number; score: number } | null>(null);

  const fetchBattery = async () => {
    setLoading(true);
    const info = await getDeviceBattery();
    setBatteryInfo(info);
    setLoading(false);
  };

  useEffect(() => {
    fetchBattery();
  }, []);

  const handleStartGuess = () => {
    fetchBattery();
    setUserGuess(50);
    setGameState('guessing');
  };

  const handleLockGuess = () => {
    if (!batteryInfo) return;
    const result = calculateScore(userGuess, batteryInfo.level);
    setScoreResult(result);

    playRevealSound();
    setTimeout(() => {
      playScoreSound(result.score);
      if (result.score >= 90) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      }
    }, 300);

    setGameState('revealed');
  };

  if (loading) {
    return (
      <div className="w-full max-w-lg mx-auto bg-slate-900/90 p-8 rounded-3xl border border-slate-800 text-center flex flex-col items-center gap-3">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
        <span className="text-sm font-bold text-slate-300">正在讀取實體裝置電池 API...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/90 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center gap-6">
      {/* Header Banner */}
      <div className="text-center">
        <div className="inline-flex p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400 mb-2">
          <Smartphone className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">猜你手機/電腦真實電量</h2>
        <p className="text-xs text-slate-400 mt-1">
          {batteryInfo?.supported
            ? '⚡ 已成功對接瀏覽器 Web Battery API！即時測量真正電量！'
            : '💡 當前瀏覽器環境不支援硬體 API，已開啟模擬電量對決模式！'}
        </p>
      </div>

      {gameState === 'prompt' && (
        <div className="w-full flex flex-col items-center gap-5 text-center">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 w-full flex flex-col items-center gap-3">
            <span className="text-4xl">📱</span>
            <h3 className="text-xl font-bold text-white">荒謬考驗課題：</h3>
            <p className="text-sm text-emerald-300 font-semibold leading-relaxed">
              「猜猜看眼前這台手機/電腦，在經過今天的各種運作後，現在實體電量到底還剩幾 %？」
            </p>
          </div>

          <button
            onClick={handleStartGuess}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            <span>我準備好了！開始猜電量</span>
          </button>
        </div>
      )}

      {gameState === 'guessing' && (
        <div className="w-full flex flex-col items-center gap-5">
          <BatteryGauge value={userGuess} label="你猜這台裝置的真正電量" size="lg" />

          <SliderInput
            value={userGuess}
            onChange={setUserGuess}
            onSubmit={handleLockGuess}
            submitLabel="🔒 鎖定猜測並讀取實體電量"
          />
        </div>
      )}

      {gameState === 'revealed' && batteryInfo && scoreResult && (
        <div className="w-full flex flex-col items-center gap-5 text-center">
          <div className="grid grid-cols-2 gap-4 w-full justify-items-center">
            <BatteryGauge value={userGuess} label="你的猜測" size="md" />
            <BatteryGauge value={batteryInfo.level} label="裝置真實電量" size="md" />
          </div>

          {/* Real hardware battery details badge */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 w-full text-xs flex items-center justify-between px-6">
            <span className="text-slate-400">
              充電狀態：{batteryInfo.charging ? <strong className="text-emerald-400">⚡ 充電中</strong> : <span className="text-amber-400">未充電</span>}
            </span>
            <span className="text-slate-400">
              硬體實體電量：<strong className="text-white font-bold">{batteryInfo.level}%</strong>
            </span>
          </div>

          {/* Result Banner */}
          <div className="w-full bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-3 text-sm">
              <span className="text-slate-400">差距：<strong className="text-amber-400 font-bold">{scoreResult.distance}%</strong></span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">
                得分：<strong className="text-emerald-400 font-black text-xl">+{scoreResult.score}</strong>
              </span>
            </div>
            <p className="text-emerald-300 font-bold text-base mt-1">
              {getCommentary(scoreResult.distance)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={handleStartGuess}
              className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新檢測再猜一次</span>
            </button>

            <button
              onClick={() => setGameState('prompt')}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <span>再玩一局</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
