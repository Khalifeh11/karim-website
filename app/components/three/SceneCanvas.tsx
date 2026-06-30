"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ssr:false is only legal inside a Client Component in Next 16 — this wrapper is
// that boundary. The whole three.js bundle is code-split out of the initial load
// and only fetched once we've decided the device can handle it.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

/** Cheap probe: bail on reduced-motion, weak CPUs, or no WebGL. */
function canRender3D(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if ((navigator.hardwareConcurrency ?? 4) < 4) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Fixed full-viewport backdrop for the hero. Mounts the WebGL scene only on
 * capable devices, and only once the browser is idle so it stays off the
 * critical path. Everyone else (and SSR) gets a static CSS glow poster that
 * matches the scene's resting frame.
 */
export default function SceneCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;
    const ric =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ric(() => setEnabled(true));
    return () => cancel(id as number);
  }, []);

  return (
    <div className="noir-canvas" aria-hidden="true">
      {enabled ? <HeroScene /> : <div className="noir-canvas-poster" />}
    </div>
  );
}
