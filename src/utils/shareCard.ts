// Renders a branded, square (1080x1080 — safe across Threads/IG/X/FB without
// awkward cropping) "result card" PNG for the share buttons in GameOverModal /
// DailyGame / PartyModeGame / MutualPkGame. Threads is an image-first feed —
// a plain-text post reaches far fewer people than one with a card attached —
// so every share button generates one of these to go out alongside its text.
//
// Pure Canvas 2D, no dependency: drawn entirely with shapes/gradients/text so
// it works the same in the web build and the native iOS WKWebView. Never
// throws outward — `renderShareCardImage` catches internally and returns
// `null` on any failure, so a rendering hiccup on some odd runtime silently
// falls back to the pre-existing text-only share instead of breaking the
// button. Deliberately synchronous (see that function's own comment) — every
// call site invokes it right before calling shareResult()/navigator.share()
// in the same click handler, with no `await` in between. See
// `src/utils/share.ts` for how the resulting Blob is shared.
//
// A hand-rolled reimplementation of this same layout in plain JS (not TS, no
// bundler) lives in `scripts/og-image/generate.html` and produced the static
// `public/og-image.png` used for the site's Open Graph / Twitter Card preview
// — see that file's header comment before touching either one.

export interface ShareCardChip {
  label: string;
  value: string;
}

export type ShareCardAccent = 'emerald' | 'violet' | 'amber' | 'rose';

export interface ShareCardData {
  /** Small pill line above everything, e.g. the mode name or a date. */
  kicker: string;
  /** The big focal stat, e.g. "94%" or a Wordle-style emoji grid. */
  bigStat: string;
  /** Small caption under the big stat, e.g. "平均精準度". */
  bigStatCaption: string;
  /** Bold colored headline below the stat, e.g. the badge title or a win/lose line. */
  headline: string;
  /** Optional 1-2 line description under the headline. */
  subtitle?: string;
  /** Up to 3 small stat pills at the bottom, e.g. { label: '總分', value: '494' }. */
  chips?: ShareCardChip[];
  accent?: ShareCardAccent;
}

