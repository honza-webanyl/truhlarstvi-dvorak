import * as THREE from "three";
import { buildJoinery, type JoineryPart } from "./buildJoinery";
import { explodeAmount, sampleCue } from "./cues";

export type LabelProjection = {
  id: string;
  label: string;
  x: number;
  y: number;
  visible: boolean;
};

function playClick() {
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(840, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
    osc.onended = () => void ctx.close();
  } catch {
    /* ignore audio failures */
  }
}

/**
 * Pure Three.js joinery stage — no React.
 */
export class HardwareEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private parts: JoineryPart[] = [];
  private joineryRoot = new THREE.Group();
  private edgeGroup = new THREE.Group();
  private pmrem: THREE.PMREMGenerator;
  private envRT: THREE.WebGLRenderTarget | null = null;
  private raf = 0;
  private running = false;
  private last = 0;
  private reduced = false;
  private disposeMaps: () => void = () => undefined;

  private progress = 0;
  private hold = 0;
  private smoothProgress = 0;
  private smoothHold = 0;
  private smoothExplode = 0;
  private mouse = new THREE.Vector2(0, 0);
  private camPos = new THREE.Vector3();
  private camTarget = new THREE.Vector3();
  private tmp = new THREE.Vector3();
  private wasExploded = false;
  private onLabels?: (labels: LabelProjection[]) => void;

  constructor(canvas: HTMLCanvasElement) {
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x0b0a09, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.camera = new THREE.PerspectiveCamera(28, 1, 0.01, 20);
    this.pmrem = new THREE.PMREMGenerator(this.renderer);

    this.scene.add(this.joineryRoot);
    this.scene.add(this.edgeGroup);
    this.edgeGroup.visible = false;

    this.buildStudioEnv();
    this.buildLights();
    this.mountJoinery();
    this.resize();

    const first = sampleCue(0);
    this.camPos.copy(first.position);
    this.camTarget.copy(first.target);
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camTarget);

    void this.renderer.compileAsync(this.scene, this.camera);
  }

  setLabelCallback(cb: (labels: LabelProjection[]) => void) {
    this.onLabels = cb;
  }

  setProgress(t: number) {
    this.progress = Math.min(1, Math.max(0, t));
  }

  setHold(v: number) {
    const next = Math.min(1, Math.max(0, v));
    if (next > 0.55 && this.hold <= 0.55) playClick();
    this.hold = next;
  }

  setBlueprint(on: boolean) {
    this.joineryRoot.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.userData?.blueprint) {
        mesh.visible = on;
        return;
      }
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        for (const m of mats) {
          if ((m as THREE.Material).visible === false) continue;
          (m as THREE.Material).transparent = on;
          (m as THREE.Material).opacity = on ? 0.08 : 1;
          (m as THREE.Material).depthWrite = !on;
          (m as THREE.Material).needsUpdate = true;
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
      this.renderer.render(this.scene, this.camera);
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
  }

  dispose() {
    this.stop();
    this.disposeMaps();
    this.envRT?.dispose();
    this.pmrem.dispose();
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
    const damp = 1 - Math.exp(-dt * 5.5);
    if (this.reduced) {
      this.smoothProgress = 0;
      this.smoothHold = 0;
      this.smoothExplode = 0;
    } else {
      this.smoothProgress += (this.progress - this.smoothProgress) * damp;
      this.smoothHold += (this.hold - this.smoothHold) * damp;
      const target = explodeAmount(this.smoothProgress, this.smoothHold);
      this.smoothExplode += (target - this.smoothExplode) * damp;
    }

    if (this.smoothExplode > 0.6 && !this.wasExploded) {
      this.wasExploded = true;
    }
    if (this.smoothExplode < 0.2) this.wasExploded = false;

    const cue = sampleCue(this.smoothProgress);
    const scaledDt = dt * cue.timeScale;
    const camDamp = 1 - Math.exp(-scaledDt * 5.5);
    this.camPos.lerp(cue.position, camDamp);
    this.camTarget.lerp(cue.target, camDamp);

    // Orbit bias in "around"
    const around = this.band(this.smoothProgress, 0.72, 0.92);
    if (around > 0) {
      const a = around * Math.PI * 1.1;
      const r = 0.58;
      this.camPos.lerp(
        new THREE.Vector3(Math.sin(a) * r, 0.28, Math.cos(a) * r),
        around * 0.35,
      );
    }

    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camTarget);

    // Cursor → environment rotation
    this.scene.environmentRotation.set(
      this.mouse.y * 0.45,
      -this.mouse.x * 0.8,
      0,
    );

    for (const p of this.parts) {
      this.tmp.copy(p.home).addScaledVector(p.explode, this.smoothExplode);
      // homes are in mm before scale — parts already in scaled group, so home is local mm
      p.mesh.position.lerp(this.tmp, damp * 1.35);
    }

    this.projectLabels();
  }

  private projectLabels() {
    if (!this.onLabels) return;
    const show = this.smoothExplode > 0.45;
    const w = this.renderer.domElement.clientWidth;
    const h = this.renderer.domElement.clientHeight;
    const out: LabelProjection[] = [];
    for (const p of this.parts) {
      if (!p.label) continue;
      const world = new THREE.Vector3();
      p.mesh.getWorldPosition(world);
      world.project(this.camera);
      const x = (world.x * 0.5 + 0.5) * w;
      const y = (-world.y * 0.5 + 0.5) * h;
      out.push({
        id: p.id,
        label: p.label,
        x,
        y,
        visible: show && world.z < 1,
      });
    }
    this.onLabels(out);
  }

  private band(t: number, a: number, b: number) {
    if (t <= a || t >= b) return 0;
    const m = (a + b) / 2;
    return 1 - Math.abs(t - m) / ((b - a) / 2);
  }

  private buildStudioEnv() {
    const studio = new THREE.Scene();
    studio.background = new THREE.Color(0x0b0a09);

    const panel = (
      w: number,
      h: number,
      intensity: number,
      pos: [number, number, number],
    ) => {
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      // Encode intensity into color brightness for PMREM
      mat.color.multiplyScalar(intensity);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.lookAt(0, 0, 0);
      studio.add(mesh);
    };

    // Softbox + strip lights (Parallel Studios)
    panel(22, 14, 3.2, [-22, 20, 20]);
    panel(2.4, 34, 7, [30, 4, 12]);
    panel(2.4, 34, 5.5, [28, 4, -14]);

    this.envRT = this.pmrem.fromScene(studio, 0.04);
    this.scene.environment = this.envRT.texture;
  }

  private buildLights() {
    this.scene.add(new THREE.AmbientLight(0xf5f2eb, 0.22));
    const key = new THREE.DirectionalLight(0xfff1dd, 0.85);
    key.position.set(2.5, 4, 2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key);
  }

  private mountJoinery() {
    const built = buildJoinery();
    this.disposeMaps = built.disposeMaps;
    this.parts = built.parts;
    this.joineryRoot.add(built.group);

    // Blueprint edges as children so they follow explode transforms
    built.group.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh || !mesh.geometry) return;
      if ((mesh.material as THREE.Material)?.visible === false) return;
      const edges = new THREE.EdgesGeometry(mesh.geometry, 18);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: 0xd4a359,
          transparent: true,
          opacity: 0.95,
        }),
      );
      line.visible = false;
      line.userData.blueprint = true;
      mesh.add(line);
    });
  }
}
