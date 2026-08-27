import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swords, Smartphone, Send, RotateCcw, Zap } from 'lucide-react';
import { Question } from '../types/game';
import { HUMAN_BOT_PROFILES, HUMAN_BOT_QUESTIONS, HumanBotProfile, generateHumanBotGuess } from '../utils/humanAiDeck';
import { getDeviceBattery, DeviceBatteryInfo } from '../utils/deviceBattery';
import { calculateScore } from '../utils/gameLogic';
import { UnifiedBattery } from './UnifiedBattery';
import { SliderInput } from './SliderInput';
import { playScoreSound, playTickSound } from '../utils/audio';
import confetti from 'canvas-confetti';

type PkStage = 'lobby' | 'matching' | 'matched' | 'creating' | 'guessing' | 'revealed';

export const MutualPkGame: React.FC = () => {
  const [stage, setStage] = useState<PkStage>('lobby');

  // Player Profile
  const playerAvatar = '😎';

  // Opponent Profile (Stealth - looks 100% like real player)
  const [opponent, setOpponent] = useState<HumanBotProfile | null>(null);

  // Player's Question for Opponent
  const [playerTitle, setPlayerTitle] = useState('');
  const [playerOfficialBattery, setPlayerOfficialBattery] = useState(50);
  const [deviceBattery, setDeviceBattery] = useState<number | null>(null);

  // Opponent's Question for Player
  const [opponentQuestion, setOpponentQuestion] = useState<Question | null>(null);

  // Guesses
  const [playerGuess, setPlayerGuess] = useState(50);
  const [opponentGuess, setOpponentGuess] = useState(50);

  // Score & Gap
  const [playerGap, setPlayerGap] = useState(0);
  const [opponentGap, setOpponentGap] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  // Fetch real device battery
  useEffect(() => {
    getDeviceBattery().then((info: DeviceBatteryInfo) => {
      if (info && info.level !== undefined) {
        setDeviceBattery(info.level);
        setPlayerOfficialBattery(info.level);
      }
    });
  }, []);

  // Matchmaking (Seemlessly pairs opponent)
  const handleStartMatchmaking = () => {
    setStage('matching');

    // Simulate 2.2 seconds matchmaking
    setTimeout(() => {
      const opp = HUMAN_BOT_PROFILES[Math.floor(Math.random() * HUMAN_BOT_PROFILES.length)];
      setOpponent(opp);

      // Select human-like question for opponent
      const qTemplate = HUMAN_BOT_QUESTIONS[Math.floor(Math.random() * HUMAN_BOT_QUESTIONS.length)];
      setOpponentQuestion({
        id: `opp_q_${Date.now()}`,
        title: qTemplate.title,
        officialBattery: qTemplate.battery,
        explanation: qTemplate.exp,
        category: 'custom',
        emoji: opp.avatar
      });

      setStage('matched');

      // Transition to creating stage after 1.2s match celebration
      setTimeout(() => {
        setStage('creating');
      }, 1200);
    }, 2200);
  };

  // Confirm Player's Question
  const handleConfirmQuestion = () => {
    if (!playerTitle.trim()) {
      alert('請輸入考對手的題目名稱！');
      return;
    }
    setStage('guessing');
  };

  // Submit Player Guess & One-Shot Sudden Death Reveal
  const handlePKSubmitGuess = () => {
    if (!opponentQuestion || !opponent) return;

    // Player Gap & Score against Opponent's Question
    const pGap = Math.abs(playerGuess - opponentQuestion.officialBattery);
    const pScore = calculateScore(playerGuess, opponentQuestion.officialBattery).score;
    setPlayerGap(pGap);
    setPlayerScore(pScore);

    // Opponent Gap & Score against Player's Question
    const oGuess = generateHumanBotGuess(playerOfficialBattery, opponent.accuracyTier);
    const oGap = Math.abs(oGuess - playerOfficialBattery);
    const oScore = calculateScore(oGuess, playerOfficialBattery).score;
    setOpponentGuess(oGuess);
    setOpponentGap(oGap);
    setOpponentScore(oScore);

    setStage('revealed');

    // Winner Fanfare
    if (pScore >= oScore) {
      playScoreSound(100);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    } else {
      playScoreSound(40);
    }
  };

  const resetGame = () => {
    setStage('lobby');
    setPlayerTitle('');
    setPlayerOfficialBattery(deviceBattery || 50);
    setPlayerGuess(50);
    setOpponent(null);
    setOpponentQuestion(null);
  };

  const isPlayerWinner = playerScore >= opponentScore;

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/95 p-5 sm:p-7 rounded-3xl border border-rose-500/30 shadow-2xl flex flex-col items-center text-center gap-5 relative overflow-hidden my-2 select-none">
      {/* Ambient Glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* STAGE 1: LOBBY */}
      {stage === 'lobby' && (
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="p-3.5 bg-rose-500/10 rounded-2xl border border-rose-500/30 text-rose-400">
            <Swords className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 uppercase tracking-widest inline-flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> 即時連線一戰定勝負
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
              1v1 互相出題 PK 戰
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              即時搜尋線上玩家對決！雙方互相編寫一道題目考對方，一戰定勝負！
            </p>
          </div>

          <button
            onClick={handleStartMatchmaking}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-black text-base sm:text-lg shadow-xl shadow-purple-950/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-violet-400/30 mt-2"
          >
            <Swords className="w-5 h-5" />
            <span>開始配對 PK (MATCH)</span>
          </button>
        </div>
      )}

      {/* STAGE 2: MATCHING */}
      {stage === 'matching' && (
        <div className="flex flex-col items-center justify-center py-12 gap-6 w-full">
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-rose-500/20 border-2 border-rose-500/50 animate-ping absolute" />
            <div className="w-20 h-20 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center text-3xl shadow-2xl z-10">
              ⚔️
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black text-white">正在尋找線上玩家...</h3>
            <p className="text-xs text-slate-400 mt-1 animate-pulse">
              大腦波段匹配中，準備即時連線對決...
            </p>
          </div>
        </div>
      )}

      {/* STAGE 3: MATCHED CELEBRATION */}
      {stage === 'matched' && opponent && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4 py-8 w-full">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
            🎉 配對成功 MATCHED!
          </span>
          <div className="flex items-center justify-center gap-6 my-2">
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl">{playerAvatar}</span>
              <span className="text-xs font-bold text-white">你</span>
            </div>
            <span className="text-2xl font-black text-rose-400">VS</span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl">{opponent.avatar}</span>
              <span className="text-xs font-bold text-white">{opponent.name}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 animate-pulse">準備進入互相出題階段...</p>
        </motion.div>
      )}

      {/* STAGE 4: CREATING QUESTION */}
      {stage === 'creating' && opponent && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 w-full text-left">
          {/* Opponent Typing Status Bar */}
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{opponent.avatar}</span>
              <div>
                <h4 className="text-xs font-bold text-white">對手：{opponent.name}</h4>
                <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  對方也在輸入題目中...
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/30 flex flex-col gap-3">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
              <Send className="w-4 h-4" /> 第一步：請寫下考倒 {opponent.name} 的題目
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">題目名稱</label>
              <input
                type="text"
                value={playerTitle}
                onChange={(e) => setPlayerTitle(e.target.value)}
                placeholder="例如：猜猜我手機剛打完遊戲剩幾 % 電？"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Slider for Question Answer */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-400">題目官方答案電量</label>
                <span className="text-xs font-black text-rose-400">{playerOfficialBattery}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={playerOfficialBattery}
                onChange={(e) => {
                  setPlayerOfficialBattery(Number(e.target.value));
                  playTickSound();
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
              {deviceBattery !== null && (
                <button
                  type="button"
                  onClick={() => setPlayerOfficialBattery(deviceBattery)}
                  className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1 hover:underline"
                >
                  <Smartphone className="w-3 h-3" /> 使用當前實體手機真實電量 ({deviceBattery}%)
                </button>
              )}
            </div>

            <button
              onClick={handleConfirmQuestion}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-lg hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
            >
              出題完畢！開始猜對手電量
            </button>
          </div>
        </motion.div>
      )}

      {/* STAGE 5: GUESSING */}
      {stage === 'guessing' && opponentQuestion && opponent && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4 w-full">
          <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/30 w-full text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{opponent.avatar}</span>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                {opponent.name} 出的題目：
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">{opponentQuestion.title}</h3>
          </div>

          <UnifiedBattery value={playerGuess} size="lg" label="你猜的答案電量" />

          <SliderInput
            value={playerGuess}
            onChange={setPlayerGuess}
            onSubmit={handlePKSubmitGuess}
          />
        </motion.div>
      )}

      {/* STAGE 6: REVEALED RESULTS - DUAL BATTERY SCALING */}
      {stage === 'revealed' && opponentQuestion && opponent && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-5 w-full">
          {/* Match Banner */}
          <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-rose-500/40 text-center">
            <span className="text-3xl block mb-1">{isPlayerWinner ? '👑' : '⚡'}</span>
            <h3 className="text-2xl font-black text-white">
              {isPlayerWinner ? '一戰成名 · 猜電量獲勝！' : '一戰結束 · 殘念惜敗！'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">一戰定勝負 · 比對差距最小者勝出！</p>
          </div>

          {/* DUAL BATTERY COMPARISON - WINNER SCALES LARGE, LOSER SCALES SMALL */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full items-center justify-center my-2">
            {/* Player's Battery Card */}
            <div
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 ${
                isPlayerWinner
                  ? 'bg-emerald-950/40 border-emerald-400 shadow-2xl shadow-emerald-500/20 scale-105 sm:scale-110 z-10'
                  : 'bg-slate-950/80 border-slate-800 opacity-70 scale-95'
              }`}
            >
              <div className="flex items-center gap-1.5 font-black text-xs">
                <span className="text-xl">{playerAvatar}</span>
                <span className="text-white">你</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isPlayerWinner ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>
                  {isPlayerWinner ? '👑 獲勝' : '⚡ 敗北'}
                </span>
              </div>

              <UnifiedBattery value={100 - playerGap} size="sm" />

              <div className="text-[11px] font-bold text-slate-300 flex flex-col gap-0.5 text-center">
                <span>得分：<strong className="text-emerald-400 text-sm">{playerScore}</strong> 分</span>
                <span className="text-slate-400 text-[10px]">差距僅：<strong className="text-amber-400">{playerGap}%</strong></span>
              </div>
            </div>

            {/* Opponent's Battery Card */}
            <div
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 ${
                !isPlayerWinner
                  ? 'bg-rose-950/40 border-rose-400 shadow-2xl shadow-rose-500/20 scale-105 sm:scale-110 z-10'
                  : 'bg-slate-950/80 border-slate-800 opacity-70 scale-95'
              }`}
            >
              <div className="flex items-center gap-1.5 font-black text-xs">
                <span className="text-xl">{opponent.avatar}</span>
                <span className="text-white">{opponent.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${!isPlayerWinner ? 'bg-rose-500 text-white font-black' : 'bg-slate-800 text-slate-400'}`}>
                  {!isPlayerWinner ? '👑 獲勝' : '⚡ 敗北'}
                </span>
              </div>

              <UnifiedBattery value={100 - opponentGap} size="sm" />

              <div className="text-[11px] font-bold text-slate-300 flex flex-col gap-0.5 text-center">
                <span>得分：<strong className="text-rose-400 text-sm">{opponentScore}</strong> 分</span>
                <span className="text-slate-400 text-[10px]">差距僅：<strong className="text-amber-400">{opponentGap}%</strong></span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={resetGame}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-black text-sm shadow-xl shadow-purple-950/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-violet-400/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>再配對對決一局！</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
