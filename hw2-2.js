import * as THREE from "https://threejs.org/build/three.module.js";

export function makeRect(rect) {
  let Rect = {};
  Rect.max = car.localToWorld(new THREE.Vector3(4.5, 0, 2));
  Rect.min = car.localToWorld(new THREE.Vector3(-4.5, 0, -2));
  Rect.px = car.localToWorld(new THREE.Vector3(1, 0, 0)).sub(car.position);
  return Rect;
}
