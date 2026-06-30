"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import DeviceRig from "./DeviceRig";
import { SectionLabel } from "./Reveal";
import { projects } from "../data/projects";

const SLIDE_MS = 7000;

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const paused = focused;

  const indexRef = useRef(0);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef(0); // 0..1 within the current slide
  const pausedRef = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    pausedRef.current = paused || reduceMotion;
  }, [paused, reduceMotion]);

  const goTo = useCallback((i: number) => {
    progressRef.current = 0;
    setIndex(((i % projects.length) + projects.length) % projects.length);
  }, []);

  // Touch swipe (mobile): decide on touchend so vertical page scrolling is
  // never hijacked. A mostly-horizontal drag past the threshold advances —
  // swipe left → next, swipe right → previous.
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy)) return;
    goTo(indexRef.current + (dx < 0 ? 1 : -1));
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      goTo(indexRef.current + (e.key === "ArrowRight" ? 1 : -1));
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [goTo]);

  // Timing loop: fills the active progress bar via transform (no re-renders)
  // and advances when full. Holds while hovered/focused, when the tab is
  // hidden, or under prefers-reduced-motion (then it never auto-advances).
  useEffect(() => {
    let rafId: number;
    let last = performance.now();

    const tick = (now: number) => {
      // rAF suspends in background tabs — clamp the post-resume delta so
      // progress doesn't leap forward or skip a slide.
      const dt = Math.min(now - last, 100);
      last = now;
      if (!pausedRef.current && !document.hidden) {
        progressRef.current += dt / SLIDE_MS;
        if (progressRef.current >= 1) {
          progressRef.current = 0;
          setIndex((i) => (i + 1) % projects.length);
        }
      }
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const fill =
          i === indexRef.current ? progressRef.current : 0;
        bar.style.transform = `scaleX(${fill.toFixed(4)})`;
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      id="work"
      className={`carousel page ${paused && !reduceMotion ? "is-paused" : ""}`}
      style={{ '--scene-hue': projects[index].themeHue } as React.CSSProperties}
      aria-roledescription="carousel"
      aria-label="featured projects"
      // Pause for keyboard focus only — a mouse click parks focus on the
      // button it hit, which would otherwise freeze the carousel for good.
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setFocused(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <header className="section-head">
        <SectionLabel num="01">featured work</SectionLabel>
        <div className="carousel-nav">
          <button
            type="button"
            className="carousel-arrow"
            aria-label="previous project"
            onClick={() => goTo(index - 1)}
          >
            ←
          </button>
          <button
            type="button"
            className="carousel-arrow"
            aria-label="next project"
            onClick={() => goTo(index + 1)}
          >
            →
          </button>
        </div>
      </header>

      <div
        className="carousel-stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {projects.map((p, i) => (
          <article
            key={p.slug}
            className={`carousel-slide ${i === index ? "is-active" : ""}`}
            aria-hidden={i !== index}
            inert={i !== index}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${projects.length}: ${p.name}`}
          >
            <div className="slide-copy">
              <p className="slide-index">
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>
              <h3 className="slide-title">{p.name}</h3>
              <p className="slide-blurb">{p.blurb}</p>
              {p.tags.length > 0 && (
                <ul className="slide-tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              {p.caseStudy && (
                <a className="slide-link" href={`/work/${p.slug}`}>
                  read the case study <span className="arrow">→</span>
                </a>
              )}
            </div>
            <div className="slide-visual">
              <DeviceRig
                preload={i === 0}
                url={p.url}
                desktop={{
                  src: p.desktop,
                  alt: `${p.name} — desktop view`,
                }}
                mobile={{ src: p.mobile, alt: `${p.name} — mobile view` }}
              />
            </div>
          </article>
        ))}
      </div>

      <div className="carousel-progress" role="tablist" aria-label="projects">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`go to ${p.name}`}
            className={`progress-track ${i === index ? "is-active" : ""}`}
            onClick={() => goTo(i)}
          >
            <span
              className="progress-fill"
              ref={(el) => {
                barRefs.current[i] = el;
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
