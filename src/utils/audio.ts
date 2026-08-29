// Web Audio API Synthesizer for 100% self-contained retro/party game sound effects & BGM

let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let bgmInterval: number | null = null;
let bgmStep = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function unlockAudioContext(): void {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (!enabled) {
    stopBgm();
  } else {
    startBgm();
  }
}

// ---------------------------------------------------------------------
// 🔧 Shared synth boilerplate
//
// Every effect below used to repeat the same "if disabled, bail; grab the
// context; try/catch around node creation/wiring" dance. `withAudio` folds
// that guard into one place, and `playTone` / `playNoteSequence` fold the
// oscillator+gain creation/wiring/scheduling into one place too, so each
// effect function only needs to describe its own envelope.
// ---------------------------------------------------------------------

// Runs `fn` with a live AudioContext, silently no-op'ing when sound is
// disabled, unsupported, or a node fails to schedule.
function withAudio(fn: (ctx: AudioContext) => void): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    fn(ctx);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

interface ToneOptions {
  type: OscillatorType;
  freq: number;
  /** Extra discrete frequency jumps (setValueAtTime) after the initial freq, e.g. a two-note blip on one oscillator. */
  freqSteps?: { value: number; at: number }[];
  /** Ramp target frequency; ramps from `freq` starting at note time. */
  freqRampTo?: number;
  freqRampDuration?: number;
  freqRampType?: 'exponential' | 'linear';
  gainPeak: number;
  gainFloor?: number;
  gainRampDuration: number;
  gainRampType?: 'exponential' | 'linear';
  /** Time (relative to note start) at which the oscillator stops. */
  stopDuration: number;
  /** Delay (relative to ctx.currentTime) before this note starts — used to stagger notes in a sequence. */
  startTimeOffset?: number;
}

// Schedules a single oscillator+gain "note" with an optional frequency ramp
// and a gain envelope, then connects it to the destination and starts/stops it.
function playTone(ctx: AudioContext, opts: ToneOptions): void {
  const startTime = ctx.currentTime + (opts.startTimeOffset ?? 0);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = opts.type;
  osc.frequency.setValueAtTime(opts.freq, startTime);
  opts.freqSteps?.forEach(({ value, at }) => osc.frequency.setValueAtTime(value, startTime + at));
  if (opts.freqRampTo !== undefined) {
    const rampTime = startTime + (opts.freqRampDuration ?? opts.gainRampDuration);
    if (opts.freqRampType === 'linear') {
      osc.frequency.linearRampToValueAtTime(opts.freqRampTo, rampTime);
    } else {
      osc.frequency.exponentialRampToValueAtTime(opts.freqRampTo, rampTime);
    }
  }

  gain.gain.setValueAtTime(opts.gainPeak, startTime);
  const gainTargetTime = startTime + opts.gainRampDuration;
  if (opts.gainRampType === 'linear') {
    gain.gain.linearRampToValueAtTime(opts.gainFloor ?? 0.01, gainTargetTime);
  } else {
    gain.gain.exponentialRampToValueAtTime(opts.gainFloor ?? 0.001, gainTargetTime);
  }

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + opts.stopDuration);
}

interface NoteSequenceOptions {
  type: OscillatorType;
  notes: number[];
  /** Seconds between successive note starts. */
  noteSpacing: number;
  gainPeak: number;
  gainRampDuration: number;
  stopDuration: number;
  /** When set, each note ramps its frequency up to `freq * freqRampMultiplier`. */
  freqRampMultiplier?: number;
  freqRampDuration?: number;
}

// Plays a staggered sequence of notes (used by the fanfare/victory/defeat
// stingers) by delegating each note to playTone with an increasing start offset.
function playNoteSequence(ctx: AudioContext, opts: NoteSequenceOptions): void {
  opts.notes.forEach((freq, idx) => {
    playTone(ctx, {
      type: opts.type,
      freq,
      freqRampTo: opts.freqRampMultiplier !== undefined ? freq * opts.freqRampMultiplier : undefined,
      freqRampDuration: opts.freqRampDuration,
      gainPeak: opts.gainPeak,
      gainRampDuration: opts.gainRampDuration,
      stopDuration: opts.stopDuration,
      startTimeOffset: idx * opts.noteSpacing
    });
  });
}

