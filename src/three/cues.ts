import * as THREE from "three";

export type CameraCue = {
  at: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
  timeScale?: number;
};

/** Camera script keyed to scroll progress — object framed in mm scale (metres after /1000). */
export const CAMERA_CUES: CameraCue[] = [
  {
    at: 0,
    position: new THREE.Vector3(0.42, 0.28, 0.55),
    target: new THREE.Vector3(0, 0.06, 0),
  },
  {
    at: 0.28,
    position: new THREE.Vector3(0.18, 0.1, 0.22),
    target: new THREE.Vector3(0.02, 0.05, 0),
    timeScale: 1 / 12,
  },
  {
    at: 0.58,
    position: new THREE.Vector3(0.55, 0.38, 0.62),
    target: new THREE.Vector3(0, 0.08, 0),
  },
  {
    at: 0.8,
    position: new THREE.Vector3(-0.48, 0.26, 0.42),
    target: new THREE.Vector3(0, 0.06, 0),
  },
  {
    at: 1,
    position: new THREE.Vector3(0.36, 0.24, 0.5),
    target: new THREE.Vector3(0, 0.05, 0),
  },
];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function sampleCue(t: number): {
  position: THREE.Vector3;
  target: THREE.Vector3;
  timeScale: number;
} {
  const clamped = Math.min(1, Math.max(0, t));
  let i = 0;
  while (i < CAMERA_CUES.length - 1 && CAMERA_CUES[i + 1].at < clamped) i++;
  const a = CAMERA_CUES[i];
  const b = CAMERA_CUES[Math.min(i + 1, CAMERA_CUES.length - 1)];
  const span = Math.max(1e-5, b.at - a.at);
  const u = easeOut(Math.min(1, Math.max(0, (clamped - a.at) / span)));
  const timeScale = THREE.MathUtils.lerp(
    a.timeScale ?? 1,
    b.timeScale ?? 1,
    u,
  );
  return {
    position: a.position.clone().lerp(b.position, u),
    target: a.target.clone().lerp(b.target, u),
    timeScale,
  };
}

export function explodeAmount(progress: number, hold: number) {
  let scroll = 0;
  if (progress < 0.4) scroll = 0;
  else if (progress < 0.58) scroll = (progress - 0.4) / 0.18;
  else if (progress < 0.78) scroll = 1;
  else if (progress < 0.94) scroll = 1 - (progress - 0.78) / 0.16;
  else scroll = 0;
  return Math.max(scroll, hold);
}
