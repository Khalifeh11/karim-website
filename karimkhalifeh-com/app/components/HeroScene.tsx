"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Resolve a CSS custom property (e.g. oklch tokens) to a THREE.Color by
 * letting the 2d canvas parser normalize it — THREE.Color can't parse oklch.
 */
function resolveTokenColor(varName: string): THREE.Color {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx || !raw) return new THREE.Color("#5BAE78");
  ctx.fillStyle = raw;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return new THREE.Color(r / 255, g / 255, b / 255);
}

const IDLE_SPEED = 0.12; // rad/s
const TILT_MAX = 0.35; // rad
const TILT_EASE = 2.2; // lerp rate (1/s)

function Scene({
  accent,
  animate,
  tiltEnabled,
}: {
  accent: THREE.Color;
  animate: boolean;
  tiltEnabled: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const idle = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const tilt = useRef({ x: 0, y: 0 });

  const wireframe = useMemo(
    () => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.5, 1)),
    []
  );

  const particles = useMemo(() => {
    const count = 160;
    const pos = new Float32Array(count * 3);
    // Deterministic pseudo-random spread inside the icosahedron's radius
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < count; i++) {
      const r = 1.15 * Math.cbrt(rand());
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useEffect(() => {
    if (!tiltEnabled) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [tiltEnabled]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g || !animate) return;
    const d = Math.min(dt, 0.05);
    idle.current += d * IDLE_SPEED;
    const k = Math.min(1, TILT_EASE * d);
    tilt.current.x += (pointer.current.y * TILT_MAX - tilt.current.x) * k;
    tilt.current.y += (pointer.current.x * TILT_MAX - tilt.current.y) * k;
    g.rotation.x = idle.current * 0.6 + tilt.current.x;
    g.rotation.y = idle.current + tilt.current.y;
  });

  return (
    // Pushed toward the right edge of the canvas so the form sits in the
    // hero's empty corner instead of behind the headline.
    <group ref={group} position={[0.9, 0.1, 0]} rotation={[0.4, 0.6, 0]}>
      <lineSegments geometry={wireframe}>
        <lineBasicMaterial color={accent} transparent opacity={0.38} />
      </lineSegments>
      <points geometry={particles}>
        <pointsMaterial
          color={accent}
          size={0.025}
          transparent
          opacity={0.45}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function HeroScene() {
  // This component is only ever rendered with ssr: false, so the DOM is
  // available at first render — resolve tokens and media queries lazily.
  const [env] = useState(() => ({
    accent: resolveTokenColor("--accent"),
    reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    fine: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  }));

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={env.reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <Scene
        accent={env.accent}
        animate={!env.reduced}
        tiltEnabled={!env.reduced && env.fine}
      />
    </Canvas>
  );
}
