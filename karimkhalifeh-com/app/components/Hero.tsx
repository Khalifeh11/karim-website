"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { EASE } from "./Reveal";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="hero-scene-glow" aria-hidden="true" />,
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const MAX_PX = 80;
const EASE_GLOW = 0.085;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const atmosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const atmos = atmosRef.current;
    if (!section || !atmos) return;

    // Pointer-only, and never against the user's motion preference.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let rafId: number | null = null;

    const tick = () => {
      current.x += (target.x - current.x) * EASE_GLOW;
      current.y += (target.y - current.y) * EASE_GLOW;
      atmos.style.setProperty("--glow-x", `${current.x.toFixed(2)}px`);
      atmos.style.setProperty("--glow-y", `${current.y.toFixed(2)}px`);
      if (
        Math.abs(target.x - current.x) < 0.1 &&
        Math.abs(target.y - current.y) < 0.1
      ) {
        // Settled — stop the loop so there's no idle rAF churn.
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (rafId == null) rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      target.x = Math.max(-1, Math.min(1, nx)) * MAX_PX;
      target.y = Math.max(-1, Math.min(1, ny)) * MAX_PX;
      kick();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);

    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="hero page has-grid" ref={sectionRef}>
      <div className="hero-atmos" aria-hidden="true" ref={atmosRef}>
        <div className="hero-glow" />
      </div>

      <div className="hero-scene" aria-hidden="true">
        <HeroScene />
      </div>

      <motion.div
        className="hero-inner"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="availability" variants={item}>
          <span className="status-dot" aria-hidden="true" />
          <span>available for new projects — april 2026</span>
        </motion.p>

        <motion.h1 className="hero-headline" variants={item}>
          fast, careful web work{" "}
          <span className="accent">for serious businesses.</span>
        </motion.h1>

        <motion.p className="hero-sub" variants={item}>
          i&apos;m karim — a freelance full-stack developer based in beirut. i
          build production-grade websites and web apps for startups and small
          businesses, locally and abroad.
        </motion.p>

        <motion.div className="hero-actions" variants={item}>
          <a className="btn btn-primary" href="#contact">
            book a call
            <span className="arrow">→</span>
          </a>
          <a className="btn btn-secondary" href="#work">
            see selected work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
