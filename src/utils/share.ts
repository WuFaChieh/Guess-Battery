// Shared "share your result" helper for GameOverModal / PartyModeGame /
// MutualPkGame's result screens.
//
// Uses @capacitor/share, which transparently does the right thing in both
// environments this app ships to:
//   - Native iOS/Android app (via Capacitor): opens the real native share sheet.
//   - Plain web (Vercel): its web implementation wraps the browser's Web
//     Share API (navigator.share) when available.
// Either way, if no share surface exists at all (e.g. desktop browser
// without Web Share support), we fall back to copying the text to the
// clipboard so the button always does *something* useful.
import { Share } from '@capacitor/share';

export type ShareOutcome = 'shared' | 'copied' | 'unavailable';

export async function shareResult(text: string, opts?: { title?: string }): Promise<ShareOutcome> {
  try {
    await Share.share({
      title: opts?.title ?? '猜電量 Guess the Battery',
      text,
      dialogTitle: '分享你的戰績'
    });
    return 'shared';
  } catch (e) {
    // The user opened the share sheet and dismissed it themselves — that's
    // a deliberate choice, not a failure, so don't fall back to silently
    // copying to their clipboard behind their back.
    if ((e as DOMException)?.name === 'AbortError') {
      return 'shared';
    }
    console.debug('[share] native/Web Share unavailable, falling back to clipboard:', e);
  }

  try {
    await navigator.clipboard.writeText(text);
    return 'copied';
  } catch (clipErr) {
    console.debug('[share] clipboard fallback failed:', clipErr);
    return 'unavailable';
  }
}
