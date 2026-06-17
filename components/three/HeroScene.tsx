"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/** Central refractive gem — slowly turning, tilting toward the cursor. */
function CenterGem() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.y += delta * 0.22;
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, state.pointer.y * 0.35, 0.05);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, -state.pointer.x * 0.3, 0.05);
  });
  return (
    <mesh ref={ref} scale={1.85}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color="#e7d3a9"
        metalness={1}
        roughness={0.14}
        clearcoat={1}
        clearcoatRoughness={0.18}
        envMapIntensity={1.8}
        emissive="#5a4420"
        emissiveIntensity={0.28}
        flatShading
      />
    </mesh>
  );
}

/** Solid gold faceted shard, gently floating. */
function GoldShard({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={1.4} floatIntensity={1.8} position={position}>
      <mesh scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#c6a15b" metalness={1} roughness={0.18} envMapIntensity={1.5} />
      </mesh>
    </Float>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.25, 0.04);
    g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.4, 0.04);
    g.position.y = THREE.MathUtils.lerp(g.position.y, state.pointer.y * 0.25, 0.04);
  });

  return (
    <group ref={group}>
      <CenterGem />

      <GoldShard position={[-3.3, 1.5, -1]} scale={0.5} speed={1.2} />
      <GoldShard position={[3.2, -1.3, -0.5]} scale={0.42} speed={1.5} />
      <GoldShard position={[2.6, 1.8, -1.8]} scale={0.34} speed={1} />
      <GoldShard position={[-2.4, -1.7, -1.2]} scale={0.3} speed={1.7} />
      <GoldShard position={[0.4, 2.6, -2.4]} scale={0.26} speed={1.3} />

      <Sparkles count={150} scale={[11, 7, 5]} size={3.4} speed={0.35} color="#e7d3a9" opacity={0.85} />
      <Sparkles count={60} scale={[8, 6, 3]} size={5.5} speed={0.22} color="#c6a15b" opacity={0.7} />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} color="#fff3da" />
      <directionalLight position={[-6, -2, -4]} intensity={0.8} color="#c08081" />
      <Suspense fallback={null}>
        <Scene />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2} position={[0, 4, -4]} scale={[10, 4, 1]} color="#ffe9c2" />
          <Lightformer form="rect" intensity={1.4} position={[-4, 1, 2]} scale={[4, 6, 1]} color="#c6a15b" />
          <Lightformer form="ring" intensity={1.2} position={[4, 2, 3]} scale={3} color="#ffffff" />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
