// Web Audio API ambient & synthesized sound effects
let audioCtx: AudioContext | null = null;
let ambienceInterval: number | null = null;
let isAmbiencePlaying = false;

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

export function playWaterDrop() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startTime = ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, startTime);
    osc.frequency.exponentialRampToValueAtTime(1400, startTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(400, startTime + 0.16);

    gain.gain.setValueAtTime(0.2, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.2);
  } catch {
    // Audio context safely ignored if blocked by autoplay policy
  }
}

export function playFrogCroak() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const startTime = ctx.currentTime;

    // Two oscillators with low square / sawtooth for harmonic croak
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';

    osc1.frequency.setValueAtTime(120, startTime);
    osc1.frequency.linearRampToValueAtTime(95, startTime + 0.14);
    osc1.frequency.linearRampToValueAtTime(110, startTime + 0.22);

    osc2.frequency.setValueAtTime(160, startTime);
    osc2.frequency.linearRampToValueAtTime(130, startTime + 0.14);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, startTime);
    filter.Q.setValueAtTime(4.0, startTime);

    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.005, startTime + 0.28);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + 0.3);
    osc2.stop(startTime + 0.3);
  } catch {
    // ignore
  }
}

export function playFireflyChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const startTime = ctx.currentTime;

    const freqs = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.05);

      gain.gain.setValueAtTime(0.08, startTime + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.05 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + idx * 0.05);
      osc.stop(startTime + idx * 0.05 + 0.5);
    });
  } catch {
    // ignore
  }
}

export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const startTime = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime + i * 0.09);

      gain.gain.setValueAtTime(0.12, startTime + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + i * 0.09 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + i * 0.09);
      osc.stop(startTime + i * 0.09 + 0.65);
    });
  } catch {
    // ignore
  }
}

export function toggleNightAmbience(onStateChanged?: (isPlaying: boolean) => void): boolean {
  if (isAmbiencePlaying) {
    if (ambienceInterval) {
      window.clearInterval(ambienceInterval);
      ambienceInterval = null;
    }
    isAmbiencePlaying = false;
    onStateChanged?.(false);
    return false;
  } else {
    isAmbiencePlaying = true;
    onStateChanged?.(true);

    // Initial chime
    playFireflyChime();

    // Gentle loop of nocturnal sounds
    ambienceInterval = window.setInterval(() => {
      if (!isAmbiencePlaying) return;
      const dice = Math.random();
      if (dice < 0.4) {
        playWaterDrop();
      } else if (dice < 0.75) {
        // Soft distant frog croak
        playFrogCroak();
      } else {
        playFireflyChime();
      }
    }, 4500);

    return true;
  }
}

export function isNightAmbienceActive(): boolean {
  return isAmbiencePlaying;
}
