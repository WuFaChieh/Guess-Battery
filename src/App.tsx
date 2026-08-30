import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameMode, Question } from './types/game';
import { INITIAL_QUESTIONS } from './data/questions';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { SplashLoader } from './components/SplashLoader';
import { StartCover } from './components/StartCover';
import { LoadingState } from './components/LoadingState';
import { getVolume, startBgm, unlockAudioContext } from './utils/audio';

// Each mode is its own chunk — only the one the player actually picks gets
// downloaded. This keeps heavy, mode-specific dependencies (Supabase
// Realtime + matchmaking for PK, framer-motion for Party/PK) out of the
// initial bundle for players who only ever touch single-player.
const SinglePlayerGame = lazy(() => import('./components/SinglePlayerGame').then((m) => ({ default: m.SinglePlayerGame })));
const PartyModeGame = lazy(() => import('./components/PartyModeGame').then((m) => ({ default: m.PartyModeGame })));
const MutualPkGame = lazy(() => import('./components/MutualPkGame').then((m) => ({ default: m.MutualPkGame })));
const CustomCreator = lazy(() => import('./components/CustomCreator').then((m) => ({ default: m.CustomCreator })));

export function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<GameMode>('single_5');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [gameSessionId, setGameSessionId] = useState<number>(Date.now());
  const [volume, setVolumeState] = useState<number>(1);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);

  const handlePressStart = () => {
    unlockAudioContext();
    if (getVolume() > 0) {
      startBgm();
    }
    setHasStarted(true);
  };

  const handleSelectMode = (mode: GameMode) => {
    setCurrentMode(mode);
    if (mode === 'single_5') {
      setActiveCategory('all');
      setGameSessionId(Date.now());
    }
  };

  const handlePlayCustomDeck = () => {
    setActiveCategory('custom');
    setGameSessionId(Date.now());
    setCurrentMode('single_5');
  };

  // Load custom questions & initialize ambient BGM
  useEffect(() => {
    setVolumeState(getVolume());
    try {
      const saved = localStorage.getItem('guess_battery_custom_questions');
      if (saved) {
        setCustomQuestions(JSON.parse(saved));
      }
    } catch {
      console.debug('Failed to load custom questions');
    }

    const handleFirstTouch = () => {
      unlockAudioContext();
      if (getVolume() > 0) {
        startBgm();
      }
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };

    window.addEventListener('pointerdown', handleFirstTouch);
    window.addEventListener('touchstart', handleFirstTouch);
    window.addEventListener('click', handleFirstTouch);

    return () => {
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
  }, []);

  // Save custom questions to localStorage
  const saveCustomQuestions = (questions: Question[]) => {
    setCustomQuestions(questions);
    try {
      localStorage.setItem('guess_battery_custom_questions', JSON.stringify(questions));
    } catch {
      console.debug('Failed to save custom questions');
    }
  };

  const handleAddCustomQuestion = (newQ: Question) => {
    const updated = [newQ, ...customQuestions];
    saveCustomQuestions(updated);
  };

  const handleDeleteCustomQuestion = (id: string) => {
    const updated = customQuestions.filter((q) => q.id !== id);
    saveCustomQuestions(updated);
  };

  const handleImportCustomDeck = (questions: Question[]) => {
    const updated = [...questions, ...customQuestions];
    saveCustomQuestions(updated);
  };

  // Combine default questions with custom questions
  const allAvailableQuestions = [...customQuestions, ...INITIAL_QUESTIONS];

  // Splash -> start cover -> game shell are three entirely different
  // component subtrees, not one component whose props change — so without an
  // AnimatePresence wrapping the switch itself, React just unmounts one and
  // mounts the next in the same tick, and any `exit` animation declared
  // inside the outgoing component (e.g. SplashLoader's own fade-out) never
  // gets a chance to run: by the time framer-motion would animate it out,
  // its whole tree is already gone. Keying each stage and wrapping the
  // switch itself in AnimatePresence is what actually lets that exit play.
  return (
    <AnimatePresence mode="wait">
      {showSplash && <SplashLoader key="splash" onComplete={() => setShowSplash(false)} />}

      {!showSplash && !hasStarted && <StartCover key="cover" onStartGame={handlePressStart} />}

      {!showSplash && hasStarted && (
        <motion.div
          key="shell"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 pb-20"
        >
          {/* Top Header Navbar */}
          <Navbar
            currentMode={currentMode}
            onSelectMode={handleSelectMode}
            volume={volume}
            onVolumeChange={setVolumeState}
          />

          {/* Main Game Container */}
          <main className="flex-1 max-w-md w-full mx-auto px-4 py-3 flex flex-col items-center justify-center">
            <Suspense fallback={<LoadingState />}>
              {/* Keyed by mode so switching tabs always fades the new mode's
                  content in, instead of it just snapping into place —
                  matters most for a mode whose chunk is already cached (no
                  Suspense fallback shown at all otherwise). */}
              <motion.div
                key={currentMode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full flex flex-col items-center"
              >
                {currentMode === 'single_5' && (
                  <SinglePlayerGame
                    key={`${activeCategory}_${gameSessionId}`}
                    allQuestions={allAvailableQuestions}
                    questionCount={5}
                    gameModeName={activeCategory === 'custom' ? '自訂題庫試玩' : '經典速刷'}
                    initialCategory={activeCategory}
                  />
                )}

                {currentMode === 'mutual_pk' && (
                  <MutualPkGame onGoToSinglePlayer={() => handleSelectMode('single_5')} />
                )}

                {currentMode === 'party' && (
                  <PartyModeGame allQuestions={allAvailableQuestions} />
                )}

                {currentMode === 'custom' && (
                  <CustomCreator
                    customQuestions={customQuestions}
                    onAddQuestion={handleAddCustomQuestion}
                    onDeleteQuestion={handleDeleteCustomQuestion}
                    onImportDeck={handleImportCustomDeck}
                    onPlayCustom={handlePlayCustomDeck}
                  />
                )}
              </motion.div>
            </Suspense>
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-500 mb-12">
            <p className="font-semibold text-slate-400">猜電量 Guess the Battery — 萬物皆有電量，你猜得準嗎？</p>
            <p className="mt-1 text-slate-500 flex flex-wrap items-center justify-center gap-2">
              <span>無卡牌 · 無機制 · 只有荒謬直覺與爆笑揭曉</span>
              <span className="hidden sm:inline">|</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                遊戲作者：<strong className="text-emerald-400 font-bold">冷月仙</strong>
              </span>
            </p>
          </footer>

          {/* Fixed Bottom Navigation Bar matching design mockup */}
          <BottomNav currentMode={currentMode} onSelectMode={handleSelectMode} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
