import * as THREE from "three";

export type JoineryPart = {
  id: string;
  mesh: THREE.Mesh;
  home: THREE.Vector3;
  explode: THREE.Vector3;
  label?: string;
};

function brushedMap() {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#D4A359";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 120; i++) {
    const y = Math.random() * size;
    ctx.strokeStyle = `rgba(80, 50, 10, ${0.05 + Math.random() * 0.12})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y + (Math.random() - 0.5) * 4);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

function makeBrassPair(map: THREE.CanvasTexture) {
  const satinFace = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#D4A359"),
    map,
    metalness: 1,
    roughness: 0.28,
    anisotropy: 0.8,
    anisotropyMap: map,
    envMapIntensity: 1.15,
  });
  const polishedEdge = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#E8C27A"),
    metalness: 1,
    roughness: 0.08,
    envMapIntensity: 1.35,
  });
  return [satinFace, polishedEdge] as [
    THREE.MeshPhysicalMaterial,
    THREE.MeshPhysicalMaterial,
  ];
}

function steelMat() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#8A9098"),
    metalness: 1,
    roughness: 0.22,
    envMapIntensity: 1.1,
  });
}

function glassMat() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#E8F0F8"),
    metalness: 0,
    roughness: 0.04,
    transmission: 0.92,
    thickness: 0.8,
    ior: 1.5,
    transparent: true,
    opacity: 1,
    envMapIntensity: 1.4,
  });
}

/** Extrude with 0.05 mm bevel — shapes authored in millimetres. */
function extrude(
  shape: THREE.Shape,
  depth: number,
  materials: THREE.Material | THREE.Material[],
) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSize: 0.05,
    bevelThickness: 0.05,
    bevelSegments: 3,
    curveSegments: 8,
  });
  geo.center();
  const mesh = new THREE.Mesh(geo, materials);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * Multi-part joinery / hinge: brass base, steel pin, glass spacer, brass cover.
 * Built in mm; caller scales group by 0.001 → metres.
 */
export function buildJoinery(): {
  group: THREE.Group;
  parts: JoineryPart[];
  disposeMaps: () => void;
} {
  const group = new THREE.Group();
  const parts: JoineryPart[] = [];
  const map = brushedMap();
  const brass = makeBrassPair(map);
  const steel = steelMat();
  const glass = glassMat();

  const add = (
    id: string,
    mesh: THREE.Mesh,
    home: THREE.Vector3,
    explode: THREE.Vector3,
    label?: string,
  ) => {
    mesh.position.copy(home);
    group.add(mesh);
    parts.push({ id, mesh, home: home.clone(), explode: explode.clone(), label });
  };

  // Brass base plate 120 × 8 × 48 mm
  const baseShape = new THREE.Shape();
  baseShape.moveTo(-60, -24);
  baseShape.lineTo(60, -24);
  baseShape.lineTo(60, 24);
  baseShape.lineTo(-60, 24);
  baseShape.closePath();
  const base = extrude(baseShape, 8, brass);
  base.rotation.x = -Math.PI / 2;
  add("base", base, new THREE.Vector3(0, 4, 0), new THREE.Vector3(0, -28, 0), "01 Kartáčovaná mosaz");

  // Glass spacer 70 × 8 × 28 mm
  const glassMesh = new THREE.Mesh(
    new THREE.BoxGeometry(70, 8, 28),
    glass,
  );
  glassMesh.castShadow = true;
  add(
    "glass",
    glassMesh,
    new THREE.Vector3(0, 14, 0),
    new THREE.Vector3(0, 36, 0),
    "02 Tvrzené sklo 8 mm",
  );

  // Steel pin Ø10 × 56 mm with groove
  const pin = new THREE.Mesh(
    new THREE.CylinderGeometry(5, 5, 56, 24),
    steel,
  );
  pin.rotation.z = Math.PI / 2;
  pin.castShadow = true;
  const groove = new THREE.Mesh(
    new THREE.TorusGeometry(5.2, 0.6, 8, 24),
    steel.clone(),
  );
  groove.rotation.y = Math.PI / 2;
  groove.castShadow = true;
  // Use a single mesh wrapper for explode by parenting into a Mesh-like Object3D —
  // explode moves the pin as a group via a dummy mesh container.
  const pinProxy = new THREE.Mesh(
    new THREE.BoxGeometry(56, 10, 10),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  pinProxy.add(pin);
  pinProxy.add(groove);
  add(
    "pin",
    pinProxy,
    new THREE.Vector3(0, 22, 0),
    new THREE.Vector3(48, 18, 0),
    "03 Přesný čep Blum",
  );

  // Cover brass strip 100 × 3 × 18 mm
  const coverShape = new THREE.Shape();
  coverShape.moveTo(-50, -9);
  coverShape.lineTo(50, -9);
  coverShape.lineTo(50, 9);
  coverShape.lineTo(-50, 9);
  coverShape.closePath();
  const cover = extrude(coverShape, 3, brass);
  cover.rotation.x = -Math.PI / 2;
  add(
    "cover",
    cover,
    new THREE.Vector3(0, 30, 0),
    new THREE.Vector3(0, 52, 12),
    "04 Tolerance 0.05 mm",
  );

  // Small brass side brackets
  const bracketShape = new THREE.Shape();
  bracketShape.moveTo(-6, -10);
  bracketShape.lineTo(6, -10);
  bracketShape.lineTo(6, 10);
  bracketShape.lineTo(-6, 10);
  bracketShape.closePath();
  const brL = extrude(bracketShape, 4, brass);
  brL.rotation.y = Math.PI / 2;
  add("brL", brL, new THREE.Vector3(-52, 16, 0), new THREE.Vector3(-40, 8, 0));
  const brR = extrude(bracketShape, 4, brass);
  brR.rotation.y = Math.PI / 2;
  add("brR", brR, new THREE.Vector3(52, 16, 0), new THREE.Vector3(40, 8, 0));

  group.scale.setScalar(0.001); // mm → m

  return {
    group,
    parts,
    disposeMaps: () => map.dispose(),
  };
}
