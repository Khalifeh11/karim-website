"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DeviceRig from "./DeviceRig";
import { SectionLabel } from "./Reveal";
import { projects } from "../data/projects";

const SLIDE_MS = 7000;

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const paused = hovered || focused;

  const indexRef = useRef(0);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef(0); // 0..1 within the current slide
  const pausedRef = useRef(false);

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

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
        // Hover-pause is scoped to the slides — hovering the section header,
        // arrows, or progress bars shouldn't silently freeze the timer.
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
                url={`${p.slug}.com`}
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
