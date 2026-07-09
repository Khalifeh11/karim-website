"use client";

import { useEffect } from "react";
import { playClick, playHover } from "./sound";

// Delegated listeners instead of onClick/onMouseEnter sprinkled across every
// component: any <a> or <button> on the page gets the hover tick and click
// thock, including ones added later. The sound toggle is excluded from the
// click — it plays its own on/off sound.
export default function SoundEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a, button");
      if (el && !el.closest(".sound-toggle")) playClick();
    };
    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // no phantom hover before taps
      const el = (e.target as Element | null)?.closest?.("a, button");
      // Only on actual entry — not when moving between children of the link.
      if (el && !el.contains(e.relatedTarget as Node | null)) playHover();
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("pointerover", onPointerOver, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", onPointerOver, true);
    };
  }, []);

  return null;
}
