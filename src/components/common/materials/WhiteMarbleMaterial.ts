import * as THREE from 'three';
import { filesRoot } from '../../../paths';

const textureLoader = new THREE.TextureLoader();

const marbleTexturePath = `${filesRoot}res/textures/marble/Marble021_1K_Color.jpg`;
console.log(`[info] Loading marble texture from: ${marbleTexturePath}`);

// Color / Albedo
const marbleTexture = await textureLoader.loadAsync(`${filesRoot}res/textures/marble/Marble021_1K_Color.jpg`);
marbleTexture.wrapS = marbleTexture.wrapT = THREE.RepeatWrapping;
// UV-based tiling will control repetition; keep material repeat at 1
marbleTexture.repeat.set(1, 1);
marbleTexture.anisotropy = 8;

// Roughness
const marbleRoughnessTexture = await textureLoader.loadAsync(`${filesRoot}res/textures/marble/Marble021_1K_Roughness.jpg`);
marbleRoughnessTexture.wrapS = marbleRoughnessTexture.wrapT = THREE.RepeatWrapping;
marbleRoughnessTexture.anisotropy = 4;

// Normal and displacement maps (for added surface detail)
const marbleNormalTexture = await textureLoader.loadAsync(`${filesRoot}res/textures/marble/Marble021_1K_NormalGL.jpg`);
marbleNormalTexture.wrapS = marbleNormalTexture.wrapT = THREE.RepeatWrapping;
marbleNormalTexture.anisotropy = 4;


const marbleDisplacementTexture = await textureLoader.loadAsync(`${filesRoot}res/textures/marble/Marble021_1K_Displacement.jpg`);
marbleDisplacementTexture.wrapS = marbleDisplacementTexture.wrapT = THREE.RepeatWrapping;
marbleDisplacementTexture.anisotropy = 4;

marbleTexture.needsUpdate = true;
marbleRoughnessTexture.needsUpdate = true;
marbleNormalTexture.needsUpdate = true;
marbleDisplacementTexture.needsUpdate = true;

export const whiteMarbleMaterial = new (THREE as any).MeshPhysicalMaterial({
  map: marbleTexture,
  roughnessMap: marbleRoughnessTexture,
  side: THREE.DoubleSide,
  roughness: 0.45,
  metalness: 0.0,
  // Add a subtle clearcoat for a slightly glossy finish
  clearcoat: 0.12,
  clearcoatRoughness: 0.25
});

// Factory to derive materials from the base marble material and attach
// normal/displacement maps (useful for pieces that need extra surface detail).
export function createMarbleDerivedMaterial(opts?: {
  normalScale?: number,
  displacementScale?: number,
  roughness?: number,
  metalness?: number,
  clearcoat?: number,
  clearcoatRoughness?: number
}) {
  const m = (whiteMarbleMaterial as any).clone() as any;
  // Clone textures for this derived material so per-instance UV repeats
  // or other changes don't affect the shared base material.
  if ((marbleTexture as any).clone) {
    m.map = (marbleTexture as any).clone();
    (m.map as any).needsUpdate = true;
    m.roughnessMap = (marbleRoughnessTexture as any).clone();
    (m.roughnessMap as any).needsUpdate = true;
    (m as any).normalMap = (marbleNormalTexture as any).clone();
    (m as any).normalMap.needsUpdate = true;
    (m as any).displacementMap = (marbleDisplacementTexture as any).clone();
    (m as any).displacementMap.needsUpdate = true;
    // ensure wrapping is RepeatWrapping so UVs outside 0..1 tile correctly
    [m.map, m.roughnessMap, (m as any).normalMap, (m as any).displacementMap].forEach((t: any) => {
      if (t) t.wrapS = t.wrapT = THREE.RepeatWrapping;
    });
  } else {
    // fallback: attach shared textures
    (m as any).normalMap = marbleNormalTexture;
    (m as any).displacementMap = marbleDisplacementTexture;
    m.roughnessMap = marbleRoughnessTexture;
  }
  // Set sensible defaults, allowing overrides
  m.normalScale = new THREE.Vector2(opts?.normalScale ?? 1, opts?.normalScale ?? 1);
  m.displacementScale = opts?.displacementScale ?? 0.02;
  m.roughness = opts?.roughness ?? m.roughness;
  m.metalness = opts?.metalness ?? m.metalness;
  m.clearcoat = opts?.clearcoat ?? m.clearcoat;
  m.clearcoatRoughness = opts?.clearcoatRoughness ?? m.clearcoatRoughness;
  return m;
}