
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { buildSquare, type Part } from "./buildSquare";
import { easeOutCubic, sampleCue } from "./cues";
import { playScaleTick, playSnap, unlockAudio } from "./audio";

export type LabelState = {
  id: string;
  label: string;
  x: number;
  y: number;
  visible: boolean;
  side: "left" | "right";
};

const GRAIN = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    amount: { value: 0.035 },
    time: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float amount;
    uniform float time;
    varying vec2 vUv;
    float rand(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float n = rand(vUv + fract(time)) * 2.0 - 1.0;
      gl_FragColor = vec4(c.rgb + n * amount, c.a);
    }
  `,
};

/**
 * Pure Three.js joinery stage — no React.
 */
export class PrecisionEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private grainPass: ShaderPass;
  private pmrem: THREE.PMREMGenerator;
  private envRT: THREE.WebGLRenderTarget | null = null;
  private parts: Part[] = [];
  private root = new THREE.Group();
  private bubble: THREE.Mesh | null = null;
  private disposeMaps: () => void = () => undefined;
  private raf = 0;
  private running = false;
  private last = 0;
  private time = 0;
  private progress = 0;
  private hold = 0;
  private smoothProgress = 0;
  private smoothHold = 0;
  private smoothExplode = 0;
  private mouse = new THREE.Vector2(0, 0);
  private reduced = false;
  private bloomOn = true;
  private fpsAccum = 0;
  private fpsFrames = 0;
  private dprCap = 1.75;
  private wasApart = false;
  private lastTick = 0;
  private ready = false;
  private onLabels?: (labels: LabelState[]) => void;
  private onReady?: () => void;
  private tmp = new THREE.Vector3();
  private look = new THREE.Vector3();

  constructor(canvas: HTMLCanvasElement) {
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x080809, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.dprCap));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.01, 40);
    this.pmrem = new THREE.PMREMGenerator(this.renderer);

    this.scene.add(this.root);
    this.buildStudioEnv();
    this.buildLights();
    this.mountObject();

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.25, 0.4, 0.88);
    this.composer.addPass(this.bloom);
    this.grainPass = new ShaderPass(GRAIN);
    this.composer.addPass(this.grainPass);
    this.composer.addPass(new OutputPass());

    this.resize();
  }

  async init() {
    await this.renderer.compileAsync(this.scene, this.camera);
    this.ready = true;
    this.onReady?.();
  }

  setReadyCallback(cb: () => void) {
    this.onReady = cb;
    if (this.ready) cb();
  }

  setLabelCallback(cb: (labels: LabelState[]) => void) {
    this.onLabels = cb;
  }

  setProgress(t: number) {
    this.progress = Math.min(1, Math.max(0, t));
  }

  setHold(v: number) {
    const next = Math.min(1, Math.max(0, v));
    if (next > 0.08 && this.hold <= 0.08) {
      unlockAudio();
      playScaleTick();
    }
    if (next > 0.92 && this.hold <= 0.92) playScaleTick();
    if (next < 0.08 && this.hold >= 0.08) playSnap();
    this.hold = next;
  }

  setBlueprint(on: boolean) {
    this.root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.userData?.blueprint) {
        mesh.visible = on;
        return;
      }
      if (!mesh.isMesh || !mesh.material) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) {
        const mat = m as THREE.MeshPhysicalMaterial;
        if (!mat.isMaterial) continue;
        if (on) {
          if (mat.userData._saved == null) {
            mat.userData._saved = {
              opacity: mat.opacity,
              transparent: mat.transparent,
              depthWrite: mat.depthWrite,
              transmission: mat.transmission ?? 0,
            };
          }
          mat.transparent = true;
          mat.opacity = 0.08;
          mat.depthWrite = false;
          if ("transmission" in mat) mat.transmission = 0;
          mat.needsUpdate = true;
        } else if (mat.userData._saved) {
          const s = mat.userData._saved as {
            opacity: number;
            transparent: boolean;
            depthWrite: boolean;
            transmission: number;
          };
          mat.opacity = s.opacity;
          mat.transparent = s.transparent;
          mat.depthWrite = s.depthWrite;
          if ("transmission" in mat) mat.transmission = s.transmission;
          mat.needsUpdate = true;
        }
      }
    });
  }

  setPointer(nx: number, ny: number) {
    this.mouse.set(nx, ny);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    const tick = (now: number) => {
      this.raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      this.update(dt);
      if (this.bloomOn) this.composer.render();
      else this.renderer.render(this.scene, this.camera);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  resize() {
    const el = this.renderer.domElement;
    const w = el.clientWidth || window.innerWidth;
    const h = el.clientHeight || window.innerHeight;
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.bloom.setSize(w, h);
  }

  dispose() {
    this.stop();
    this.disposeMaps();
    this.envRT?.dispose();
    this.pmrem.dispose();
    this.composer.dispose();
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else if (mat) (mat as THREE.Material).dispose();
    });
    this.renderer.dispose();
  }

  private update(dt: number) {
    this.fpsAccum += dt;
    this.fpsFrames++;
    if (this.fpsAccum > 1) {
      const fps = this.fpsFrames / this.fpsAccum;
      this.fpsAccum = 0;
      this.fpsFrames = 0;
      if (fps < 40 && this.dprCap > 1.1) {
        this.dprCap = Math.max(1.0, this.dprCap - 0.25);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.dprCap));
        this.resize();
        if (fps < 32 && this.bloomOn) {
          this.bloomOn = false;
          this.bloom.enabled = false;
        }
      }
    }

    const damp = 1 - Math.exp(-dt * 5.5);
    if (this.reduced) {
      this.smoothProgress = 0;
      this.smoothHold = 0;
      this.smoothExplode = 0;
    } else {
      this.smoothProgress += (this.progress - this.smoothProgress) * damp;
      this.smoothHold += (this.hold - this.smoothHold) * damp;
    }

    const cue = sampleCue(this.smoothProgress);
    const scrollExplode = cue.explode;
    const holdExplode = this.smoothHold;
    const targetExplode = Math.max(scrollExplode, holdExplode);
    this.smoothExplode += (targetExplode - this.smoothExplode) * damp;

    if (this.smoothExplode > 0.55 && !this.wasApart) {
      this.wasApart = true;
      playScaleTick();
    }
    if (this.smoothExplode < 0.15 && this.wasApart) {
      this.wasApart = false;
      playSnap();
    }

    this.time += dt * cue.timeScale;
    this.grainPass.uniforms.time.value = this.time;

    // Bubble micro-motion from single clock
    if (this.bubble) {
      this.bubble.position.x = Math.sin(this.time * 1.7) * 4;
      this.bubble.position.y = Math.cos(this.time * 1.1) * 0.6;
    }

    this.applyExplode(this.smoothExplode);
    this.frameCamera(cue.frame, cue.polar, cue.azimuth, cue.offsetX, dt);
    this.scene.environmentRotation.set(this.mouse.y * 0.45, -this.mouse.x * 0.8, 0);
    this.projectLabels();

    // Subtle scale ticks while holding
    if (this.smoothHold > 0.2 && this.time - this.lastTick > 0.28) {
      this.lastTick = this.time;
      if (this.smoothHold < 0.95) playScaleTick();
    }
  }

  private applyExplode(e: number) {
    for (const p of this.parts) {
      const delay = (1 - p.order) * 0.42;
      const t = easeOutCubic((e - delay) / 0.58);
      this.tmp.copy(p.base).addScaledVector(p.lift, t);
      p.obj.position.lerp(this.tmp, 0.35);
    }
  }

  /** Fit `frameMm` millimetres vertically on screen. */
  private frameCamera(
    frameMm: number,
    polarDeg: number,
    azimuthDeg: number,
    offsetX: number,
    dt: number,
  ) {
    const frameM = frameMm * 0.001;
    const vFov = (this.camera.fov * Math.PI) / 180;
    const dist = frameM / (2 * Math.tan(vFov / 2));
    const polar = (polarDeg * Math.PI) / 180;
    const azimuth = (azimuthDeg * Math.PI) / 180;
    const target = new THREE.Vector3(offsetX * frameM * 0.8, 0.01, 0);
    const pos = new THREE.Vector3(
      target.x + dist * Math.sin(polar) * Math.sin(azimuth),
      target.y + dist * Math.cos(polar),
      target.z + dist * Math.sin(polar) * Math.cos(azimuth),
    );
    const camDamp = 1 - Math.exp(-dt * 4.2);
    this.camera.position.lerp(pos, camDamp);
    this.look.lerp(target, camDamp);
    this.camera.lookAt(this.look);
  }

  private projectLabels() {
    if (!this.onLabels) return;
    const show = this.smoothExplode > 0.42;
    const w = this.renderer.domElement.clientWidth;
    const h = this.renderer.domElement.clientHeight;
    const seen = new Set<string>();
    const out: LabelState[] = [];
    let i = 0;
    for (const p of this.parts) {
      if (seen.has(p.label)) continue;
      seen.add(p.label);
      const world = new THREE.Vector3();
      p.anchor.getWorldPosition(world);
      world.project(this.camera);
      out.push({
        id: p.id,
        label: p.label,
        x: (world.x * 0.5 + 0.5) * w,
        y: (-world.y * 0.5 + 0.5) * h,
        visible: show && world.z < 1,
        side: i % 2 === 0 ? "left" : "right",
      });
      i++;
    }
    this.onLabels(out);
  }

  private buildStudioEnv() {
    const studio = new THREE.Scene();
    studio.background = new THREE.Color(0x080809);
    const panel = (
      w: number,
      h: number,
      intensity: number,
      pos: [number, number, number],
      warm = false,
    ) => {
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshBasicMaterial({
        color: warm ? 0xfff0d8 : 0xffffff,
        side: THREE.DoubleSide,
      });
      mat.color.multiplyScalar(intensity);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.lookAt(0, 0, 0);
      studio.add(mesh);
    };
    panel(22, 14, 3.2, [-22, 20, 20], true);
    panel(2.4, 34, 7, [30, 4, 12]);
    panel(2.4, 34, 5.2, [-28, -6, -14]);
    this.envRT = this.pmrem.fromScene(studio, 0.04);
    this.scene.environment = this.envRT.texture;
  }

  private buildLights() {
    this.scene.add(new THREE.AmbientLight(0xf4f1ea, 0.18));
    const key = new THREE.DirectionalLight(0xfff1dd, 0.55);
    key.position.set(2.2, 4.2, 2.4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key);
  }

  private mountObject() {
    const built = buildSquare();
    this.disposeMaps = built.disposeMaps;
    this.parts = built.parts;
    this.bubble = built.bubble;
    this.root.add(built.group);

    built.group.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh || !mesh.geometry) return;
      if ((mesh.material as THREE.Material)?.visible === false) return;
      const edges = new THREE.EdgesGeometry(mesh.geometry, 20);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: 0xc9a36a,
          transparent: true,
          opacity: 0.9,
        }),
      );
      line.visible = false;
      line.userData.blueprint = true;
      mesh.add(line);
    });
  }
}
