import * as THREE from 'three';

export function taxicabDistance(v1: THREE.Vector3, v2: THREE.Vector3) {
  let d = Math.abs(v1.x - v2.x) + Math.abs(v1.y - v2.y) + Math.abs(v1.z - v2.z)
  return d
}

function inBetween(x: number, a: number, b: number): boolean {
  return (x > Math.min(a, b)) && (x < Math.max(a, b))
}

function insideQuad(currentPosition: THREE.Vector2, point1: THREE.Vector2, point2: THREE.Vector2): boolean {
  return inBetween(currentPosition.x, point1.x, point2.x) && inBetween(currentPosition.y, point1.y, point2.y)
}

const validArea1Corners = [new THREE.Vector2(-20, -80), new THREE.Vector2(20, 40)]
const validArea2Corners = [new THREE.Vector2(-60, -40), new THREE.Vector2(60, 130)]
const entrancePanelCorners = [new THREE.Vector2(-6, -72.5), new THREE.Vector2(4, -67.5)]
const oatEntrance = [new THREE.Vector2(7, 60), new THREE.Vector2(11, 80)]
const oatCenter = new THREE.Vector2(9.4, 94.25);
const oatInnerRadius = 17.79;
const oatOuterRadius = 30.65;

export function isPlayerPositionValid(currentPlanePosition: THREE.Vector2): boolean {
  return (
    (insideQuad(currentPlanePosition, validArea1Corners[0], validArea1Corners[1])
      || insideQuad(currentPlanePosition, validArea2Corners[0], validArea2Corners[1]))
    && (!insideQuad(currentPlanePosition, entrancePanelCorners[0], entrancePanelCorners[1]))
    && (
      !inBetween(currentPlanePosition.distanceTo(oatCenter), oatInnerRadius, oatOuterRadius)
      || insideQuad(currentPlanePosition, oatEntrance[0], oatEntrance[1])
      || currentPlanePosition.y > 94
    )

  )
}