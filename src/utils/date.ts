// Shared "what day is it" helper for the Daily Challenge and its streak
// (gameLogic.ts's getDailySeed/getDailyQuestions, dailyStreak.ts's
// recordDailyCompletion/hasPlayedToday, DailyGame.tsx). Deliberately keyed
// to the player's *local* calendar date, not UTC — new Date().toISOString()
// is UTC-anchored, so a player east of UTC (Taiwan, UTC+8, included) would
// otherwise see today's puzzle/streak roll over at their local morning
// hours instead of at their own midnight. See CLAUDE.md's Daily Challenge
// section for the history here.
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
