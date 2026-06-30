"use client";

import { useEffect, useRef } from "react";

/**
 * Polished custom cursor: a precise dot tracks the pointer exactly while an
 * outline ring trails behind with eased lag, growing + accent-filling over
 * interactive elements. Activates only on fine pointers without reduced-motion
 * (touch / a11y users keep the native cursor). Driven by rAF + transforms so
 * it never triggers a React re-render.
 */
const INTERACTIVE = "a, button, .ed-row, [data-cursor='hover']";
const LERP = 0.18;

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const root = document.documentElement;
    root.classList.add("ed-cursor-on");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let raf = 0;
    let shown = false;

    const place = (el: HTMLElement | null, x: number, y: number) => {
      if (el) {
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      place(dotRef.current, mouse.x, mouse.y);
      if (!shown) {
        shown = true;
        dotRef.current?.classList.add("is-visible");
        ringRef.current?.classList.add("is-visible");
      }
    };
    const onLeave = () => {
      shown = false;
      dotRef.current?.classList.remove("is-visible");
      ringRef.current?.classList.remove("is-visible");
    };
    const onOver = (e: PointerEvent) => {
      const hovering = !!(e.target as Element)?.closest?.(INTERACTIVE);
      dotRef.current?.classList.toggle("is-hover", hovering);
      ringRef.current?.classList.toggle("is-hover", hovering);
    };

    const tick = () => {
      ring.x += (mouse.x - ring.x) * LERP;
      ring.y += (mouse.y - ring.y) * LERP;
      place(ringRef.current, ring.x, ring.y);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("ed-cursor-on");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="ed-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="ed-cursor-dot" aria-hidden="true" />
    </>
  );
}
