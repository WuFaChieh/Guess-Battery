import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Swords, Smartphone, Send, RotateCcw, Zap, Sparkles, CheckCircle2, ArrowRight, Flame, Crown, Globe, Share2, Check } from 'lucide-react';
import { Question } from '../types/game';
import { HUMAN_BOT_QUESTIONS } from '../utils/humanAiDeck';
import { getBotGuess, BotDifficulty, PlayerProfile } from '../utils/aiBots';
import { startMatchmaking, MatchRoomData } from '../utils/matchmaking';
import { getDeviceBattery, DeviceBatteryInfo } from '../utils/deviceBattery';
import { calculateScore } from '../utils/gameLogic';
import { UnifiedBattery } from './UnifiedBattery';
import { SliderInput } from './SliderInput';
import { playChargingSound, playTickSound, playMatchFoundSound, playQuestionSubmitSound, playVictoryFanfareSound, playDefeatSound } from '../utils/audio';
import { shareResult } from '../utils/share';
import confetti from 'canvas-confetti';

type PkStage = 'lobby' | 'matching' | 'matched' | 'creating' | 'guessing_opponent_q' | 'opponent_guessing' | 'revealing' | 'revealed';

interface MutualPkGameProps {
  onGoToSinglePlayer?: () => void;
}

// The resolved opponent for this match, whether a real player found via
// Supabase matchmaking or the local bot fallback (see utils/matchmaking.ts).
interface PkOpponent extends PlayerProfile {
  isBot: boolean;
  botDifficulty?: BotDifficulty;
}

