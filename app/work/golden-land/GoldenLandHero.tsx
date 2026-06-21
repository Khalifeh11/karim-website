"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Reveal, SectionLabel } from "@/app/components/Reveal";

export default function GoldenLandHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 80;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 50;
      section.style.setProperty("--glow-x", `${x.toFixed(1)}px`);
      section.style.setProperty("--glow-y", `${y.toFixed(1)}px`);
    };

    const onLeave = () => {
      section.style.setProperty("--glow-x", "0px");
      section.style.setProperty("--glow-y", "0px");
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);

    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="case-hero page" ref={sectionRef}>
      <div className="case-hero-grid">
        <div className="case-hero-text">
          <SectionLabel num="01" as="p">
            case study
          </SectionLabel>

          <Reveal delay={0.1}>
            <h1 className="case-headline">
              golden land
              <br />
              real estate
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="case-sub">
              built the full platform from scratch — property listings, agent
              dashboards, and media uploads backed by cloudflare r2. listings
              go from draft to live without touching a server.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="case-meta">
              <div className="case-meta-item">
                <span className="case-meta-label">year</span>
                <span className="case-meta-value">2024</span>
              </div>
              <div className="case-meta-item">
                <span className="case-meta-label">stack</span>
                <span className="case-meta-value">next.js · cloudflare r2</span>
              </div>
              <div className="case-meta-item">
                <span className="case-meta-label">live</span>
                <a
                  className="case-meta-link preserve-case"
                  href="https://goldenlandrealestate.net"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  goldenlandrealestate.net →
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="case-hero-img">
          <Image
            src="/projects/Device - Macbook Air.png"
            alt="golden land real estate — project preview"
            width={720}
            height={445}
            priority
            className="case-hero-screenshot"
          />
        </Reveal>
      </div>
    </section>
  );
}
