import * as THREE from "three";

/** Millimetres → Three.js metres */
const mm = (v: number) => v / 1000;

type Part = {
  mesh: THREE.Object3D;
  home: THREE.Vector3;
  explode: THREE.Vector3;
};

type CameraKey = {
  at: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
};

const EASE = (t: number) => 1 - Math.pow(1 - t, 3);

function lerpKeys(
  keys: CameraKey[],
  t: number,
): { position: THREE.Vector3; target: THREE.Vector3 } {
  const clamped = Math.min(1, Math.max(0, t));
  let i = 0;
  while (i < keys.length - 1 && keys[i + 1].at < clamped) i++;
  const a = keys[i];
  const b = keys[Math.min(i + 1, keys.length - 1)];
  const span = Math.max(1e-5, b.at - a.at);
  const u = EASE(Math.min(1, Math.max(0, (clamped - a.at) / span)));
  return {
    position: a.position.clone().lerp(b.position, u),
    target: a.target.clone().lerp(b.target, u),
  };
}

function makeOakMap() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#8B5E34";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * size;
    ctx.strokeStyle = `rgba(55, 32, 14, ${0.08 + Math.random() * 0.18})`;
    ctx.lineWidth = 1 + Math.random() * 2.5;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.bezierCurveTo(
      x + (Math.random() - 0.5) * 40,
      size * 0.35,
      x + (Math.random() - 0.5) * 40,
      size * 0.7,
      x + (Math.random() - 0.5) * 20,
      size,
    );
    ctx.stroke();
  }
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = `rgba(196, 150, 90, ${0.04 + Math.random() * 0.08})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 2, 18 + Math.random() * 40);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

function oakMaterial(map: THREE.CanvasTexture) {
  const m = map.clone();
  m.needsUpdate = true;
  m.repeat.set(2.2, 1.1);
  return new THREE.MeshStandardMaterial({
    map: m,
    color: new THREE.Color("#c9a078"),
    roughness: 0.68,
    metalness: 0.03,
  });
}

function brassMaterial() {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#D4A04A"),
    roughness: 0.32,
    metalness: 1,
  });
}

/**
 * Pure Three.js engine — no React.
 * Zakázkový dubový stůl v reálných mm + scroll/hold explode.
 */
export class FurnitureEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private root = new THREE.Group();
  private parts: Part[] = [];
  private dimGroup = new THREE.Group();
  private raf = 0;
  private running = false;
  private reducedMotion = false;
  private last = 0;

  private progress = 0;
  private hold = 0;
  private smoothProgress = 0;
  private smoothHold = 0;
  private smoothExplode = 0;

  private camPos = new THREE.Vector3();
  private camTarget = new THREE.Vector3();
  private look = new THREE.Vector3();
  private tmp = new THREE.Vector3();
  private oakMap: THREE.CanvasTexture;

  private keys: CameraKey[] = [
    {
      at: 0,
      position: new THREE.Vector3(1.9, 1.45, 2.25),
      target: new THREE.Vector3(0, 0.4, 0),
    },
    {
      at: 0.28,
      position: new THREE.Vector3(0.72, 0.55, 0.7),
      target: new THREE.Vector3(0.55, 0.68, 0.28),
    },
    {
      at: 0.58,
      position: new THREE.Vector3(2.6, 2.15, 2.35),
      target: new THREE.Vector3(0, 0.55, 0),
    },
    {
      at: 0.8,
      position: new THREE.Vector3(-2.2, 1.35, 1.7),
      target: new THREE.Vector3(0, 0.42, 0),
    },
    {
      at: 1,
      position: new THREE.Vector3(1.6, 1.2, 1.9),
      target: new THREE.Vector3(0, 0.38, 0),
    },
  ];

  constructor(canvas: HTMLCanvasElement) {
    this.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    this.oakMap = makeOakMap();

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x0b0a09, 1);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.05, 40);
    this.scene.fog = new THREE.FogExp2(0x0b0a09, 0.04);
    this.scene.add(this.root);
    this.scene.add(this.dimGroup);

    this.buildLights();
    this.buildTable();
    this.buildGround();
    this.buildDimensionGuides();
    this.resize();

    const first = this.keys[0];
    this.camPos.copy(first.position);
    this.camTarget.copy(first.target);
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camTarget);
  }

  setProgress(t: number) {
    this.progress = Math.min(1, Math.max(0, t));
  }

  setHold(amount: number) {
    this.hold = Math.min(1, Math.max(0, amount));
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
    const canvas = this.renderer.domElement;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  dispose() {
    this.stop();
    this.oakMap.dispose();
    this.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else if (mat) (mat as THREE.Material).dispose();
    });
    this.renderer.dispose();
  }

  private update(dt: number) {
    const damp = 1 - Math.exp(-dt * 5.2);

    if (this.reducedMotion) {
      this.smoothProgress = 0;
      this.smoothHold = 0;
      this.smoothExplode = 0;
    } else {
      this.smoothProgress += (this.progress - this.smoothProgress) * damp;
      this.smoothHold += (this.hold - this.smoothHold) * damp;
      const scrollExplode = this.scrollExplodeCurve(this.smoothProgress);
      const targetExplode = Math.max(scrollExplode, this.smoothHold);
      this.smoothExplode += (targetExplode - this.smoothExplode) * damp;
    }

    const keyed = lerpKeys(this.keys, this.smoothProgress);
    const around = this.band(this.smoothProgress, 0.72, 0.92);
    if (around > 0) {
      const angle = around * Math.PI * 0.95;
      const r = 2.55;
      keyed.position.set(
        Math.sin(angle) * r,
        1.25 + around * 0.25,
        Math.cos(angle) * r,
      );
    }

    this.camPos.lerp(keyed.position, damp);
    this.camTarget.lerp(keyed.target, damp);
    this.camera.position.copy(this.camPos);
    this.look.copy(this.camTarget);
    this.camera.lookAt(this.look);

    for (const part of this.parts) {
      this.tmp.copy(part.home).addScaledVector(part.explode, this.smoothExplode);
      part.mesh.position.lerp(this.tmp, damp * 1.4);
    }

    this.dimGroup.visible = this.smoothExplode > 0.28;
    this.dimGroup.traverse((obj) => {
      const line = obj as THREE.Line;
      if (line.material && "opacity" in line.material) {
        (line.material as THREE.LineBasicMaterial).opacity = Math.min(
          1,
          (this.smoothExplode - 0.28) / 0.4,
        );
      }
    });
  }

  private scrollExplodeCurve(t: number) {
    if (t < 0.32) return 0;
    if (t < 0.55) return (t - 0.32) / 0.23;
    if (t < 0.78) return 1;
    if (t < 0.94) return 1 - (t - 0.78) / 0.16;
    return 0;
  }

  private band(t: number, a: number, b: number) {
    if (t <= a || t >= b) return 0;
    const m = (a + b) / 2;
    const half = (b - a) / 2;
    return 1 - Math.abs(t - m) / half;
  }

  private buildLights() {
    this.scene.add(new THREE.AmbientLight(0xf5f2eb, 0.42));

    const key = new THREE.DirectionalLight(0xfff1dd, 1.55);
    key.position.set(3.4, 6.2, 2.6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 18;
    key.shadow.camera.left = -3.5;
    key.shadow.camera.right = 3.5;
    key.shadow.camera.top = 3.5;
    key.shadow.camera.bottom = -3.5;
    key.shadow.bias = -0.00025;
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0xb8c4d4, 0.55);
    fill.position.set(-3.0, 2.4, -1.6);
    this.scene.add(fill);

    const rim = new THREE.DirectionalLight(0xc6923c, 0.48);
    rim.position.set(-1.4, 2.0, 3.4);
    this.scene.add(rim);
  }

  private buildGround() {
    const geo = new THREE.CircleGeometry(5, 64);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x121110,
      roughness: 0.96,
      metalness: 0,
    });
    const ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  private addPart(
    mesh: THREE.Object3D,
    home: THREE.Vector3,
    explode: THREE.Vector3,
  ) {
    mesh.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    mesh.position.copy(home);
    this.root.add(mesh);
    this.parts.push({ mesh, home: home.clone(), explode: explode.clone() });
  }

  private buildTable() {
    const oak = () => oakMaterial(this.oakMap);
    const brass = brassMaterial();

    // Top 1800 × 42 × 900 mm with slight bevel via scaled edges
    const top = new THREE.Mesh(
      new THREE.BoxGeometry(mm(1800), mm(42), mm(900)),
      oak(),
    );
    this.addPart(top, new THREE.Vector3(0, mm(735), 0), new THREE.Vector3(0, mm(320), 0));

    // Long aprons
    const apronGeo = new THREE.BoxGeometry(mm(1580), mm(95), mm(30));
    this.addPart(
      new THREE.Mesh(apronGeo, oak()),
      new THREE.Vector3(0, mm(655), mm(405)),
      new THREE.Vector3(0, mm(40), mm(280)),
    );
    this.addPart(
      new THREE.Mesh(apronGeo.clone(), oak()),
      new THREE.Vector3(0, mm(655), mm(-405)),
      new THREE.Vector3(0, mm(40), mm(-280)),
    );

    // Short aprons
    const apronS = new THREE.BoxGeometry(mm(30), mm(95), mm(770));
    this.addPart(
      new THREE.Mesh(apronS, oak()),
      new THREE.Vector3(mm(805), mm(655), 0),
      new THREE.Vector3(mm(300), mm(40), 0),
    );
    this.addPart(
      new THREE.Mesh(apronS.clone(), oak()),
      new THREE.Vector3(mm(-805), mm(655), 0),
      new THREE.Vector3(mm(-300), mm(40), 0),
    );

    const legPositions: [number, number][] = [
      [mm(825), mm(385)],
      [mm(825), mm(-385)],
      [mm(-825), mm(385)],
      [mm(-825), mm(-385)],
    ];

    for (const [x, z] of legPositions) {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(mm(72), mm(730), mm(72)),
        oak(),
      );
      this.addPart(
        leg,
        new THREE.Vector3(x, mm(365), z),
        new THREE.Vector3(x * 0.38, mm(-160), z * 0.38),
      );

      // Through-tenon wedge stub above top plane when exploded
      const tenon = new THREE.Mesh(
        new THREE.BoxGeometry(mm(28), mm(55), mm(28)),
        oak(),
      );
      this.addPart(
        tenon,
        new THREE.Vector3(x, mm(760), z),
        new THREE.Vector3(x * 0.2, mm(120), z * 0.2),
      );

      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(mm(56), mm(4), mm(56)),
        brass,
      );
      this.addPart(
        plate,
        new THREE.Vector3(x, mm(710), z),
        new THREE.Vector3(x * 0.28, mm(90), z * 0.28),
      );

      const bolt = new THREE.Mesh(
        new THREE.CylinderGeometry(mm(7), mm(7), mm(10), 20),
        brass,
      );
      this.addPart(
        bolt,
        new THREE.Vector3(x + Math.sign(x) * mm(18), mm(655), z + Math.sign(z) * mm(40)),
        new THREE.Vector3(x * 0.42, 0, z * 0.55),
      );
    }
  }

  private buildDimensionGuides() {
    const mat = new THREE.LineBasicMaterial({
      color: 0xc6923c,
      transparent: true,
      opacity: 0,
    });

    const makeLine = (points: THREE.Vector3[]) => {
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      this.dimGroup.add(new THREE.Line(geo, mat.clone()));
    };

    makeLine([
      new THREE.Vector3(mm(-900), mm(1100), mm(560)),
      new THREE.Vector3(mm(900), mm(1100), mm(560)),
    ]);
    makeLine([
      new THREE.Vector3(mm(1020), mm(1100), mm(-450)),
      new THREE.Vector3(mm(1020), mm(1100), mm(450)),
    ]);
    makeLine([
      new THREE.Vector3(mm(-1020), mm(0), mm(-560)),
      new THREE.Vector3(mm(-1020), mm(750), mm(-560)),
    ]);
  }
}
