"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PARTICLE_COLOR = "rgba(145, 210, 170, 0.8)";
const CONN_BASE = "rgba(130, 190, 155,";
const CONN_NEAR = "rgba(255, 255, 255,";

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
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctxEl = canvasEl.getContext("2d");
    if (!ctxEl) return;

    // Typed as non-null so the Particle class closure doesn't widen back to T | null.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctxEl;

    let rafId: number;
    const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

    class Particle {
      x: number; y: number;
      dx: number; dy: number;
      size: number;

      constructor(x: number, y: number, dx: number, dy: number, size: number) {
        this.x = x; this.y = y;
        this.dx = dx; this.dy = dy;
        this.size = size;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        if (mouse.x !== null && mouse.y !== null) {
          const mx = mouse.x - this.x;
          const my = mouse.y - this.y;
          const dist = Math.sqrt(mx * mx + my * my);
          if (dist < mouse.radius + this.size) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (mx / dist) * force * 5;
            this.y -= (my / dist) * force * 5;
          }
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    let particles: Particle[] = [];

    const init = () => {
      particles = [];
      const count = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        particles.push(new Particle(x, y, Math.random() * 0.4 - 0.2, Math.random() * 0.4 - 0.2, size));
      }
    };

    const connect = () => {
      const threshold = (canvas.width / 7) * (canvas.height / 7);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const ddx = particles[a].x - particles[b].x;
          const ddy = particles[a].y - particles[b].y;
          const distSq = ddx * ddx + ddy * ddy;
          if (distSq < threshold) {
            const opacity = 1 - distSq / 20000;
            const nearMouse =
              mouse.x !== null &&
              mouse.y !== null &&
              (particles[a].x - mouse.x) ** 2 + (particles[a].y - mouse.y) ** 2 < mouse.radius ** 2;
            ctx.strokeStyle = `${nearMouse ? CONN_NEAR : CONN_BASE} ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) p.update();
      connect();
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onOut = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

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
          web apps that hold up{" "}
          <span className="accent">when your business does.</span>
        </motion.h1>

        <motion.p
          className="hero-sub"
          style={{ textAlign: "center" }}
          custom={2}
          variants={fadeUp}
        >
          i&apos;m karim — a freelance full-stack developer in beirut. startups and
          small businesses hire me to build production-grade websites and web apps
          they won&apos;t need to rebuild when they scale.
        </motion.p>

        <motion.div
          className="hero-actions"
          style={{ justifyContent: "center" }}
          custom={3}
          variants={fadeUp}
        >
          <a className="btn btn-primary" href="#contact">
            get in touch
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
