"use client";

import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { projects } from "../data/projects";
import { Reveal, SectionLabel } from "./Reveal";

const PREVIEW_W = 340;
const PREVIEW_H = 212;

export default function SelectedWork() {
  const [active, setActive] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Position is written straight to the element so pointer moves don't
  // re-render; the CSS transform transition gives it the trailing feel.
  const onMove = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    const x = Math.min(e.clientX + 28, window.innerWidth - PREVIEW_W - 24);
    const y = e.clientY - PREVIEW_H / 2;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const activeProject = projects.find((p) => p.slug === active);

  return (
    <section
      id="selected-work"
      className="selected page has-grid section-glow"
      onMouseMove={onMove}
    >
      <header className="section-head">
        <SectionLabel num="02">all projects</SectionLabel>
      </header>

      <ul className="work-index">
        {projects.map((p, i) => {
          const row = (
            <>
              <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="work-name">{p.name}</span>
              <span className="work-tags">{p.tags.join(" · ") || "—"}</span>
              <span className="work-go" aria-hidden="true">
                {p.caseStudy ? "→" : "soon"}
              </span>
            </>
          );
          return (
            <li key={p.slug}>
              <Reveal delay={i * 0.08}>
                {p.caseStudy ? (
                  <a
                    className="work-row"
                    href={`/work/${p.slug}`}
                    style={{ "--row-hue": p.themeHue } as CSSProperties}
                    onMouseEnter={() => setActive(p.slug)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {row}
                  </a>
                ) : (
                  <div className="work-row is-static">{row}</div>
                )}
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* Cursor-following screenshot preview; hidden on touch via CSS. */}
      <div
        ref={previewRef}
        className={`work-preview ${activeProject ? "is-visible" : ""}`}
        style={
          {
            "--row-hue": activeProject?.themeHue ?? 148,
            width: PREVIEW_W,
            height: PREVIEW_H,
          } as CSSProperties
        }
        aria-hidden="true"
      >
        {projects
          .filter((p) => p.caseStudy)
          .map((p) => (
            <Image
              key={p.slug}
              src={p.desktop}
              alt=""
              fill
              sizes={`${PREVIEW_W}px`}
              className={`work-preview-img ${p.slug === active ? "is-active" : ""}`}
            />
          ))}
      </div>
    </section>
  );
}
