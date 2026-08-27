import { useState, useEffect } from 'react';
import { GameMode, Question } from './types/game';
import { INITIAL_QUESTIONS } from './data/questions';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { SinglePlayerGame } from './components/SinglePlayerGame';
import { PartyModeGame } from './components/PartyModeGame';
import { MutualPkGame } from './components/MutualPkGame';
import { CustomCreator } from './components/CustomCreator';
import { isSoundEnabled } from './utils/audio';

export function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('single_5');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [gameSessionId, setGameSessionId] = useState<number>(Date.now());
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);

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

  // Load custom questions from localStorage
  useEffect(() => {
    setSoundOn(isSoundEnabled());
    try {
      const saved = localStorage.getItem('guess_battery_custom_questions');
      if (saved) {
        setCustomQuestions(JSON.parse(saved));
      }
    } catch {
      console.debug('Failed to load custom questions');
    }
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 pb-20">
      {/* Top Header Navbar */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
      />

      {/* Main Game Container */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-3 flex flex-col items-center justify-center">
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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-500 mb-12">
        <p className="font-semibold text-slate-400">⚡ 猜電量 Guess the Battery — 萬物皆有電量，你猜得準嗎？</p>
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
    </div>
  );
}

export default App;
