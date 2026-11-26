export type CueShot = {
  frame: number;
  polar: number;
  azimuth: number;
  offsetX: number;
  explode: number;
  timeScale: number;
};

export type Cue = { id: string; at: number; shot: CueShot };

export const CUES: Cue[] = [
  { id: "hero", at: 0, shot: { frame: 260, polar: 22, azimuth: -28, offsetX: 0.16, explode: 0, timeScale: 1 } },
  { id: "closeup", at: 0.25, shot: { frame: 65, polar: 38, azimuth: 18, offsetX: 0.12, explode: 0, timeScale: 1 / 12 } },
  { id: "apart", at: 0.55, shot: { frame: 310, polar: 52, azimuth: -35, offsetX: 0.15, explode: 1, timeScale: 1 } },
  { id: "around", at: 0.8, shot: { frame: 240, polar: 30, azimuth: 145, offsetX: -0.14, explode: 0.35, timeScale: 1 } },
  { id: "outro", at: 1, shot: { frame: 270, polar: 20, azimuth: -15, offsetX: 0.14, explode: 0, timeScale: 1 } },
];

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function sampleCue(t: number): CueShot & { id: string } {
  const x = clamp01(t);
  let i = 0;
  while (i < CUES.length - 1 && CUES[i + 1].at <= x) i++;
  const a = CUES[i];
  const b = CUES[Math.min(i + 1, CUES.length - 1)];
  if (a === b) return { id: a.id, ...a.shot };
  const u = (x - a.at) / Math.max(1e-6, b.at - a.at);
  const s = u * u * (3 - 2 * u);
  return {
    id: s < 0.5 ? a.id : b.id,
    frame: lerp(a.shot.frame, b.shot.frame, s),
    polar: lerp(a.shot.polar, b.shot.polar, s),
    azimuth: lerp(a.shot.azimuth, b.shot.azimuth, s),
    offsetX: lerp(a.shot.offsetX, b.shot.offsetX, s),
    explode: lerp(a.shot.explode, b.shot.explode, s),
    timeScale: lerp(a.shot.timeScale, b.shot.timeScale, s),
  };
}

export function easeOutCubic(t: number) {
  const x = clamp01(t);
  return 1 - (1 - x) ** 3;
}