// ---------------------------------------------------------------------
// 🎵 Pleasant, Relaxing Chill-Hop BGM Synthesizer (Cmaj7 arpeggio loop)
// ---------------------------------------------------------------------
const BGM_CHORDS = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
  [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
  [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
  [196.00, 246.94, 293.66, 349.23]  // G7 (G3, B3, D4, F4)
];

export function startBgm(): void {
  if (!soundEnabled || bgmInterval !== null) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  bgmStep = 0;

  const playBgmStep = () => {
    if (!soundEnabled) {
      stopBgm();
      return;
    }
    try {
      const chordIndex = Math.floor(bgmStep / 8) % BGM_CHORDS.length;
      const currentChord = BGM_CHORDS[chordIndex];
      const noteFreq = currentChord[bgmStep % currentChord.length];

      // Soft Arpeggio Melody Synth Note — gentle, pleasant rhodes-like envelope
      playTone(ctx, {
        type: 'sine',
        freq: noteFreq,
        gainPeak: 0.028, // Soft ambient BGM volume
        gainRampDuration: 0.35,
        stopDuration: 0.38
      });

      bgmStep = (bgmStep + 1) % 32;
    } catch (e) {
      console.debug('BGM error:', e);
    }
  };

  // Play a step every 260ms (chill upbeat tempo)
  bgmInterval = window.setInterval(playBgmStep, 260);
}

export function stopBgm(): void {
  if (bgmInterval !== null) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

// ---------------------------------------------------------------------
// 🔊 Game Sound Effects
// ---------------------------------------------------------------------

// Play a quick subtle click sound when slider moves
export function playTickSound(): void {
  withAudio((ctx) => {
    playTone(ctx, {
      type: 'sine',
      freq: 400,
      freqRampTo: 800,
      freqRampDuration: 0.03,
      gainPeak: 0.08,
      gainRampDuration: 0.03,
      stopDuration: 0.035
    });
  });
}

// Play punchier charging sound during ceremony (pitch escalates with progress)
export function playChargingSound(progressPercent: number): void {
  withAudio((ctx) => {
    // Pitch rises from 300Hz up to 950Hz as progress rises from 0% to 100%
    const baseFreq = 300 + (progressPercent / 100) * 650;
    playTone(ctx, {
      type: 'triangle',
      freq: baseFreq,
      freqRampTo: baseFreq + 60,
      freqRampDuration: 0.04,
      gainPeak: 0.25, // Louder & punchier gain
      gainRampDuration: 0.045,
      stopDuration: 0.05
    });
  });
}

// Play a reveal tension / sweep sound
export function playRevealSound(): void {
  withAudio((ctx) => {
    playTone(ctx, {
      type: 'triangle',
      freq: 200,
      freqRampTo: 800,
      freqRampDuration: 0.5,
      gainPeak: 0.15,
      gainFloor: 0.01,
      gainRampType: 'linear',
      gainRampDuration: 0.5,
      stopDuration: 0.55
    });
  });
}

// Play sound feedback based on score
export function playScoreSound(score: number): void {
  if (score === 100) {
    playPerfectFanfare();
    return;
  }

  withAudio((ctx) => {
    if (score >= 85) {
      // High chord / major note
      playTone(ctx, {
        type: 'sine',
        freq: 523.25, // C5
        freqSteps: [{ value: 659.25, at: 0.1 }], // E5
        gainPeak: 0.2,
        gainFloor: 0.01,
        gainRampDuration: 0.4,
        stopDuration: 0.45
      });
    } else if (score >= 60) {
      // Normal chime
      playTone(ctx, {
        type: 'sine',
        freq: 440, // A4
        gainPeak: 0.15,
        gainFloor: 0.01,
        gainRampDuration: 0.3,
        stopDuration: 0.45
      });
    } else {
      // Low disappointment tone
      playTone(ctx, {
        type: 'sawtooth',
        freq: 180,
        freqRampTo: 120,
        freqRampType: 'linear',
        freqRampDuration: 0.4,
        gainPeak: 0.15,
        gainFloor: 0.01,
        gainRampDuration: 0.4,
        stopDuration: 0.45
      });
    }
  });
}

// Perfect 100 Fanfare
export function playPerfectFanfare(): void {
  withAudio((ctx) => {
    playNoteSequence(ctx, {
      type: 'triangle',
      notes: [523.25, 659.25, 783.99, 1046.50], // C5, E5, G5, C6
      noteSpacing: 0.08,
      gainPeak: 0.2,
      gainRampDuration: 0.25,
      stopDuration: 0.28
    });
  });
}

// ---------------------------------------------------------------------
// ⚔️ Dedicated 1v1 PK Sound Effects
// ---------------------------------------------------------------------

// Play high-energy metallic slash / match found sound
export function playMatchFoundSound(): void {
  withAudio((ctx) => {
    playNoteSequence(ctx, {
      type: 'sawtooth',
      notes: [523.25, 783.99, 1046.50], // C5, G5, C6
      noteSpacing: 0.06,
      freqRampMultiplier: 1.5,
      freqRampDuration: 0.12,
      gainPeak: 0.25,
      gainRampDuration: 0.18,
      stopDuration: 0.2
    });
  });
}

// Play punchy whoosh when submitting question or guess
export function playQuestionSubmitSound(): void {
  withAudio((ctx) => {
    playTone(ctx, {
      type: 'triangle',
      freq: 220,
      freqRampTo: 880,
      freqRampDuration: 0.18,
      gainPeak: 0.3,
      gainRampDuration: 0.2,
      stopDuration: 0.22
    });
  });
}

// Play triumphant victory fanfare
export function playVictoryFanfareSound(): void {
  withAudio((ctx) => {
    playNoteSequence(ctx, {
      type: 'triangle',
      notes: [523.25, 659.25, 783.99, 1046.50, 1318.51], // C5, E5, G5, C6, E6
      noteSpacing: 0.09,
      gainPeak: 0.28,
      gainRampDuration: 0.35,
      stopDuration: 0.38
    });
  });
}

// Play defeat sound
export function playDefeatSound(): void {
  withAudio((ctx) => {
    playNoteSequence(ctx, {
      type: 'sawtooth',
      notes: [440.00, 349.23, 293.66, 220.00], // A4, F4, D4, A3
      noteSpacing: 0.12,
      gainPeak: 0.18,
      gainRampDuration: 0.3,
      stopDuration: 0.32
    });
  });
}
