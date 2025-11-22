import * as THREE from "three";
import { whiteMarbleMaterial, createMarbleDerivedMaterial } from "./common/materials/WhiteMarbleMaterial";
import { EntrancePanelMaterial } from "./common/materials/EntrancePanelLogoMaterial";

export const entrancePanel = new THREE.Object3D();

const entrancePanelBaseGeometry = new THREE.BoxGeometry(10, 0.3, 5);

// UV-based tiling: remap the geometry UVs so texture repeats by world units.
// This keeps the marble texture scale consistent with the geometry size.
const width = 10; // X
const height = 0.3; // Y
const depth = 5; // Z
const tilesPerUnit = 1; // how many texture repeats per unit length (meters)

// For BoxGeometry the UV attribute is arranged per-face, 4 verts per face,
// faces in order: +X, -X, +Y, -Y, +Z, -Z (indices 0..5)
const uvAttr = entrancePanelBaseGeometry.attributes.uv as THREE.BufferAttribute;
if (uvAttr && uvAttr.count === 24) {
    // compute per-face scale (uScale, vScale)
    const faceScales: Array<[number, number]> = [
        // +X: span Z (u), Y (v)
        [depth * tilesPerUnit, height * tilesPerUnit],
        // -X
        [depth * tilesPerUnit, height * tilesPerUnit],
        // +Y (top): span X (u), Z (v)
        [width * tilesPerUnit, depth * tilesPerUnit],
        // -Y (bottom)
        [width * tilesPerUnit, depth * tilesPerUnit],
        // +Z: span X (u), Y (v)
        [width * tilesPerUnit, height * tilesPerUnit],
        // -Z
        [width * tilesPerUnit, height * tilesPerUnit],
    ];

    for (let face = 0; face < 6; face++) {
        const uScale = faceScales[face][0];
        const vScale = faceScales[face][1];
        const vertStart = face * 4;
        for (let i = 0; i < 4; i++) {
            const idx = vertStart + i;
            const u = uvAttr.getX(idx);
            const v = uvAttr.getY(idx);
            uvAttr.setXY(idx, u * uScale, v * vScale);
        }
    }
    uvAttr.needsUpdate = true;
}

// Use the base material for the box sides; create a separate top plane
// with higher subdivision so displacement can work properly.
const sideMat = whiteMarbleMaterial;
const entrancePanelBase = new THREE.Mesh(entrancePanelBaseGeometry, sideMat);
entrancePanel.add(entrancePanelBase);

// Top plane (subdivided) to receive normal + displacement for surface detail
const topSegmentsX = 40; // subdivisions along width (X)
const topSegmentsZ = 20; // subdivisions along depth (Z)
const topGeom = new THREE.PlaneGeometry(width, depth, topSegmentsX, topSegmentsZ);
topGeom.rotateX(-Math.PI / 2);
// Slightly raise the plane to avoid z-fighting with the box
const topMat = createMarbleDerivedMaterial({
    normalScale: 1.0,
    displacementScale: 0.03,
    roughness: 0.4,
    clearcoat: 0.18,
    clearcoatRoughness: 0.18,
});
topMat.side = THREE.DoubleSide;
// Match the UV-based tiling used for the box: set texture repeats per world units
if (topMat.map) {
    topMat.map.wrapS = topMat.map.wrapT = THREE.RepeatWrapping;
    topMat.map.repeat.set(width * tilesPerUnit, depth * tilesPerUnit);
    topMat.map.needsUpdate = true;
}
if (topMat.roughnessMap) {
    topMat.roughnessMap.wrapS = topMat.roughnessMap.wrapT = THREE.RepeatWrapping;
    topMat.roughnessMap.repeat.set(width * tilesPerUnit, depth * tilesPerUnit);
    topMat.roughnessMap.needsUpdate = true;
}
if (topMat.normalMap) {
    topMat.normalMap.wrapS = topMat.normalMap.wrapT = THREE.RepeatWrapping;
    topMat.normalMap.repeat.set(width * tilesPerUnit, depth * tilesPerUnit);
    topMat.normalMap.needsUpdate = true;
}
if (topMat.displacementMap) {
    topMat.displacementMap.wrapS = topMat.displacementMap.wrapT = THREE.RepeatWrapping;
    topMat.displacementMap.repeat.set(width * tilesPerUnit, depth * tilesPerUnit);
    topMat.displacementMap.needsUpdate = true;
}
const topMesh = new THREE.Mesh(topGeom, topMat);
topMesh.position.y = height / 2 + 0.001;
entrancePanel.add(topMesh);

const entrancePanelBannerGeometry = new THREE.PlaneGeometry(6, 2, 1, 1);
const entrancePanelBannerBackGeometry = new THREE.PlaneGeometry(6, 2, 1, 1);


const entrancePanelBannerFront = new THREE.Mesh(entrancePanelBannerGeometry, EntrancePanelMaterial);
const entrancePanelBannerBack = new THREE.Mesh(entrancePanelBannerBackGeometry, EntrancePanelMaterial);

entrancePanelBannerFront.position.y += 1.0;
entrancePanelBannerFront.position.z -= 0.01;
entrancePanelBannerFront.rotateY(Math.PI);

entrancePanelBannerBack.position.y += 1.0;
entrancePanelBannerBack.position.z += 0.01;
entrancePanelBannerBack.rotateY(0);

entrancePanel.add(entrancePanelBannerFront);
entrancePanel.add(entrancePanelBannerBack);





