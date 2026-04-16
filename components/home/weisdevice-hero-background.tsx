"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";

function WireOrb() {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = state.clock.elapsedTime;
    mesh.rotation.x = t * 0.35;
    mesh.rotation.y = t * 0.55;
  });

  return (
    <Float speed={1.25} rotationIntensity={0.35} floatIntensity={0.35}>
      <mesh ref={meshRef} scale={1.15}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#a5b4fc"
          emissive="#312e81"
          emissiveIntensity={0.55}
          metalness={0.35}
          roughness={0.25}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export function WeisdeviceHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/40 to-zinc-950" />

      <Canvas
        className="absolute inset-0"
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
      >
        <color attach="background" args={["#09090b"]} />

        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 2.5, 4]} intensity={1.1} />
        <pointLight position={[-3, -1.5, 2]} intensity={0.55} color="#67e8f9" />

        <Stars radius={60} depth={40} count={1800} factor={2.5} fade speed={0.35} />
        <Sparkles count={120} scale={6} size={2} speed={0.35} opacity={0.35} color="#c4b5fd" />

        <WireOrb />
      </Canvas>

      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(244 244 245 / 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(244 244 245 / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
    </div>
  );
}