// Stable per-browser guest identity for the matchmaking queue, persisted in
// localStorage (mirrors the pattern CustomCreator.tsx uses for submission
// ids) so re-rendering mid-search doesn't spawn a new identity each time.
function getOrCreateGuestId(): string {
  try {
    const existing = localStorage.getItem('guess_battery_guest_id');
    if (existing) return existing;
    const fresh = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem('guess_battery_guest_id', fresh);
    return fresh;
  } catch {
    return `guest_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }
}

function getOrCreateGuestName(): string {
  try {
    const existing = localStorage.getItem('guess_battery_guest_name');
    if (existing) return existing;
    const fresh = `玩家${Math.floor(1000 + Math.random() * 9000)}`;
    localStorage.setItem('guess_battery_guest_name', fresh);
    return fresh;
  } catch {
    return `玩家${Math.floor(1000 + Math.random() * 9000)}`;
  }
}

export const MutualPkGame: React.FC<MutualPkGameProps> = () => {
  const [stage, setStage] = useState<PkStage>('lobby');

  // Player Profile
  const playerAvatar = '😎';

  // Opponent Profile (real Supabase-matched player OR bot fallback — see
  // handleMatched below; "Stealth" in the sense that a bot match still looks
  // 100% like a real player in the UI).
  const [opponent, setOpponent] = useState<PkOpponent | null>(null);
  const [opponentReady, setOpponentReady] = useState(false);

  // Stable guest identity used to join the matchmaking queue.
  const guestIdRef = useRef(getOrCreateGuestId());
  const guestNameRef = useRef(getOrCreateGuestName());

  // Cancel handle for an in-flight startMatchmaking() search (clears its 8s
  // timer + Realtime subscription). Null once a match has been found.
  const matchCancelRef = useRef<(() => void) | null>(null);

  // Parallel 7-second timer tracking
  const actionStartTimeRef = useRef<number>(0);

  // Track every pending timeout/interval so they can be cleared on unmount
  // (this component schedules several chained timers for matchmaking,
  // question pacing and the charging ceremony animation).
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scheduleTimeout = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  // Clear all pending timers on unmount to prevent memory leaks / setting
  // state on an unmounted component.
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Cancel any in-flight matchmaking search on unmount, so navigating away
  // from PK mode mid-search never leaves an orphaned Supabase subscription
  // or timeout running in the background.
  useEffect(() => {
    return () => {
      matchCancelRef.current?.();
      matchCancelRef.current = null;
    };
  }, []);

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

  // Simultaneous Charging Animation States
  const [animatedPlayerBattery, setAnimatedPlayerBattery] = useState(0);
  const [animatedOpponentBattery, setAnimatedOpponentBattery] = useState(0);
  const [isChargingFinished, setIsChargingFinished] = useState(false);
  const [shareState, setShareState] = useState<'idle' | 'shared' | 'copied'>('idle');

  // Fetch real device battery
  useEffect(() => {
    getDeviceBattery().then((info: DeviceBatteryInfo) => {
      if (info && info.level !== undefined) {
        setDeviceBattery(info.level);
        setPlayerOfficialBattery(info.level);
      }
    });
  }, []);

  // Called once startMatchmaking() resolves — either a real player found via
  // Supabase Realtime, or the local bot fallback after the 8s timeout.
  const handleMatched = (roomData: MatchRoomData) => {
    matchCancelRef.current = null; // the search is over — nothing left to cancel

    setOpponent({
      ...roomData.opponent,
      isBot: roomData.isBot,
      botDifficulty: roomData.botDifficulty
    });

    // Select the question the opponent challenges the player with. Real
    // human matches don't exchange a live question over Realtime yet (that's
    // a separate sync protocol on top of matchmaking.ts's opponent
    // discovery), so both bot and human matches currently draw from the same
    // human-style question deck.
    const qTemplate = HUMAN_BOT_QUESTIONS[Math.floor(Math.random() * HUMAN_BOT_QUESTIONS.length)];
    setOpponentQuestion({
      id: `opp_q_${Date.now()}`,
      title: qTemplate.title,
      officialBattery: qTemplate.battery,
      explanation: qTemplate.exp,
      category: 'custom',
      emoji: roomData.opponent.avatar
    });

    setStage('matched');
    playMatchFoundSound(); // ⚔️ Aggressive high-energy match sound!

    // Transition to creating stage after 1.5s razor-sharp match celebration
    scheduleTimeout(() => {
      setStage('creating');
      actionStartTimeRef.current = Date.now(); // Record start time for parallel 7s timer

      // Opponent completes question in ~7 seconds
      scheduleTimeout(() => {
        setOpponentReady(true);
      }, 7000);
    }, 1500);
  };

  // Matchmaking: join the Supabase queue and wait (up to 8s) for a real
  // opponent via Realtime, automatically falling back to a bot if nobody
  // shows up in time (see utils/matchmaking.ts).
  const handleStartMatchmaking = () => {
    setStage('matching');
    setOpponentReady(false);
    setIsChargingFinished(false);

    // Guard against a stray double-invocation leaving two searches running.
    matchCancelRef.current?.();
    matchCancelRef.current = startMatchmaking(guestIdRef.current, guestNameRef.current, handleMatched);
  };

  // Confirm Player's Question & proceed to guess opponent's question
  const handleConfirmQuestion = () => {
    if (!playerTitle.trim()) {
      alert('請輸入考對手的題目名稱！');
      return;
    }
    playQuestionSubmitSound(); // 🚀 Satisfying pitch-sweep whoosh sound!
    setStage('guessing_opponent_q');
  };

  // Run Simultaneous Side-by-Side Charging Ceremony. Memoized (and defined
  // before handleSubmitPlayerGuess, which composes it below) so its identity
  // only changes when the values it actually reads change — not on every
  // render — letting handleSubmitPlayerGuess stay referentially stable too.
  const runSimultaneousChargingCeremony = useCallback(() => {
    if (!opponentQuestion || !opponent) return;

    // Calculate Final Gap & Scores
    const pGap = Math.abs(playerGuess - opponentQuestion.officialBattery);
    const pScore = calculateScore(playerGuess, opponentQuestion.officialBattery).score;
    setPlayerGap(pGap);
    setPlayerScore(pScore);

    // Real matched-human gameplay sync isn't implemented yet (see
    // handleMatched above), so both bot and human opponents currently share
    // this simulated guess; bots use their assigned difficulty's error margin.
    const oGuess = getBotGuess(playerOfficialBattery, opponent.botDifficulty ?? 'medium');
    const oGap = Math.abs(oGuess - playerOfficialBattery);
    const oScore = calculateScore(oGuess, playerOfficialBattery).score;
    setOpponentGuess(oGuess);
    setOpponentGap(oGap);
    setOpponentScore(oScore);

    const targetPlayerCharge = Math.max(0, 100 - pGap);
    const targetOpponentCharge = Math.max(0, 100 - oGap);

    let currentP = 0;
    let currentO = 0;

    // Both batteries charge SIMULTANEOUSLY side by side
    if (intervalRef.current) clearInterval(intervalRef.current);
    const interval = setInterval(() => {
      let stepDone = true;

      if (currentP < targetPlayerCharge) {
        currentP += 2;
        if (currentP > targetPlayerCharge) currentP = targetPlayerCharge;
        setAnimatedPlayerBattery(currentP);
        stepDone = false;
      }

      if (currentO < targetOpponentCharge) {
        currentO += 2;
        if (currentO > targetOpponentCharge) currentO = targetOpponentCharge;
        setAnimatedOpponentBattery(currentO);
        stepDone = false;
      }

      if (currentP % 8 === 0 || currentO % 8 === 0) {
        playChargingSound(Math.max(currentP, currentO));
      }

      if (stepDone) {
        clearInterval(interval);
        intervalRef.current = null;

        // Smooth Pop-Out & Winner Fanfare
        scheduleTimeout(() => {
          setIsChargingFinished(true);
          setStage('revealed');

          if (pScore >= oScore) {
            playVictoryFanfareSound(); // 👑 Triumphant 5-note fanfare sound!
            confetti({ particleCount: 160, spread: 90, origin: { y: 0.4 } });
          } else {
            playDefeatSound(); // ⚡ Minor chord defeat sound
          }
        }, 300);
      }
    }, 35);
    intervalRef.current = interval;
  }, [opponentQuestion, opponent, playerGuess, playerOfficialBattery, scheduleTimeout]);

  // Submit Player's Guess & trigger parallel 7-second suspense. Memoized so
  // SliderInput's onSubmit prop stays referentially stable across re-renders
  // that don't actually change what this needs to do.
  const handleSubmitPlayerGuess = useCallback(() => {
    playQuestionSubmitSound(); // 🚀 Satisfying pitch-sweep whoosh sound!
    setStage('opponent_guessing');

    // Ensure parallel total time reaches at least ~7 seconds
    const elapsed = Date.now() - actionStartTimeRef.current;
    const remainingDelay = Math.max(1500, 7000 - (elapsed % 7000));

    scheduleTimeout(() => {
      setStage('revealing');
      runSimultaneousChargingCeremony();
    }, remainingDelay);
  }, [scheduleTimeout, runSimultaneousChargingCeremony]);

  const resetGame = () => {
    matchCancelRef.current?.();
    matchCancelRef.current = null;
    setStage('lobby');
    setPlayerTitle('');
    setPlayerOfficialBattery(deviceBattery || 50);
    setPlayerGuess(50);
    setOpponent(null);
    setOpponentQuestion(null);
    setAnimatedPlayerBattery(0);
    setAnimatedOpponentBattery(0);
    setIsChargingFinished(false);
    setOpponentReady(false);
  };

  const isPlayerWinner = playerScore >= opponentScore;

  const handleShareResult = async () => {
    if (!opponent) return;
    const shareText = `⚔️【猜電量 Guess the Battery】1v1 PK 對決\n我${isPlayerWinner ? '獲勝了' : '惜敗了'}！得分 ${playerScore} 分（差距 ${playerGap}%）vs 對手 ${opponent.name} ${opponentScore} 分！\n\n「萬物皆有電量，你猜得準嗎？」快來挑戰你的直覺！`;
    const outcome = await shareResult(shareText);
    if (outcome === 'unavailable') return;
    setShareState(outcome);
    setTimeout(() => setShareState('idle'), 2500);
  };

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
              即時搜尋線上玩家對決！雙方互相編寫一道題目考對方，儀式感揭曉一戰定勝負！
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
            <div className="w-20 h-20 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center shadow-2xl z-10">
              <Swords className="w-8 h-8 text-rose-400" />
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

      {/* STAGE 3: AGGRESSIVE HIGH-ENERGY MATCHED CELEBRATION */}
      {stage === 'matched' && opponent && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-5 py-6 w-full relative overflow-hidden"
        >
          {/* Crimson Electric Aura Burst */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 via-purple-600/30 to-indigo-600/20 blur-2xl pointer-events-none animate-pulse" />

          {/* Sharp Battle Badge */}
          <motion.span
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-xs font-black text-rose-300 bg-rose-950/90 px-4 py-1.5 rounded-full border border-rose-500/50 uppercase tracking-widest inline-flex items-center gap-1.5 shadow-[0_0_20px_rgba(244,63,94,0.6)] z-10"
          >
            <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
            <span>電量生死對決 · 即時配對成功！</span>
          </motion.span>

          {/* Crossed Blades Metallic Slash Animation */}
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="p-3 bg-rose-500/20 rounded-2xl border-2 border-rose-500 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.8)] z-10"
          >
            <Swords className="w-10 h-10" />
          </motion.div>

          {/* Player vs Opponent Slam Intro */}
          <div className="flex items-center justify-center gap-6 my-2 z-10 w-full">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              className="flex flex-col items-center gap-1.5 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl min-w-[90px]"
            >
              <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{playerAvatar}</span>
              <span className="text-xs font-black text-white">你</span>
            </motion.div>

            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 italic drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]"
            >
              VS
            </motion.span>

            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              className="flex flex-col items-center gap-1.5 p-3 bg-slate-950/80 rounded-2xl border border-rose-500/50 shadow-xl min-w-[90px]"
            >
              <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]">{opponent.avatar}</span>
              <span className="text-xs font-black text-rose-400">{opponent.name}</span>
              {/* Bot vs. real opponent must look identical here — opponent.isBot
                  is used elsewhere for internal pacing/difficulty only and
                  should never surface a "this is a bot" tell in the UI. */}
              <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                <Globe className="w-2.5 h-2.5" /> 配對成功
              </span>
            </motion.div>
          </div>

          <p className="text-xs text-slate-400 font-bold animate-pulse z-10">準備進入互相出題對決...</p>
        </motion.div>
      )}

      {/* STAGE 4: CREATING QUESTION */}
      {stage === 'creating' && opponent && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 w-full text-left">
          {/* Opponent Thinking & Typing Bar */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{opponent.avatar}</span>
              <div>
                <h4 className="text-xs font-bold text-white">對手：{opponent.name}</h4>
                {!opponentReady ? (
                  <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    對手正在認真思考並撰寫題目中...
                  </span>
                ) : (
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    對手已完成題目輸入！
                  </span>
                )}
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
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-lg hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>出題完畢！開始猜對手電量</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STAGE 4.5: GUESSING OPPONENT'S QUESTION */}
      {stage === 'guessing_opponent_q' && opponentQuestion && opponent && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4 w-full">
          <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/30 w-full text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{opponent.avatar}</span>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                第二步：請猜 {opponent.name} 出的題目電量 %
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">{opponentQuestion.title}</h3>
          </div>

          <UnifiedBattery value={playerGuess} size="lg" label="你估算的對手電量" />

          <SliderInput
            value={playerGuess}
            onChange={setPlayerGuess}
            onSubmit={handleSubmitPlayerGuess}
          />
        </motion.div>
      )}

      {/* STAGE 5: OPPONENT GUESSING SUSPENSE */}
      {stage === 'opponent_guessing' && opponentQuestion && opponent && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-5 w-full py-6">
          <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/30 w-full text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{opponent.avatar}</span>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                {opponent.name} 出的題目：
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">{opponentQuestion.title}</h3>
          </div>

          <UnifiedBattery value={playerGuess} size="lg" label="你估算的答案電量" />

          <div className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>{opponent.name} 正在連線計算題目電量中...</span>
            </div>
            <p className="text-[11px] text-slate-500">
              雙方估算完成，即將一同累計揭曉對決成績！
            </p>
          </div>
        </motion.div>
      )}

      {/* STAGE 6: SIMULTANEOUS REVEAL & WINNER SMOOTH POP-OUT */}
      {(stage === 'revealing' || stage === 'revealed') && opponentQuestion && opponent && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-5 w-full relative">

          {/* Title Banner */}
          <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-rose-500/40 text-center relative z-20">
            {!isChargingFinished ? (
              <p className="text-xs font-bold text-amber-400 animate-pulse flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                雙方電池一同電量累計中...
              </p>
            ) : (
              <>
                <div className="flex justify-center mb-1">
                  {isPlayerWinner ? <Crown className="w-8 h-8 text-amber-400" /> : <Zap className="w-8 h-8 text-slate-500" />}
                </div>
                <h3 className="text-2xl font-black text-white">
                  {isPlayerWinner ? '一戰成名 · 猜電量獲勝！' : '一戰結束 · 殘念惜敗！'}
                </h3>
                <p className="text-xs text-amber-400 font-bold mt-1 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  差距最小者勝出！
                </p>
              </>
            )}
          </div>

          {/* DUAL BATTERY COMPARISON - SIMULTANEOUS CHARGING & WINNER SMOOTH POP-OUT */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full items-center justify-center my-2 relative z-20">
            {/* Player's Battery Card */}
            <motion.div
              initial={{ scale: 1, y: 0 }}
              animate={
                isChargingFinished
                  ? isPlayerWinner
                    ? { scale: 1.18, y: -10, zIndex: 30 }
                    : { scale: 0.88, y: 4, opacity: 0.7 }
                  : { scale: 1, y: 0 }
              }
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 relative overflow-hidden ${
                isChargingFinished && isPlayerWinner
                  ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.7)]'
                  : 'bg-emerald-950/30 border-emerald-500/40 opacity-100'
              }`}
            >
              <div className="flex items-center gap-1.5 font-black text-xs">
                <span className="text-xl">{playerAvatar}</span>
                <span className="text-white">你</span>
                {isChargingFinished && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-0.5 ${isPlayerWinner ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-400'}`}>
                    {isPlayerWinner && <Crown className="w-2.5 h-2.5" />}
                    {isPlayerWinner ? '獲勝' : '敗北'}
                  </span>
                )}
              </div>

              <UnifiedBattery
                value={animatedPlayerBattery}
                size="sm"
              />

              <div className="text-[11px] font-bold text-slate-300 flex flex-col gap-0.5 text-center">
                <span>得分：<strong className="text-emerald-400 text-sm">{playerScore}</strong> 分</span>
                <span className="text-slate-400 text-[10px]">你猜 <strong className="text-white">{playerGuess}%</strong> (差距 {playerGap}%)</span>
              </div>
            </motion.div>

            {/* Opponent's Battery Card */}
            <motion.div
              initial={{ scale: 1, y: 0 }}
              animate={
                isChargingFinished
                  ? !isPlayerWinner
                    ? { scale: 1.18, y: -10, zIndex: 30 }
                    : { scale: 0.88, y: 4, opacity: 0.7 }
                  : { scale: 1, y: 0 }
              }
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 relative overflow-hidden ${
                isChargingFinished && !isPlayerWinner
                  ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.7)]'
                  : 'bg-rose-950/30 border-rose-500/40 opacity-100'
              }`}
            >
              <div className="flex items-center gap-1.5 font-black text-xs">
                <span className="text-xl">{opponent.avatar}</span>
                <span className="text-white">{opponent.name}</span>
                {isChargingFinished && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-0.5 ${!isPlayerWinner ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-400'}`}>
                    {!isPlayerWinner && <Crown className="w-2.5 h-2.5" />}
                    {!isPlayerWinner ? '獲勝' : '敗北'}
                  </span>
                )}
              </div>

              <UnifiedBattery
                value={animatedOpponentBattery}
                size="sm"
              />

              <div className="text-[11px] font-bold text-slate-300 flex flex-col gap-0.5 text-center">
                <span>得分：<strong className="text-rose-400 text-sm">{opponentScore}</strong> 分</span>
                <span className="text-slate-400 text-[10px]">對手猜 <strong className="text-white">{opponentGuess}%</strong> (差距 {opponentGap}%)</span>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          {stage === 'revealed' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full relative z-20">
              <button
                onClick={handleShareResult}
                className="py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
              >
                {shareState !== 'idle' ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-300" />}
                <span>{shareState === 'copied' ? '已複製到剪貼簿！' : shareState === 'shared' ? '已開啟分享！' : '分享對戰結果'}</span>
              </button>

              <button
                onClick={resetGame}
                className="py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-black text-sm shadow-xl shadow-purple-950/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-violet-400/30"
              >
                <RotateCcw className="w-4 h-4" />
                <span>再配對對決一局！</span>
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
