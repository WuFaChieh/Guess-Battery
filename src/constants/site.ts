// Single source of truth for the game's public web URL — embedded into every
// share text (so a Threads/social post actually links back to the game, not
// just plain text) and into index.html's Open Graph / Twitter Card tags (so
// a shared link unfurls with a title/description/image instead of a bare
// blue link). Update this if the production domain ever changes.
export const SITE_URL = 'https://guess-battery.vercel.app';
