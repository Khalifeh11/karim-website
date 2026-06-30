"use client";

import { useMemo, useRef } from "react";
import type { ComponentRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollProgress";

/**
 * The one 3D moment: a faceted, self-glowing crystal drifting in a cold
 * starfield. It reads `scrollState` every frame (never React state), so scroll
 * spins the crystal, dollies the camera through the pinned section, and a fast
 * flick briefly pushes its emissive glow.
 */

const BG = "#05070d";

function Crystal() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.15 + scrollState.progress * Math.PI * 2;
      mesh.current.rotation.x = Math.sin(t * 0.2) * 0.15 + scrollState.horizontal * 0.6;
    }
    if (mat.current) {
      const target = 0.35 + Math.min(Math.abs(scrollState.velocity) * 0.02, 0.9);
      mat.current.emissiveIntensity += (target - mat.current.emissiveIntensity) * 0.08;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.3, 4]} />
        <MeshDistortMaterial
          ref={mat}
          color="#0a0e18"
          emissive="#3b6ad6"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.9}
          distort={0.28}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    // Deterministic hash PRNG (pure — no Math.random), so the starfield is stable
    // across renders and the React Compiler is happy.
    const rand = (i: number, s: number) => {
      const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    const n = 1100;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 8 + rand(i, 1) * 22;
      const theta = rand(i, 2) * Math.PI * 2;
      const phi = Math.acos(2 * rand(i, 3) - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.01 + scrollState.velocity * 0.0002;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        color="#9fb4d8"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

/** Eases the camera in response to horizontal-section progress. */
function Rig() {
  useFrame((state) => {
    const z = 6 - scrollState.horizontal * 1.4;
    const x = (scrollState.horizontal - 0.5) * 1.2;
    state.camera.position.z += (z - state.camera.position.z) * 0.05;
    state.camera.position.x += (x - state.camera.position.x) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 38, position: [0, 0, 6] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(BG, 1)}
    >
      <fog attach="fog" args={[BG, 6, 22]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 3, 5]} intensity={3} color="#7ea2ff" />
      <directionalLight position={[-5, -3, -2]} intensity={2} color="#c061ff" />
      <Crystal />
      <Starfield />
      <Rig />
    </Canvas>
  );
}
