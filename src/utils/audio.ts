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
      const now = ctx.currentTime;
      const chordIndex = Math.floor(bgmStep / 8) % BGM_CHORDS.length;
      const currentChord = BGM_CHORDS[chordIndex];
      const noteFreq = currentChord[bgmStep % currentChord.length];

      // Soft Arpeggio Melody Synth Note
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, now);

      // Gentle, pleasant rhodes-like envelope
      gain.gain.setValueAtTime(0.028, now); // Soft ambient BGM volume
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.38);

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
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

// Play punchier charging sound during ceremony (pitch escalates with progress)
export function playChargingSound(progressPercent: number): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Pitch rises from 300Hz up to 950Hz as progress rises from 0% to 100%
    const baseFreq = 300 + (progressPercent / 100) * 650;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 60, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.25, ctx.currentTime); // Louder & punchier gain
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

// Play a reveal tension / sweep sound
export function playRevealSound(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

// Play sound feedback based on score
export function playScoreSound(score: number): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (score === 100) {
      playPerfectFanfare();
      return;
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (score >= 85) {
      // High chord / major note
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    } else if (score >= 60) {
      // Normal chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now); // A4
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    } else {
      // Low disappointment tone
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.4);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(now + 0.45);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

// Perfect 100 Fanfare
export function playPerfectFanfare(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.28);
    });
  } catch (e) {
    console.debug('Audio error:', e);
  }
}
