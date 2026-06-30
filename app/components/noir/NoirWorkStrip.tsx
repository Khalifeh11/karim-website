"use client";

import Link from "next/link";
import { projects } from "@/app/data/projects";
import HorizontalPin from "@/app/components/scroll/HorizontalPin";

/**
 * The pinned vertical→horizontal "filmstrip" of selected work. Glass sheet so
 * the starfield parallaxes behind it while the camera dollies (driven by
 * `scrollState.horizontal`, which HorizontalPin publishes).
 */
export default function NoirWorkStrip() {
  return (
    <HorizontalPin className="noir-sheet--glass">
      <div className="noir-panel noir-panel--intro">
        <p className="noir-eyebrow">
          <span className="accent">01</span> — Selected Work
        </p>
        <h2 className="noir-panel-title" style={{ marginTop: 18 }}>
          Things I’ve shipped, end to end.
        </h2>
        <p className="noir-panel-blurb">
          Full-stack builds across SaaS, real estate, and consultancy.
        </p>
      </div>

      {projects.map((p, i) => (
        <article className="noir-panel" key={p.slug}>
          <span className="noir-panel-index">
            {String(i + 1).padStart(2, "0")} / {p.year}
          </span>
          <h3 className="noir-panel-title preserve-case">{p.displayName}</h3>
          <p className="noir-panel-blurb">{p.blurb}</p>
          <div className="noir-panel-tags">
            {p.tags.map((t) => (
              <span className="noir-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          {p.caseStudy && (
            <Link href={`/work/${p.slug}`} className="noir-panel-link">
              View case →
            </Link>
          )}
        </article>
      ))}
    </HorizontalPin>
  );
}
