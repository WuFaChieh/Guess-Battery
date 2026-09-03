import React from 'react';
import { Flame, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { getDailyStreak, hasPlayedToday } from '../utils/dailyStreak';
import { useLanguage } from '../i18n/LanguageContext';

interface DailyChallengeBannerProps {
  onOpen: () => void;
}

// The single_5 home screen's entry point into the Daily Challenge — the
// "come back tomorrow" hook needs to be seen without digging into a menu,
// the way Wordle/Duolingo put today's puzzle front and center rather than
// treating it as just another nav item.
export const DailyChallengeBanner: React.FC<DailyChallengeBannerProps> = ({ onOpen }) => {
  const streak = getDailyStreak();
  const playedToday = hasPlayedToday();
  const { t } = useLanguage();

  return (
    <button
      onClick={onOpen}
      className={`w-full max-w-md mx-auto mb-3 p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all cursor-pointer text-left ${
        playedToday
          ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          : 'bg-gradient-to-r from-purple-500/15 to-indigo-500/15 border-purple-500/40 hover:border-purple-500/60'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`shrink-0 p-2 rounded-xl ${playedToday ? 'bg-slate-800 text-slate-400' : 'bg-purple-500/20 text-purple-300'}`}>
          {playedToday ? <CheckCircle2 className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
        </div>
        <div className="min-w-0">
          <p className={`text-xs sm:text-sm font-bold truncate ${playedToday ? 'text-slate-300' : 'text-purple-200'}`}>
            {playedToday ? t('dailybanner_done') : t('dailybanner_not_done')}
          </p>
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            {streak.currentStreak > 0 && (
              <span className="inline-flex items-center gap-0.5 text-orange-400 font-bold">
                <Flame className="w-3 h-3" /> {t('dailybanner_streak', { n: streak.currentStreak })}
              </span>
            )}
            <span>{playedToday ? t('dailybanner_come_back') : t('dailybanner_daily_info')}</span>
          </p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
    </button>
  );
};
