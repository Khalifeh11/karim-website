"use client";

import { useEffect } from "react";
import { initFromStorage, isEnabled, ensureLoaded, play } from "./sound";

/**
 * Mounts once on the homepage: restores the persisted on/off choice, primes
 * the audio context on the first pointer gesture (so a clack is ready even when
 * sound was left on from a previous visit), and plays a clack on any link/button
 * click via event delegation. Renders nothing.
 */
export default function SoundController() {
  useEffect(() => {
    initFromStorage();

    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (el?.closest?.("a, button")) play();
    };
    const prime = () => {
      if (isEnabled()) void ensureLoaded();
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerdown", prime);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerdown", prime);
    };
  }, []);

  return null;
}
