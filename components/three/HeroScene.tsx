"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  Sparkles,
  ContactShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/** Premium ring — luxe jewelry centerpiece */
function CenterRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.y += delta * 0.18;
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, state.pointer.y * 0.28 + 0.26, 0.05);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, -state.pointer.x * 0.22, 0.05);
  });

  return (
    <mesh ref={ref} scale={1.65}>
      <torusGeometry args={[1, 0.32, 64, 128]} />
      <meshPhysicalMaterial
        color="#e7d3a9"
        metalness={1}
        roughness={0.06}
        clearcoat={1}
        clearcoatRoughness={0.08}
        envMapIntensity={2.2}
        emissive="#6b4f1a"
        emissiveIntensity={0.22}
      />
    </mesh>
  );
}

/** Floating diamond / gem shard */
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
    <Float speed={speed} rotationIntensity={1.6} floatIntensity={2} position={position}>
      <mesh scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#c6a15b"
          metalness={1}
          roughness={0.1}
          clearcoat={0.8}
          envMapIntensity={2.0}
          emissive="#3d2e05"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

/** Tiny diamond chips — more variety in sizes */
function DiamondChip({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#ddc18a" metalness={1} roughness={0.22} envMapIntensity={1.2} />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const sparkleGroup = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.22, 0.04);
      g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.35, 0.04);
      g.position.y = THREE.MathUtils.lerp(g.position.y, state.pointer.y * 0.22, 0.04);
    }
    if (sparkleGroup.current) {
      sparkleGroup.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={group}>
      <CenterRing />

      {/* Main floating shards */}
      <GoldShard position={[-3.3, 1.5, -1]}   scale={0.48} speed={1.2} />
      <GoldShard position={[3.2, -1.3, -0.5]} scale={0.4}  speed={1.5} />
      <GoldShard position={[2.6, 1.8, -1.8]}  scale={0.32} speed={1.0} />
      <GoldShard position={[-2.4, -1.7, -1.2]} scale={0.28} speed={1.7} />
      <GoldShard position={[0.4, 2.6, -2.4]}  scale={0.24} speed={1.3} />

      {/* Tiny diamond chips */}
      <DiamondChip position={[-1.8, 0.6, -0.8]} scale={0.14} />
      <DiamondChip position={[1.4, -0.8, -1.2]} scale={0.11} />
      <DiamondChip position={[2.0, 0.4, 0.6]}   scale={0.09} />

      {/* Sparkle layers */}
      <group ref={sparkleGroup}>
        <Sparkles count={160} scale={[12, 8, 6]}  size={3.2}  speed={0.3}  color="#e7d3a9" opacity={0.8} />
        <Sparkles count={70}  scale={[9, 6, 4]}   size={5.0}  speed={0.18} color="#c6a15b" opacity={0.65} />
        <Sparkles count={30}  scale={[5, 4, 2]}   size={8.0}  speed={0.12} color="#ddc18a" opacity={0.45} />
      </group>

      {/* Soft shadow under the ring */}
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.35}
        scale={8}
        blur={2.5}
        far={3}
        color="#3d2e05"
      />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]}   intensity={2.4} color="#fff3da" />
      <directionalLight position={[-6, -2, -4]} intensity={0.9} color="#c08081" />
      <pointLight        position={[0, -2, 3]}  intensity={1.2} color="#ddc18a" distance={8} />

      <Suspense fallback={null}>
        <Scene />

        <Environment resolution={256}>
          <Lightformer form="rect"  intensity={2.2} position={[0, 4, -4]}  scale={[10, 4, 1]} color="#ffe9c2" />
          <Lightformer form="rect"  intensity={1.6} position={[-4, 1, 2]}  scale={[4, 6, 1]}  color="#c6a15b" />
          <Lightformer form="ring"  intensity={1.4} position={[4, 2, 3]}   scale={3}           color="#ffffff" />
          <Lightformer form="rect"  intensity={0.8} position={[0, -3, -2]} scale={[8, 2, 1]}  color="#ffe0a0" />
        </Environment>

        {/* Post-processing: Bloom + Vignette */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.78}
            luminanceSmoothing={0.9}
            intensity={0.55}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.18} darkness={0.6} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
