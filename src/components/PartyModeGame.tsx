import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question, Player } from '../types/game';
import { QuestionCard } from './QuestionCard';
import { BatteryGauge } from './BatteryGauge';
import { UnifiedBattery } from './UnifiedBattery';
import { SliderInput } from './SliderInput';
import { calculateScore } from '../utils/gameLogic';
import { playRevealSound, playScoreSound, playVictoryFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Users, Crown, EyeOff, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface PartyModeGameProps {
  allQuestions: Question[];
}

const PLAYER_COLORS = [
  'from-emerald-500 to-teal-400',
  'from-cyan-500 to-blue-400',
  'from-amber-500 to-yellow-400',
  'from-purple-500 to-pink-400'
];

const PLAYER_AVATARS = ['🐱', '🐶', '🦊', '🐼'];

export const PartyModeGame: React.FC<PartyModeGameProps> = ({ allQuestions }) => {
  const [setupStep, setSetupStep] = useState<boolean>(true);
  const [playerCount, setPlayerCount] = useState<number>(3);
  const [playerNames, setPlayerNames] = useState<string[]>(['玩家 A', '玩家 B', '玩家 C', '玩家 D']);

  // Game state
  const [players, setPlayers] = useState<Player[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<number>(50);
  const [secretLocked, setSecretLocked] = useState<boolean>(false);
  const [gameState, setGameState] = useState<'turn' | 'reveal' | 'finished'>('turn');

  const startPartyGame = () => {
    const activePlayers: Player[] = Array.from({ length: playerCount }).map((_, i) => ({
      id: `p_${i}`,
      name: playerNames[i] || `玩家 ${i + 1}`,
      avatar: PLAYER_AVATARS[i % PLAYER_AVATARS.length],
      color: PLAYER_COLORS[i % PLAYER_COLORS.length],
      totalScore: 0,
      guesses: {}
    }));

    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
    setPlayers(activePlayers);
    setQuestionIndex(0);
    setActivePlayerIndex(0);
    setCurrentGuess(50);
    setSecretLocked(false);
    setGameState('turn');
    setSetupStep(false);
  };

  const handleLockTurn = () => {
    const q = questions[questionIndex];
    // Record guess
    const updatedPlayers = [...players];
    updatedPlayers[activePlayerIndex].guesses[q.id] = currentGuess;
    setPlayers(updatedPlayers);

    if (activePlayerIndex + 1 < players.length) {
      // Pass to next player
      setActivePlayerIndex((prev) => prev + 1);
      setCurrentGuess(50);
      setSecretLocked(false);
    } else {
      // All players answered this question! Reveal!
      playRevealSound();
      
      // Calculate scores for this round
      const scoredPlayers = updatedPlayers.map((p) => {
        const guess = p.guesses[q.id];
        const { score } = calculateScore(guess, q.officialBattery);
        return { ...p, totalScore: p.totalScore + score };
      });
      setPlayers(scoredPlayers);

      playScoreSound(85);
      setGameState('reveal');
    }
  };

  const handleNextRound = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((prev) => prev + 1);
      setActivePlayerIndex(0);
      setCurrentGuess(50);
      setSecretLocked(false);
      setGameState('turn');
    } else {
      // Game over! Winner celebration!
      playVictoryFanfareSound();
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.4 } });
      setGameState('finished');
    }
  };

  // Render Setup Screen
  if (setupStep) {
    return (
      <div className="w-full max-w-lg mx-auto bg-slate-900/90 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-6 select-none">
        <div className="text-center">
          <div className="inline-flex p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400 mb-2">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">同螢幕派對模式</h2>
          <p className="text-xs text-slate-400 mt-1">2 ~ 4 人共用同一台手機/電腦秘密輪流猜電量！</p>
        </div>

        {/* Player Count Picker */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            選擇玩家人數
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => setPlayerCount(count)}
                className={`py-3 rounded-xl text-sm font-bold transition-all ${
                  playerCount === count
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {count} 人對決
              </button>
            ))}
          </div>
        </div>

        {/* Custom Player Names */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            輸入玩家暱稱
          </label>
          {Array.from({ length: playerCount }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xl">{PLAYER_AVATARS[idx]}</span>
              <input
                type="text"
                value={playerNames[idx] || ''}
                onChange={(e) => {
                  const updated = [...playerNames];
                  updated[idx] = e.target.value;
                  setPlayerNames(updated);
                }}
                placeholder={`玩家 ${idx + 1}`}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          ))}
        </div>

        <button
          onClick={startPartyGame}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-lg shadow-lg shadow-cyan-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          <span>🚀 開始派對對決</span>
        </button>
      </div>
    );
  }

  const currentQ = questions[questionIndex];
  const activeP = players[activePlayerIndex];

  // Render Pass & Play Turn
  if (gameState === 'turn') {
    return (
      <div className="w-full flex flex-col items-center select-none">
        <QuestionCard
          question={currentQ}
          currentIndex={questionIndex}
          totalQuestions={questions.length}
        />

        {!secretLocked ? (
          <div className="w-full max-w-lg bg-slate-900/90 p-6 rounded-3xl border border-slate-800 text-center flex flex-col items-center gap-4 my-2">
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              👥 輪到玩家下注
            </span>

            <div className="flex items-center gap-3 my-1">
              <span className="text-4xl">{activeP.avatar}</span>
              <h3 className="text-2xl font-black text-white">{activeP.name}</h3>
            </div>

            <p className="text-xs text-slate-400">
              請把螢幕遞給 <strong className="text-cyan-300">{activeP.name}</strong>！請其他玩家不要偷看喔！
            </p>

            <button
              onClick={() => setSecretLocked(true)}
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-base transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <EyeOff className="w-5 h-5" />
              <span>我準備好了，秘密輸入電量</span>
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="text-center mb-2">
              <span className="text-xs font-bold text-cyan-400">
                正在秘密輸入中：{activeP.avatar} {activeP.name}
              </span>
            </div>

            <BatteryGauge value={currentGuess} label={`${activeP.name} 的猜測`} size="lg" />

            <SliderInput
              value={currentGuess}
              onChange={setCurrentGuess}
              onSubmit={handleLockTurn}
              submitLabel={`🔒 鎖定 ${activeP.name} 的答案`}
            />
          </div>
        )}
      </div>
    );
  }

  // Render Round Reveal
  if (gameState === 'reveal') {
    const sortedRoundResults = [...players]
      .map((p) => {
        const guess = p.guesses[currentQ.id];
        const { distance, score } = calculateScore(guess, currentQ.officialBattery);
        return { player: p, guess, distance, score };
      })
      .sort((a, b) => b.score - a.score);

    return (
      <div className="w-full max-w-2xl mx-auto bg-slate-900/95 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-6 text-center select-none">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            🎉 本題公開揭曉
          </span>
          <h3 className="text-xl font-black text-white mt-2">{currentQ.title}</h3>
        </div>

        {/* Official Answer Banner */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
          <BatteryGauge value={currentQ.officialBattery} label="官方正確答案" size="md" />
          <p className="text-xs text-slate-300 mt-1 max-w-md">{currentQ.explanation}</p>
        </div>

        {/* Players Guess Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {sortedRoundResults.map((res, idx) => (
            <div
              key={res.player.id}
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                idx === 0
                  ? 'bg-cyan-500/10 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {idx === 0 && <Crown className="w-5 h-5 text-amber-400 shrink-0" />}
                <span className="text-2xl">{res.player.avatar}</span>
                <div>
                  <h4 className="font-bold text-sm text-white">{res.player.name}</h4>
                  <span className="text-xs text-slate-400">
                    猜 <strong className="text-white">{res.guess}%</strong> (差 {res.distance}%)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">本題得分</span>
                <span className="font-black text-emerald-400 text-lg">+{res.score}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Next Question Button */}
        <button
          onClick={handleNextRound}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-lg shadow-lg shadow-cyan-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{questionIndex === questions.length - 1 ? '🏆 派對總冠軍統計' : '進入下一題 ➡️'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // Render Final Party Champion Leaderboard & High-Energy Podium Summary
  const sortedFinalPlayers = [...players].sort((a, b) => b.totalScore - a.totalScore);
  const champion = sortedFinalPlayers[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl mx-auto bg-slate-900/95 p-6 md:p-8 rounded-3xl border border-amber-500/30 shadow-2xl flex flex-col gap-6 text-center select-none"
    >
      <div className="inline-flex p-3.5 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-amber-400 self-center">
        <Crown className="w-10 h-10 animate-bounce" />
      </div>

      <div>
        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 同螢幕派對總決算
        </span>
        <h2 className="text-3xl font-black text-white tracking-tight mt-2">派對電量總冠軍登場！</h2>
        <p className="text-xs text-slate-400 mt-1">經歷了 5 題極致荒謬電量考驗</p>
      </div>

      {/* Champion Spring Pop-Out Podium Card */}
      <motion.div
        initial={{ scale: 0.9, y: 10 }}
        animate={{ scale: 1.05, y: -5 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="bg-gradient-to-r from-amber-950/60 via-yellow-950/40 to-amber-950/60 p-6 rounded-3xl border-2 border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.5)] flex flex-col items-center gap-3 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-2">
          <span className="text-4xl">{champion.avatar}</span>
          <h3 className="text-3xl font-black text-amber-300">{champion.name}</h3>
        </div>

        <UnifiedBattery value={Math.min(100, Math.round(champion.totalScore / 5))} size="md" />

        <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-amber-500/30 mt-1">
          <span className="text-xs text-slate-400">總得分：</span>
          <strong className="text-xl font-black text-emerald-400 ml-1">{champion.totalScore} 分</strong>
        </div>
      </motion.div>

      {/* Full Leaderboard List */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-left pl-1">
          📊 派對玩家總排名 (Leaderboard)
        </h4>

        {sortedFinalPlayers.map((p, idx) => {
          const rankBadge = idx === 0 ? '👑 冠軍' : idx === 1 ? '🥈 亞軍' : idx === 2 ? '🥉 季軍' : `#${idx + 1}`;
          const avgScore = Math.min(100, Math.round(p.totalScore / 5));

          return (
            <div
              key={p.id}
              className={`p-3.5 rounded-2xl border flex items-center justify-between px-4 transition-all ${
                idx === 0
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-md'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  {rankBadge}
                </span>
                <span className="text-2xl">{p.avatar}</span>
                <div className="text-left">
                  <span className="font-bold text-sm text-white block">{p.name}</span>
                  <span className="text-[11px] text-slate-400">平均精準度 {avgScore}%</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UnifiedBattery value={avgScore} size="sm" />
                <span className="font-black text-emerald-400 text-base min-w-[55px] text-right">{p.totalScore} 分</span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setSetupStep(true)}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer border border-cyan-400/30"
      >
        <RotateCcw className="w-5 h-5" />
        <span>重新開一局派對</span>
      </button>
    </motion.div>
  );
};
