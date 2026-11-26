
import * as THREE from "three";

export type Part = {
  id: string;
  label: string;
  obj: THREE.Object3D;
  base: THREE.Vector3;
  lift: THREE.Vector3;
  order: number;
  anchor: THREE.Object3D;
};

function brushed(kind: "linear" | "radial", tint = "#C9A36A") {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, size, size);
  if (kind === "linear") {
    for (let i = 0; i < 160; i++) {
      const y = Math.random() * size;
      ctx.strokeStyle = `rgba(40,28,10,${0.04 + Math.random() * 0.12})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y + (Math.random() - 0.5) * 3);
      ctx.stroke();
    }
  } else {
    const cx = size / 2;
    const cy = size / 2;
    for (let i = 0; i < 180; i++) {
      const a = (i / 180) * Math.PI * 2;
      ctx.strokeStyle = `rgba(40,28,10,${0.05 + Math.random() * 0.1})`;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * size, cy + Math.sin(a) * size);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

function metalPair(map: THREE.CanvasTexture, color: string, satRough: number) {
  const satin = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    map,
    metalness: 1,
    roughness: satRough,
    anisotropy: 0.8,
    anisotropyMap: map,
    envMapIntensity: 1.2,
  });
  const polished = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color).offsetHSL(0.02, 0.05, 0.08),
    metalness: 1,
    roughness: 0.08,
    envMapIntensity: 1.4,
  });
  return [satin, polished] as [THREE.MeshPhysicalMaterial, THREE.MeshPhysicalMaterial];
}

function extrude(shape: THREE.Shape, depth: number, mats: THREE.Material[]) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSize: 0.05,
    bevelThickness: 0.05,
    bevelSegments: 3,
    curveSegments: 16,
  });
  geo.center();
  const mesh = new THREE.Mesh(geo, mats);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** Counter-clockwise lathe profile (outward normals). */
function lathe(pts: [number, number][], segs = 48) {
  const v = pts.map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(v, segs);
}

export type BuiltSquare = {
  group: THREE.Group;
  parts: Part[];
  bubble: THREE.Mesh;
  disposeMaps: () => void;
};

export function buildSquare(): BuiltSquare {
  const group = new THREE.Group();
  const parts: Part[] = [];
  const maps: THREE.CanvasTexture[] = [];

  const brassMap = brushed("linear", "#C9A36A");
  const steelMap = brushed("linear", "#9AA0A8");
  const radialMap = brushed("radial", "#C9A36A");
  maps.push(brassMap, steelMap, radialMap);

  const brass = metalPair(brassMap, "#C9A36A", 0.3);
  const steel = metalPair(steelMap, "#9AA0A8", 0.28);
  const brassRadial = metalPair(radialMap, "#C9A36A", 0.32);

  const glass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#D8EEF5"),
    metalness: 0,
    roughness: 0.04,
    transmission: 0.92,
    thickness: 1.2,
    ior: 1.5,
    transparent: true,
    opacity: 1,
    envMapIntensity: 1.5,
  });
  const liquid = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#6FA8B8"),
    metalness: 0,
    roughness: 0.2,
    transmission: 0.55,
    thickness: 2,
    transparent: true,
    opacity: 0.55,
    envMapIntensity: 0.6,
  });

  const add = (
    id: string,
    label: string,
    obj: THREE.Object3D,
    base: THREE.Vector3,
    lift: THREE.Vector3,
    order: number,
  ) => {
    obj.position.copy(base);
    group.add(obj);
    const anchor = new THREE.Object3D();
    obj.add(anchor);
    parts.push({ id, label, obj, base: base.clone(), lift: lift.clone(), order, anchor });
  };

  // 1) Steel blade 250 × 35 × 2.5 mm with groove
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-125, -17.5);
  bladeShape.lineTo(125, -17.5);
  bladeShape.lineTo(125, 17.5);
  bladeShape.lineTo(-125, 17.5);
  bladeShape.closePath();
  const groove = new THREE.Path();
  groove.moveTo(-110, -1.2);
  groove.lineTo(110, -1.2);
  groove.lineTo(110, 1.2);
  groove.lineTo(-110, 1.2);
  groove.closePath();
  bladeShape.holes.push(groove);
  const blade = extrude(bladeShape, 2.5, steel);
  blade.rotation.x = Math.PI / 2;
  // mm scale ticks as thin boxes
  const tickMat = steel[1].clone();
  for (let i = -12; i <= 12; i++) {
    if (i === 0) continue;
    const h = i % 5 === 0 ? 6 : 3.5;
    const tick = new THREE.Mesh(new THREE.BoxGeometry(0.35, h, 0.2), tickMat);
    tick.position.set(i * 10, 17.5 - h / 2 - 1, 1.4);
    blade.add(tick);
  }
  add(
    "blade",
    "Ocelové měřítko 250 mm",
    blade,
    new THREE.Vector3(55, 8, 0),
    new THREE.Vector3(0, 55, 0),
    0.85,
  );

  // 2) Brass body 140 × 45 × 16 with 45° / 90°
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-70, -22.5);
  bodyShape.lineTo(70, -22.5);
  bodyShape.lineTo(70, 22.5);
  bodyShape.lineTo(-20, 22.5);
  bodyShape.lineTo(-70, -10); // 45° face suggestion
  bodyShape.closePath();
  // vial cutout hole
  const hole = new THREE.Path();
  const hr = 5.2;
  for (let i = 0; i <= 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const x = Math.cos(a) * hr;
    const y = Math.sin(a) * hr + 4;
    if (i === 0) hole.moveTo(x, y);
    else hole.lineTo(x, y);
  }
  bodyShape.holes.push(hole);
  const body = extrude(bodyShape, 16, brass);
  add(
    "body",
    "Mosazná příložka 45°/90°",
    body,
    new THREE.Vector3(-20, 0, 0),
    new THREE.Vector3(-48, -18, 0),
    0.45,
  );

  // 3) Glass vial Ø8 × 42 mm + liquid + bubble
  const vialGroup = new THREE.Group();
  const tube = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 4, 42, 32, 1, true),
    glass,
  );
  tube.rotation.z = Math.PI / 2;
  const fluid = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 34, 24), liquid);
  fluid.rotation.z = Math.PI / 2;
  const bubble = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16), glass.clone());
  (bubble.material as THREE.MeshPhysicalMaterial).transmission = 0.2;
  (bubble.material as THREE.MeshPhysicalMaterial).opacity = 0.85;
  bubble.position.set(2, 0, 0);
  vialGroup.add(tube, fluid, bubble);
  add(
    "vial",
    "Skleněná libela Ø 8 mm",
    vialGroup,
    new THREE.Vector3(-20, 4, 10),
    new THREE.Vector3(0, 42, 28),
    0.7,
  );

  // 4) Knurled brass screw (lathe CCW), spring, pin
  const screwGroup = new THREE.Group();
  // profile: x=radius, y=height — CCW outward
  const headGeo = lathe([
    [0, 5],
    [6.5, 5],
    [7.2, 3.5],
    [7.2, -1],
    [5.5, -2.5],
    [0, -2.5],
  ]);
  const head = new THREE.Mesh(headGeo, brassRadial);
  head.castShadow = true;
  // knurl rings
  for (let i = 0; i < 12; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(7.0, 0.22, 6, 32),
      brassRadial[1],
    );
    ring.position.y = 3.2 - i * 0.35;
    ring.rotation.x = Math.PI / 2;
    head.add(ring);
  }
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 22, 20), brass[0]);
  shaft.position.y = -12;
  shaft.castShadow = true;
  screwGroup.add(head, shaft);
  add(
    "screw",
    "Rýhovaný mosazný šroub & pružina",
    screwGroup,
    new THREE.Vector3(-48, 12, 0),
    new THREE.Vector3(-30, 70, 18),
    1.0,
  );

  const springPts: [number, number][] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const y = -8 + t * 16;
    const r = 3.2 + Math.sin(t * Math.PI * 10) * 0.35;
    springPts.push([r, y]);
  }
  const spring = new THREE.Mesh(lathe(springPts, 36), steel[0]);
  add(
    "spring",
    "Rýhovaný mosazný šroub & pružina",
    spring,
    new THREE.Vector3(-48, -2, 0),
    new THREE.Vector3(-55, 38, -12),
    0.95,
  );

  const pin = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 28, 16), brass[1]);
  pin.rotation.z = Math.PI / 2;
  pin.castShadow = true;
  add(
    "pin",
    "Rýhovaný mosazný šroub & pružina",
    pin,
    new THREE.Vector3(-35, 6, 0),
    new THREE.Vector3(40, 22, -20),
    0.9,
  );

  group.scale.setScalar(0.001); // mm → m
  return {
    group,
    parts,
    bubble,
    disposeMaps: () => maps.forEach((m) => m.dispose()),
  };
}
