// Shared "share your result" helper for GameOverModal / PartyModeGame /
// MutualPkGame / DailyGame's result screens.
//
// Text-only path uses @capacitor/share, which transparently does the right
// thing in both environments this app ships to:
//   - Native iOS/Android app (via Capacitor): opens the real native share sheet.
//   - Plain web (Vercel): its web implementation wraps the browser's Web
//     Share API (navigator.share) when available.
// Either way, if no share surface exists at all (e.g. desktop browser
// without Web Share support), we fall back to copying the text to the
// clipboard so the button always does *something* useful.
//
// Image path (`image` param): @capacitor/share's `files` option only takes
// file:// URIs on native and is silently dropped by its own web
// implementation (see node_modules/@capacitor/share/dist/esm/web.js — it
// never reads `options.files`), so a generated result-card Blob can't just
// be handed to `Share.share()` on either target. Instead:
//   - Native: write the Blob to the Filesystem cache dir first (Capacitor
//     plugins need a real on-disk file, not a Blob/data URL) and pass that
//     file:// URI in `files`.
//   - Web: call `navigator.share({ files })` directly, bypassing Capacitor's
//     wrapper — this is what actually attaches an image on mobile web
//     (Threads' own share sheet included, once the OS share sheet opens).
//   - Neither available (desktop browser with no Web Share Level 2 support):
//     trigger a plain file download of the image so the image still reaches
//     the user, alongside the usual text share/clipboard fallback below.
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

export type ShareOutcome = 'shared' | 'copied' | 'downloaded' | 'unavailable';

async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(buffer);
  // Chunked to avoid blowing the call stack on String.fromCharCode(...bytes)
  // for a full-size (1080x1080) PNG.
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function shareNativeWithImage(text: string, image: Blob, opts?: { title?: string; dialogTitle?: string }): Promise<ShareOutcome | null> {
  // Lazily imported: @capacitor/filesystem is only ever touched on the
  // native platform, so the web bundle never needs to pull it in for this
  // branch to exist.
  const { Filesystem, Directory } = await import('@capacitor/filesystem');
  const fileName = `guess-battery-share-${Date.now()}.png`;
  const base64 = await blobToBase64(image);
  const { uri } = await Filesystem.writeFile({ path: fileName, data: base64, directory: Directory.Cache });
  try {
    await Share.share({
      title: opts?.title ?? '猜電量 Guess the Battery',
      text,
      dialogTitle: opts?.dialogTitle ?? '分享你的戰績',
      files: [uri]
    });
    return 'shared';
  } finally {
    // Best-effort cleanup — the share sheet has already handed the OS its
    // own copy/reference by the time `Share.share()` resolves, and a failed
    // delete here (e.g. file already gone) shouldn't affect the outcome
    // reported to the caller.
    Filesystem.deleteFile({ path: fileName, directory: Directory.Cache }).catch(() => {});
  }
}

async function shareWebWithImage(text: string, image: Blob, opts?: { title?: string }): Promise<ShareOutcome | null> {
  if (typeof navigator === 'undefined' || !navigator.share || !navigator.canShare) return null;
  const file = new File([image], 'guess-battery-share.png', { type: 'image/png' });
  if (!navigator.canShare({ files: [file] })) return null;
  await navigator.share({ title: opts?.title ?? '猜電量 Guess the Battery', text, files: [file] });
  return 'shared';
}

function downloadImage(image: Blob) {
  const url = URL.createObjectURL(image);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'guess-battery-share.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Give the download a moment to actually start before revoking the URL.
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Shares `text`, optionally with a result-card `image` attached. Never
 * throws — every failure mode degrades to the next-best option, down to a
 * plain clipboard copy of the text.
 */
export async function shareResult(text: string, opts?: { title?: string; dialogTitle?: string }, image?: Blob | null): Promise<ShareOutcome> {
  let imageDownloaded = false;

  if (image) {
    try {
      const outcome = Capacitor.isNativePlatform()
        ? await shareNativeWithImage(text, image, opts)
        : await shareWebWithImage(text, image, opts);
      if (outcome) return outcome;
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') {
        // User opened the share sheet (with the image attached) and
        // dismissed it themselves — a deliberate choice, not a failure.
        return 'shared';
      }
      console.debug('[share] image share unavailable, falling back:', e);
    }

    // No image-share surface on this platform (typical desktop browser) —
    // hand the user the image directly via a download so it isn't lost,
    // then fall through to the normal text share/clipboard path below.
    if (typeof document !== 'undefined') {
      try {
        downloadImage(image);
        imageDownloaded = true;
      } catch (e) {
        console.debug('[share] image download fallback failed:', e);
      }
    }
  }

  try {
    await Share.share({
      title: opts?.title ?? '猜電量 Guess the Battery',
      text,
      dialogTitle: opts?.dialogTitle ?? '分享你的戰績'
    });
    return imageDownloaded ? 'downloaded' : 'shared';
  } catch (e) {
    // The user opened the share sheet and dismissed it themselves — that's
    // a deliberate choice, not a failure, so don't fall back to silently
    // copying to their clipboard behind their back.
    if ((e as DOMException)?.name === 'AbortError') {
      return imageDownloaded ? 'downloaded' : 'shared';
    }
    console.debug('[share] native/Web Share unavailable, falling back to clipboard:', e);
  }

  try {
    await navigator.clipboard.writeText(text);
    return imageDownloaded ? 'downloaded' : 'copied';
  } catch (clipErr) {
    console.debug('[share] clipboard fallback failed:', clipErr);
    return imageDownloaded ? 'downloaded' : 'unavailable';
  }
}
