let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(v: boolean) {
  muted = v;
}
export function isMuted() {
  return muted;
}

function ensureCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  try {
    ensureCtx();
  } catch {
    /* ignore */
  }
}

function blip(freq: number, dur: number, type: OscillatorType, gainPeak: number) {
  if (muted) return;
  try {
    const c = ensureCtx();
    const t0 = c.currentTime;
    const osc = c.createOscillator();
    const g = c.createGain();
    const filt = c.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 2400;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.35), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gainPeak, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(filt);
    filt.connect(g);
    g.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  } catch {
    /* ignore */
  }
}

export function playScaleTick() {
  blip(920, 0.05, "triangle", 0.07);
}

export function playSnap() {
  blip(220, 0.09, "square", 0.09);
}
