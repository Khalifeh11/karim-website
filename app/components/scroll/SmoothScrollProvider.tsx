"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollState } from "@/lib/scrollProgress";

/**
 * Owns the single Lenis instance for the whole app and makes it the one source
 * of scroll truth: Lenis drives the rAF loop off GSAP's ticker, every Lenis tick
 * calls `ScrollTrigger.update()`, and the normalized progress/velocity are
 * mirrored into `scrollState` for the 3D scene.
 *
 * Lives in the root layout so smooth scroll survives client-side navigations.
 * Under reduced-motion it never starts Lenis — the user keeps native scroll, and
 * ScrollTrigger reads native scroll on its own.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Native-scroll fallback: still feed page progress to the scene, no smoothing.
    if (reduce) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollState.progress = max > 0 ? window.scrollY / max : 0;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      ScrollTrigger.refresh();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    lenis.on("scroll", (e: Lenis) => {
      ScrollTrigger.update();
      scrollState.progress = e.progress;
      scrollState.velocity = e.velocity;
    });

    // One rAF loop for everything: GSAP's ticker drives Lenis (ms → s).
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Recompute trigger positions once layout/fonts have settled.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
