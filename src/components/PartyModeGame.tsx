import React, { useState } from 'react';
import { Question, Player } from '../types/game';
import { QuestionCard } from './QuestionCard';
import { BatteryGauge } from './BatteryGauge';
import { SliderInput } from './SliderInput';
import { calculateScore } from '../utils/gameLogic';
import { playRevealSound, playScoreSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Users, Crown, EyeOff, ArrowRight, RotateCcw } from 'lucide-react';

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
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
      setGameState('finished');
    }
  };

  // Render Setup Screen
  if (setupStep) {
    return (
      <div className="w-full max-w-lg mx-auto bg-slate-900/90 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-6">
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
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-lg shadow-lg shadow-cyan-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-2"
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
      <div className="w-full flex flex-col items-center">
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
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-base transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
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
      <div className="w-full max-w-2xl mx-auto bg-slate-900/95 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-6 text-center">
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
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-lg shadow-lg shadow-cyan-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
        >
          <span>{questionIndex === questions.length - 1 ? '🏆 派對總冠軍統計' : '進入下一題 ➡️'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // Render Final Party Champion Leaderboard
  const sortedFinalPlayers = [...players].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900/95 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-6 text-center">
      <div className="inline-flex p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-400 self-center text-4xl">
        👑
      </div>
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight">派對總冠軍登場！</h2>
        <p className="text-xs text-slate-400 mt-1">經歷了 5 題荒謬電量大考驗</p>
      </div>

      {/* Champion Highlight Card */}
      <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 p-6 rounded-2xl border border-amber-500/40">
        <Crown className="w-10 h-10 text-amber-400 mx-auto mb-2 animate-bounce" />
        <span className="text-4xl block mb-1">{sortedFinalPlayers[0].avatar}</span>
        <h3 className="text-2xl font-black text-amber-300">{sortedFinalPlayers[0].name}</h3>
        <p className="text-sm font-bold text-white mt-1">
          總得分：{sortedFinalPlayers[0].totalScore} 分！
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="flex flex-col gap-2">
        {sortedFinalPlayers.map((p, idx) => (
          <div
            key={p.id}
            className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between px-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-black text-slate-500 text-sm">#{idx + 1}</span>
              <span className="text-xl">{p.avatar}</span>
              <span className="font-bold text-sm text-white">{p.name}</span>
            </div>
            <span className="font-black text-emerald-400 text-base">{p.totalScore} 分</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSetupStep(true)}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-base shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        <span>重新開一局派對</span>
      </button>
    </div>
  );
};
