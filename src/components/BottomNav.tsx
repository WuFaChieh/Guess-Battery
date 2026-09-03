import React from 'react';
import { GameMode } from '../types/game';
import { Zap, Trophy, Bookmark, Smile } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface BottomNavProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentMode, onSelectMode }) => {
  const { t } = useLanguage();

  return (
    <nav
      aria-label={t('bottomnav_aria_label')}
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-900 px-4 pt-2 shadow-xl"
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1 items-center text-center">
        {/* Tab 1: 猜電量 */}
        <button
          onClick={() => onSelectMode('single_5')}
          aria-current={currentMode === 'single_5' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentMode === 'single_5'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Zap className={`w-5 h-5 mb-0.5 ${currentMode === 'single_5' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span className="text-[11px]">{t('bottomnav_single')}</span>
        </button>

        {/* Tab 2: 1v1 對決 / 排行榜 */}
        <button
          onClick={() => onSelectMode('mutual_pk')}
          aria-current={currentMode === 'mutual_pk' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentMode === 'mutual_pk'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Trophy className={`w-5 h-5 mb-0.5 ${currentMode === 'mutual_pk' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span className="text-[11px]">{t('bottomnav_pk')}</span>
        </button>

        {/* Tab 3: 同屏派對 */}
        <button
          onClick={() => onSelectMode('party')}
          aria-current={currentMode === 'party' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentMode === 'party'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Bookmark className={`w-5 h-5 mb-0.5 ${currentMode === 'party' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span className="text-[11px]">{t('bottomnav_party')}</span>
        </button>

        {/* Tab 4: 自訂題庫 / 更多 */}
        <button
          onClick={() => onSelectMode('custom')}
          aria-current={currentMode === 'custom' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentMode === 'custom'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Smile className={`w-5 h-5 mb-0.5 ${currentMode === 'custom' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span className="text-[11px]">{t('bottomnav_custom')}</span>
        </button>
      </div>
    </nav>
  );
};
