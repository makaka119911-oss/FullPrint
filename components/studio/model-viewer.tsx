"use client";

import * as React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

type Props = {
  modelUrl: string | null;
};

function GlbModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function StlModel({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);
  const centered = React.useMemo(() => {
    const g = geometry.clone();
    g.center();
    return g;
  }, [geometry]);

  return (
    <mesh geometry={centered}>
      <meshStandardMaterial color="#d1d5db" metalness={0.2} roughness={0.6} />
    </mesh>
  );
}

export function ModelViewer({ modelUrl }: Props) {
  if (!modelUrl) {
    return (
      <div className="flex min-h-[560px] items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/60 text-sm text-zinc-500">
        3D-модель появится после конвертации
      </div>
    );
  }

  const isStl = modelUrl.toLowerCase().endsWith(".stl");

  return (
    <div className="min-h-[560px] overflow-hidden rounded-2xl border border-zinc-800 bg-[#111827]">
      <Canvas camera={{ position: [2.2, 1.8, 2.2], fov: 45 }}>
        <color attach="background" args={["#111827"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 2]} intensity={1.2} />
        <pointLight position={[-4, -2, 4]} intensity={0.7} />
        <gridHelper args={[12, 24, "#334155", "#1f2937"]} />

        <React.Suspense fallback={null}>
          {isStl ? <StlModel url={modelUrl} /> : <GlbModel url={modelUrl} />}
        </React.Suspense>

        <OrbitControls enablePan enableRotate enableZoom />
      </Canvas>
    </div>
  );
}