const ACCENTS: Record<ShareCardAccent, { glow: string; text: string; chipBorder: string; chipBg: string }> = {
  emerald: { glow: '16,185,129', text: '#34d399', chipBorder: 'rgba(52,211,153,0.35)', chipBg: 'rgba(16,185,129,0.12)' },
  violet: { glow: '139,92,246', text: '#a78bfa', chipBorder: 'rgba(167,139,250,0.35)', chipBg: 'rgba(139,92,246,0.12)' },
  amber: { glow: '245,158,11', text: '#fbbf24', chipBorder: 'rgba(251,191,36,0.35)', chipBg: 'rgba(245,158,11,0.12)' },
  rose: { glow: '244,63,94', text: '#fb7185', chipBorder: 'rgba(251,113,133,0.35)', chipBg: 'rgba(244,63,94,0.12)' }
};

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Soft radial "glow blob" — approximates the app's `blur-3xl` CSS glows
// without relying on ctx.filter (not reliably supported in every WKWebView).
function drawGlow(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, rgb: string, alpha: number) {
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  grad.addColorStop(0, `rgba(${rgb},${alpha})`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
}

// Greedy line-wrap by grapheme (not word) so it works for both CJK (no
// spaces) and Latin text without a separate code path.
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number): string[] {
  const chars = Array.from(text);
  const lines: string[] = [];
  let current = '';
  for (const ch of chars) {
    const next = current + ch;
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = ch;
      if (lines.length === maxLines - 1) {
        // Last line: append the remainder (ellipsized if still too long) and stop.
        const rest = chars.slice(chars.indexOf(ch)).join('').trimStart();
        let last = rest;
        while (ctx.measureText(last + '…').width > maxWidth && last.length > 1) {
          last = last.slice(0, -1);
        }
        lines.push(last.length < rest.length ? last + '…' : last);
        return lines;
      }
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawShareCard(ctx: CanvasRenderingContext2D, size: number, data: ShareCardData) {
  const accent = ACCENTS[data.accent ?? 'violet'];
  const cx = size / 2;

  // Background — matches the app's slate-950 -> slate-900 shell gradient.
  const bg = ctx.createLinearGradient(0, 0, size, size);
  bg.addColorStop(0, '#020617');
  bg.addColorStop(1, '#0f172a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  drawGlow(ctx, size * 0.85, size * 0.12, size * 0.45, accent.glow, 0.22);
  drawGlow(ctx, size * 0.1, size * 0.92, size * 0.4, '99,102,241', 0.16);

  // Outer card border/frame, echoing the in-app result card's border+shadow.
  roundedRect(ctx, 28, 28, size - 56, size - 56, 40);
  ctx.strokeStyle = 'rgba(148,163,184,0.18)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // App name pill
  const pillText = '🔋 猜電量 · GUESS THE BATTERY';
  ctx.font = '700 26px "Manrope", "Noto Sans TC", system-ui, sans-serif';
  const pillTextWidth = ctx.measureText(pillText).width;
  const pillW = pillTextWidth + 64;
  const pillH = 56;
  const pillY = 110;
  roundedRect(ctx, cx - pillW / 2, pillY - pillH / 2, pillW, pillH, pillH / 2);
  ctx.fillStyle = accent.chipBg;
  ctx.fill();
  ctx.strokeStyle = accent.chipBorder;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = accent.text;
  ctx.fillText(pillText, cx, pillY + 2);

  // Kicker (mode/date)
  ctx.font = '600 30px "Manrope", "Noto Sans TC", system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(data.kicker, cx, pillY + 70);

  // Big stat — the focal number/grid.
  let bigStatFontSize = 168;
  ctx.font = `900 ${bigStatFontSize}px "Manrope", "Noto Sans TC", system-ui, sans-serif`;
  while (ctx.measureText(data.bigStat).width > size - 160 && bigStatFontSize > 72) {
    bigStatFontSize -= 8;
    ctx.font = `900 ${bigStatFontSize}px "Manrope", "Noto Sans TC", system-ui, sans-serif`;
  }
  const bigStatY = pillY + 240;
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = `rgba(${accent.glow},0.45)`;
  ctx.shadowBlur = 40;
  ctx.fillText(data.bigStat, cx, bigStatY);
  ctx.shadowBlur = 0;

  ctx.font = '700 32px "Manrope", "Noto Sans TC", system-ui, sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(data.bigStatCaption, cx, bigStatY + 90);

  // Headline (badge title / result line)
  ctx.font = '800 46px "Manrope", "Noto Sans TC", system-ui, sans-serif';
  const headlineLines = wrapText(ctx, data.headline, size - 180, 2);
  let y = bigStatY + 170;
  ctx.fillStyle = accent.text;
  for (const line of headlineLines) {
    ctx.fillText(line, cx, y);
    y += 58;
  }

  // Subtitle
  if (data.subtitle) {
    ctx.font = '500 30px "Manrope", "Noto Sans TC", system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    const subLines = wrapText(ctx, data.subtitle, size - 220, 2);
    y += 14;
    for (const line of subLines) {
      ctx.fillText(line, cx, y);
      y += 42;
    }
  }

  // Stat chips row
  const chips = (data.chips ?? []).slice(0, 3);
  if (chips.length > 0) {
    const chipY = size - 220;
    ctx.font = '700 28px "Manrope", "Noto Sans TC", system-ui, sans-serif';
    const chipWidths = chips.map((c) => ctx.measureText(`${c.label} ${c.value}`).width + 56);
    const gap = 20;
    const totalW = chipWidths.reduce((a, b) => a + b, 0) + gap * (chips.length - 1);
    let chipX = cx - totalW / 2;
    chips.forEach((chip, i) => {
      const w = chipWidths[i];
      roundedRect(ctx, chipX, chipY - 32, w, 64, 32);
      ctx.fillStyle = accent.chipBg;
      ctx.fill();
      ctx.strokeStyle = accent.chipBorder;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(`${chip.label} `, chipX + w / 2 - ctx.measureText(chip.value).width / 2 - 4, chipY + 2);
      ctx.fillStyle = accent.text;
      ctx.fillText(chip.value, chipX + w / 2 + ctx.measureText(`${chip.label} `).width / 2 - 4, chipY + 2);
      chipX += w + gap;
    });
  }

  // Footer divider + tagline
  ctx.strokeStyle = 'rgba(148,163,184,0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(size * 0.2, size - 120);
  ctx.lineTo(size * 0.8, size - 120);
  ctx.stroke();

  ctx.font = '600 26px "Manrope", "Noto Sans TC", system-ui, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('萬物皆有電量，你猜得準嗎？', cx, size - 76);
  ctx.font = '700 28px "Manrope", "Noto Sans TC", system-ui, sans-serif';
  ctx.fillStyle = accent.text;
  ctx.fillText('guess-battery.vercel.app', cx, size - 40);
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',');
  const mime = /data:(.*?);base64/.exec(header)?.[1] ?? 'image/png';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

/**
 * Renders a share-card PNG for the given data. Returns `null` (never
 * throws) if canvas isn't available or drawing fails for any reason — every
 * call site treats that as "no image" and falls back to a text-only share.
 *
 * Deliberately synchronous (canvas.toDataURL(), not the async toBlob()
 * callback, and no awaiting document.fonts.ready): every call site invokes
 * this directly inside a click handler right before calling
 * navigator.share() with the result. Browsers only honor navigator.share()
 * while still "handling a user gesture" — even a single `await` in between
 * (confirmed against a real click during manual testing: it throws
 * `NotAllowedError: Must be handling a user gesture to perform a share
 * request`) is enough to lose that window, so this can't afford to yield to
 * the event loop at all before the caller gets its Blob back.
 */
export function renderShareCardImage(data: ShareCardData): Blob | null {
  try {
    if (typeof document === 'undefined') return null;
    const size = 1080;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    drawShareCard(ctx, size, data);

    return dataUrlToBlob(canvas.toDataURL('image/png'));
  } catch (e) {
    console.debug('[shareCard] render failed, falling back to text-only share:', e);
    return null;
  }
}
