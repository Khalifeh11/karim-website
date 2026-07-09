"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Character field: a grid of dim mono glyphs that brighten in slow ambient
// waves and ripple around the cursor — extends the ">_" terminal brand.
const CELL_W = 20;
const CELL_H = 24;
const MOUSE_RADIUS = 240;
// Mostly quiet dots; structural/code glyphs are rare so the field stays calm.
const GLYPHS = "····························─│┌┐└┘+>_$;{}()=*:";
// Higher intensity promotes a cell's glyph up this ramp (near the cursor).
const RAMP = [":", "+", "*", "#"];
const ALPHA_STEPS = 24;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18 + 0.3, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function AetherFlowHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Touch devices have no hovering cursor, so the field runs hotter there
    // and gets autonomous "phantom" pulses to carry the ripple effect.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const baseAlpha = coarse ? 0.09 : 0.05;
    const waveAmp = coarse ? 0.11 : 0.075;

    // Canvas font strings can't resolve CSS variables — read the next/font
    // family off the root element instead.
    const monoFamily =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-geist-mono")
        .trim() || "ui-monospace";

    let rafId = 0;
    let cols = 0;
    let rows = 0;
    let glyphs: string[] = [];
    // Per-cell phase offsets so the ambient wave doesn't move in lockstep.
    let phases: Float32Array = new Float32Array(0);
    // Pointer strength eases in/out so the ripple fades instead of jumping
    // when the cursor leaves or a touch ends.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0, placed: false };
    // Reused each frame: pointer + phantom pulses, as {x, y, radius, strength}.
    const sources: { x: number; y: number; radius: number; strength: number }[] = [];

    // fillStyle strings are cached per quantized alpha — building
    // "rgba(...)" thousands of times a frame is measurable garbage.
    const alphaCache: string[] = [];
    for (let i = 0; i <= ALPHA_STEPS; i++) {
      alphaCache.push(`rgba(150, 212, 172, ${(i / ALPHA_STEPS).toFixed(3)})`);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `13px ${monoFamily}, ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      cols = Math.ceil(window.innerWidth / CELL_W) + 1;
      rows = Math.ceil(window.innerHeight / CELL_H) + 1;
      glyphs = [];
      phases = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        glyphs.push(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        phases[i] = Math.random() * Math.PI * 2;
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const time = t * 0.00035;

      // The cursor glow trails the pointer for a softer, liquid ripple.
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      pointer.strength += (pointer.target - pointer.strength) * 0.08;

      sources.length = 0;
      if (pointer.strength > 0.02) {
        sources.push({
          x: pointer.x,
          y: pointer.y,
          radius: MOUSE_RADIUS,
          strength: pointer.strength,
        });
      }
      if (coarse && !reduceMotion) {
        // Two phantom pulses on slow Lissajous paths, breathing in strength —
        // they stand in for the cursor on touch screens.
        const w = window.innerWidth;
        const h = window.innerHeight;
        sources.push(
          {
            x: w * (0.5 + 0.38 * Math.sin(time * 0.9)),
            y: h * (0.45 + 0.32 * Math.cos(time * 0.62)),
            radius: 200,
            strength: 0.65 + 0.25 * Math.sin(time * 1.8),
          },
          {
            x: w * (0.5 + 0.36 * Math.sin(time * 0.55 + 2.6)),
            y: h * (0.5 + 0.34 * Math.cos(time * 0.8 + 4.1)),
            radius: 170,
            strength: 0.6 + 0.25 * Math.sin(time * 1.3 + 1.9),
          },
        );
      }
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const x = c * CELL_W + CELL_W / 2;
          const y = r * CELL_H + CELL_H / 2;

          // Ambient brightness: two slow crossing waves + per-cell phase.
          const wave =
            Math.sin(c * 0.18 + time * 2.1 + phases[i]) *
            Math.sin(r * 0.16 - time * 1.7);
          let alpha = baseAlpha + Math.max(0, wave) * waveAmp;

          // Pointer/phantom boost — strongest source wins.
          let boost = 0;
          for (const s of sources) {
            const dx = x - s.x;
            const dy = y - s.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < s.radius * s.radius) {
              const b = (1 - Math.sqrt(distSq) / s.radius) * s.strength;
              if (b > boost) boost = b;
            }
          }
          alpha += boost * boost * 0.65;

          ctx.fillStyle =
            alphaCache[Math.min(ALPHA_STEPS, Math.round(alpha * ALPHA_STEPS))];
          const glyph =
            boost > 0.45
              ? RAMP[Math.min(RAMP.length - 1, Math.floor((boost - 0.45) * 7))]
              : glyphs[i];
          ctx.fillText(glyph, x, y);
        }
      }
    };

    const animate = (t: number) => {
      rafId = requestAnimationFrame(animate);
      draw(t);
    };

    const place = (x: number, y: number) => {
      pointer.tx = x;
      pointer.ty = y;
      if (!pointer.placed) {
        // Snap on the first contact so the glow doesn't streak in from (0,0).
        pointer.x = x;
        pointer.y = y;
        pointer.placed = true;
      }
      pointer.target = 1;
    };
    const onMove = (e: MouseEvent) => place(e.clientX, e.clientY);
    const onOut = () => {
      pointer.target = 0;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) place(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      pointer.target = 0;
    };
    const onResize = () => {
      resize();
      if (reduceMotion) draw(0);
    };

    resize();
    window.addEventListener("resize", onResize);

    if (reduceMotion) {
      // Static field: one frame, no wave, no cursor tracking.
      draw(0);
      return () => window.removeEventListener("resize", onResize);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "calc(100svh - var(--header-h))" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      <div className="hero-fade" aria-hidden="true" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ maxWidth: "var(--page-max)", padding: "0 var(--page-pad)" }}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="hero-headline"
          style={{ maxWidth: "20ch" }}
          custom={1}
          variants={fadeUp}
        >
          <span className="eyebrow">full-stack web developer · beirut</span>
          the last version of your website{" "}
          <span className="accent">you&apos;ll need to build.</span>
        </motion.h1>

        <motion.p
          className="hero-sub"
          style={{ textAlign: "center" }}
          custom={2}
          variants={fadeUp}
        >
          i&apos;m karim. startups and small businesses hire me to build sites
          and web apps that hold up under real users, real traffic, and their
          own growth.
        </motion.p>

        <motion.div
          className="hero-actions"
          style={{ justifyContent: "center" }}
          custom={3}
          variants={fadeUp}
        >
          <a className="btn btn-primary" href="#contact">
            start a project
            <span className="arrow">→</span>
          </a>
          <a className="btn btn-secondary" href="#work">
            see the work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
