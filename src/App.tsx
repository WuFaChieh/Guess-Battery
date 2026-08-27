import { useState, useEffect } from 'react';
import { GameMode, Question } from './types/game';
import { INITIAL_QUESTIONS } from './data/questions';
import { Navbar } from './components/Navbar';
import { SinglePlayerGame } from './components/SinglePlayerGame';
import { PartyModeGame } from './components/PartyModeGame';
import { MutualPkGame } from './components/MutualPkGame';
import { CustomCreator } from './components/CustomCreator';
import { isSoundEnabled } from './utils/audio';

export function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('single_5');
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Navbar */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
      />

      {/* Main Game Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 flex flex-col items-center justify-center">
        {currentMode === 'single_5' && (
          <SinglePlayerGame
            allQuestions={allAvailableQuestions}
            questionCount={5}
            gameModeName="經典速刷 MVP"
          />
        )}

        {currentMode === 'mutual_pk' && (
          <MutualPkGame onGoToSinglePlayer={() => setCurrentMode('single_5')} />
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
            onPlayCustom={() => setCurrentMode('single_5')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-600">
        <p>⚡ 猜電量 Guess the Battery — 萬物皆有電量，你猜得準嗎？</p>
        <p className="mt-1 opacity-60">無卡牌 · 無機制 · 只有荒謬直覺與爆笑揭曉</p>
      </footer>
    </div>
  );
}

export default App;
