import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

export type StlMetrics = {
  triangles: number;
  volumeMm3: number;
  sizeMm: { x: number; y: number; z: number };
};

function signedVolumeOfTriangle(
  a: THREE.Vector3,
  b: THREE.Vector3,
  c: THREE.Vector3,
) {
  return a.dot(b.clone().cross(c)) / 6;
}

export function computeMeshVolumeMm3(geometry: THREE.BufferGeometry) {
  const position = geometry.getAttribute("position");
  if (!position) return 0;

  const triCount = position.count / 3;
  let volume = 0;

  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();

  for (let i = 0; i < triCount; i += 1) {
    const i3 = i * 3;
    a.fromBufferAttribute(position, i3 + 0);
    b.fromBufferAttribute(position, i3 + 1);
    c.fromBufferAttribute(position, i3 + 2);
    volume += signedVolumeOfTriangle(a, b, c);
  }

  return Math.abs(volume);
}

export function parseStlBuffer(buffer: Buffer): StlMetrics {
  const loader = new STLLoader();
  const arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
  const geometry = loader.parse(arrayBuffer);
  geometry.computeBoundingBox();

  const bbox = geometry.boundingBox;
  if (!bbox) {
    throw new Error("Failed to compute STL bounding box");
  }

  const size = bbox.getSize(new THREE.Vector3());
  const volume = computeMeshVolumeMm3(geometry);
  const triangles = geometry.index
    ? geometry.index.count / 3
    : geometry.getAttribute("position").count / 3;

  return {
    triangles,
    volumeMm3: volume,
    sizeMm: { x: size.x, y: size.y, z: size.z },
  };
}
