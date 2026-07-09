"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeviceRig from "./DeviceRig";
import { SectionLabel } from "./Reveal";
import { playClick } from "./sound";
import { projects } from "../data/projects";

const SLIDE_MS = 7000;

export default function ProjectCarousel() {
  // Shared-element names must vanish the moment we leave the home route —
  // during the navigation commit the incoming case-study hero briefly
  // coexists with this carousel, and duplicate names break the transition.
  const onHome = usePathname() === "/";
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const paused = focused;

  const indexRef = useRef(0);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef(0); // 0..1 within the current slide
  const pausedRef = useRef(false);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const draggingRef = useRef(false);
  // A finished swipe still makes the browser fire a click on the element
  // under the finger; this flag swallows that one click.
  const swipedRef = useRef(false);
  const dragRef = useRef({ x: 0, y: 0, dx: 0, claimed: false, id: -1 });

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
      if (!pausedRef.current && !draggingRef.current && !document.hidden) {
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

  // Touch swipe: the active slide follows the finger (drag-follow), then
  // either snaps to the neighbour or springs back. Vertical scrolling stays
  // with the browser via `touch-action: pan-y`; a gesture is only claimed
  // once its horizontal travel beats its vertical.
  const activeSlideEl = () => slideRefs.current[indexRef.current];

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    swipedRef.current = false;
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      dx: 0,
      claimed: false,
      id: e.pointerId,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.claimed) {
      if (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(dy)) return;
      d.claimed = true;
      draggingRef.current = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // capture is best-effort; the handlers work uncaptured too
      }
    }
    d.dx = dx;
    const el = activeSlideEl();
    if (el) {
      el.style.transition = "none";
      el.style.transform = `translateX(${dx * 0.55}px)`;
      el.style.opacity = String(Math.max(0.35, 1 - Math.abs(dx) / 480));
    }
  };

  const onPointerEnd = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (e.pointerId !== d.id) return;
    d.id = -1;
    const el = activeSlideEl();
    if (el) {
      el.style.transition = "";
      el.style.transform = "";
      el.style.opacity = "";
    }
    if (!d.claimed) return;
    draggingRef.current = false;
    swipedRef.current = true;
    if (Math.abs(d.dx) > 60) {
      goTo(indexRef.current + (d.dx < 0 ? 1 : -1));
      playClick();
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (!swipedRef.current) return;
    swipedRef.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onClickCapture={onClickCapture}
      >
        {projects.map((p, i) => (
          <article
            key={p.slug}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
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
              {/* Names are only paired on the active slide so a hidden
                  slide can never be the source of a cross-page morph.
                  Keyed by name: React only untracks a name on unmount, so
                  flipping `name` to undefined on a re-render would leak it
                  in the registry and cause duplicate-name errors later. */}
              <ViewTransition
                key={onHome && i === index ? "named" : "unnamed"}
                name={onHome && i === index ? `case-title-${p.slug}` : undefined}
                share="morph"
                default="none"
              >
                <h3 className="slide-title">{p.name}</h3>
              </ViewTransition>
              <p className="slide-blurb">{p.blurb}</p>
              {p.tags.length > 0 && (
                <ul className="slide-tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              {p.caseStudy && (
                <Link className="slide-link" href={`/work/${p.slug}`}>
                  read the case study <span className="arrow">→</span>
                </Link>
              )}
            </div>
            <div className="slide-visual">
              <DeviceRig
                preload={i === 0}
                url={p.url}
                phoneTransitionName={
                  onHome && i === index ? `case-phone-${p.slug}` : undefined
                }
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
