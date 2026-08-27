import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swords, Bot, Sparkles, Smartphone, UserCheck, RotateCcw, Send } from 'lucide-react';
import { Question } from '../types/game';
import { AiBot, getRandomBot, getAiGuess } from '../utils/aiBots';
import { getDeviceBattery, DeviceBatteryInfo } from '../utils/deviceBattery';
import { calculateScore } from '../utils/gameLogic';
import { UnifiedBattery } from './UnifiedBattery';
import { SliderInput } from './SliderInput';
import { playScoreSound, playTickSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface MutualPkGameProps {
  onGoToSinglePlayer?: () => void;
}

type PkState = 'lobby' | 'matching' | 'creating' | 'guessing' | 'revealed';

export const MutualPkGame: React.FC<MutualPkGameProps> = () => {
  const [pkState, setPkState] = useState<PkState>('lobby');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'弱' | '普通' | '強'>('普通');
  const [matchedBot, setMatchedBot] = useState<AiBot | null>(null);

  // Player's question for Opponent
  const [playerQuestionTitle, setPlayerQuestionTitle] = useState('');
  const [playerBatteryValue, setPlayerBatteryValue] = useState(50);
  const [deviceBattery, setDeviceBattery] = useState<number | null>(null);

  // Opponent's question for Player
  const [opponentQuestion, setOpponentQuestion] = useState<Question | null>(null);

  // Guesses
  const [playerGuess, setPlayerGuess] = useState(50);
  const [botGuess, setBotGuess] = useState(50);

  // Results
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);

  // Fetch real device battery level if supported
  useEffect(() => {
    getDeviceBattery().then((info: DeviceBatteryInfo) => {
      if (info && info.level !== undefined) {
        setDeviceBattery(info.level);
        setPlayerBatteryValue(info.level);
      }
    });
  }, []);

  // Handle Matchmaking
  const startMatchmaking = (difficulty = selectedDifficulty) => {
    setPkState('matching');
    setSelectedDifficulty(difficulty);

    // Simulate 2.5 seconds of searching for real players, then match AI Bot
    setTimeout(() => {
      const bot = getRandomBot(difficulty);
      setMatchedBot(bot);

      // AI Bot prepares opponent question
      const aiQuestions: Question[] = [
        {
          id: 'ai_q1',
          title: `【${bot.name}出題】猜猜我手機剛開機玩一整天剩幾 % 電量？`,
          officialBattery: Math.floor(Math.random() * 85) + 10,
          explanation: `${bot.name}的直覺公式推算！`,
          category: 'custom',
          emoji: bot.avatar
        },
        {
          id: 'ai_q2',
          title: `【${bot.name}出題】剛吃完熱騰騰高山烏龍茶剩多少電？`,
          officialBattery: 88,
          explanation: `${bot.name}的特調養生極限！`,
          category: 'custom',
          emoji: bot.avatar
        }
      ];
      setOpponentQuestion(aiQuestions[Math.floor(Math.random() * aiQuestions.length)]);
      setPkState('creating');
    }, 2500);
  };

  // Submit Player Question & proceed to guessing
  const handleConfirmQuestion = () => {
    if (!playerQuestionTitle.trim()) {
      alert('請輸入您的對決題目！');
      return;
    }
    setPkState('guessing');
  };

  // Submit Player's Guess
  const handleSubmitPkGuess = () => {
    if (!opponentQuestion || !matchedBot) return;

    // Calculate Player score against Opponent question
    const pScore = calculateScore(playerGuess, opponentQuestion.officialBattery).score;
    setPlayerScore(pScore);

    // Calculate AI Bot's guess against Player question
    const bGuess = getAiGuess(playerBatteryValue, matchedBot);
    setBotGuess(bGuess);
    const bScore = calculateScore(bGuess, playerBatteryValue).score;
    setBotScore(bScore);

    setPkState('revealed');

    // Play fanfare if player wins
    if (pScore >= bScore) {
      playScoreSound(100);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    } else {
      playScoreSound(40);
    }
  };

  const resetGame = () => {
    setPkState('lobby');
    setPlayerQuestionTitle('');
    setPlayerBatteryValue(deviceBattery || 50);
    setPlayerGuess(50);
    setMatchedBot(null);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/95 p-5 sm:p-7 rounded-3xl border border-rose-500/30 shadow-2xl flex flex-col items-center text-center gap-5 relative overflow-hidden my-2 select-none">
      {/* Background Aura */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* LOBBY STATE */}
      {pkState === 'lobby' && (
        <div className="flex flex-col items-center gap-5 w-full">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 p-3 bg-rose-500/10 rounded-2xl border border-rose-500/30 text-rose-400">
            <Swords className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 uppercase tracking-widest inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 1v1 對決與人機補位
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
              1v1 互相出題 PK 戰
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              雙方各自編寫一道題，互相考對手猜電量！3 秒無真人自動匹配智慧人機對決！
            </p>
          </div>

          {/* AI Difficulty Selector */}
          <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3 text-left">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              🎯 選擇對決人機難度 (AI Bot)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['弱', '普通', '強'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedDifficulty === diff
                      ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-950/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {diff === '弱' && '🌱 弱'}
                  {diff === '普通' && '💻 普通'}
                  {diff === '強' && '🤓 強'}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {selectedDifficulty === '弱' && '適合新手放鬆，對手估算誤差較大 (±15%~30%)'}
              {selectedDifficulty === '普通' && '標準競技體驗，對手估算中規中矩 (±7%~14%)'}
              {selectedDifficulty === '強' && '高難度挑戰，對手為極限數學大師 (±1%~5%)'}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => startMatchmaking(selectedDifficulty)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white font-black text-base shadow-xl shadow-rose-950/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-rose-400/30"
          >
            <Swords className="w-5 h-5" />
            <span>開始 1v1 配對 PK</span>
          </button>
        </div>
      )}

      {/* MATCHING STATE */}
      {pkState === 'matching' && (
        <div className="flex flex-col items-center justify-center py-10 gap-6 w-full">
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-rose-500/10 border-2 border-rose-500/40 animate-ping absolute" />
            <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-rose-500 flex items-center justify-center text-3xl shadow-xl z-10">
              ⚔️
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black text-white">正搜尋線上玩家...</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1 animate-pulse">
              <Bot className="w-4 h-4 text-rose-400" /> 超過 3 秒自動補位 {selectedDifficulty} 度 AI 人機
            </p>
          </div>
        </div>
      )}

      {/* CREATING STATE (Player writes question for Opponent) */}
      {pkState === 'creating' && matchedBot && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 w-full text-left">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{matchedBot.avatar}</span>
              <div>
                <h4 className="text-xs font-bold text-white">對手已連線：{matchedBot.name}</h4>
                <span className="text-[10px] text-rose-400 font-bold">難度：{matchedBot.difficulty}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> 準備完畢
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/30 flex flex-col gap-3">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
              <Send className="w-4 h-4" /> 第一階段：請考對手一道題目
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">題目名稱</label>
              <input
                type="text"
                value={playerQuestionTitle}
                onChange={(e) => setPlayerQuestionTitle(e.target.value)}
                placeholder="例如：猜猜我手機剛打完遊戲剩幾 % 電？"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Slider for Question Answer */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-400">題目官方答案電量</label>
                <span className="text-xs font-black text-rose-400">{playerBatteryValue}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={playerBatteryValue}
                onChange={(e) => {
                  setPlayerBatteryValue(Number(e.target.value));
                  playTickSound();
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
              {deviceBattery !== null && (
                <button
                  type="button"
                  onClick={() => setPlayerBatteryValue(deviceBattery)}
                  className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1 hover:underline"
                >
                  <Smartphone className="w-3 h-3" /> 使用當前實體手機真實電量 ({deviceBattery}%)
                </button>
              )}
            </div>

            <button
              onClick={handleConfirmQuestion}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xs shadow-lg hover:brightness-110 active:scale-[0.99] transition-all"
            >
              確認出題！開始互猜
            </button>
          </div>
        </motion.div>
      )}

      {/* GUESSING STATE (Player guesses Opponent's question) */}
      {pkState === 'guessing' && opponentQuestion && matchedBot && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4 w-full">
          <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/30 w-full text-left">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block mb-1">
              第二階段：請猜 {matchedBot.name} 出的題目電量
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">{opponentQuestion.title}</h3>
          </div>

          <UnifiedBattery value={playerGuess} size="lg" label="你猜的對手電量" />

          <SliderInput
            value={playerGuess}
            onChange={setPlayerGuess}
            onSubmit={handleSubmitPkGuess}
          />
        </motion.div>
      )}

      {/* REVEALED STATE (Match Results & Scores) */}
      {pkState === 'revealed' && opponentQuestion && matchedBot && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4 w-full">
          {/* Winner Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-purple-950 border border-rose-500/40 text-center">
            <span className="text-4xl block mb-1">
              {playerScore >= botScore ? '👑' : '⚡'}
            </span>
            <h3 className="text-2xl font-black text-white">
              {playerScore >= botScore ? '對決獲勝 VICTORY!' : '挑戰結束 MATCH END'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {playerScore >= botScore ? `恭喜贏過對手 ${matchedBot.name}！` : `惜敗給對手 ${matchedBot.name}！`}
            </p>
          </div>

          {/* Score Comparison Grid */}
          <div className="grid grid-cols-2 gap-3 w-full text-xs font-bold">
            <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 text-center">
              <span className="text-slate-400 block text-[10px]">玩家得分</span>
              <span className="text-2xl font-black text-emerald-400">{playerScore}</span>
              <span className="text-[10px] text-slate-500 block">答案差距: {Math.abs(playerGuess - opponentQuestion.officialBattery)}%</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/30 text-center">
              <span className="text-slate-400 block text-[10px]">{matchedBot.name} 得分 ({matchedBot.difficulty})</span>
              <span className="text-2xl font-black text-rose-400">{botScore}</span>
              <span className="text-[10px] text-slate-500 block">答案差距: {Math.abs(botGuess - playerBatteryValue)}%</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={resetGame}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>再對決一局！</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
