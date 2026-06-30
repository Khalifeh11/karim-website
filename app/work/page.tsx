import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { projects } from "@/app/data/projects";
import Cursor from "@/app/components/editorial/Cursor";
import NoirNav from "@/app/components/noir/NoirNav";
import NoirFooter from "@/app/components/noir/NoirFooter";
import NoirWorkStrip from "@/app/components/noir/NoirWorkStrip";
import GsapReveal from "@/app/components/scroll/GsapReveal";

export const metadata: Metadata = {
  title: "work — karim khalifeh",
  description:
    "Selected full-stack work by Karim Khalifeh — SaaS, real estate, and consultancy builds.",
};

export default function WorkPage() {
  return (
    <div className="dir-noir">
      <Cursor />
      <NoirNav />

      <main>
        <section
          className="noir-section"
          style={{ paddingTop: "clamp(140px, 18vh, 220px)" } as CSSProperties}
        >
          <div className="noir-wrap">
            <GsapReveal as="p" className="noir-eyebrow">
              <span className="accent">◆</span>&nbsp;&nbsp;Selected Work
            </GsapReveal>
            <GsapReveal
              as="h1"
              className="noir-h2"
              delay={0.06}
              style={{ marginTop: 18, fontSize: "clamp(2.6rem, 8vw, 6rem)" } as CSSProperties}
            >
              Work
            </GsapReveal>
            <GsapReveal as="p" className="noir-p" delay={0.12} style={{ marginTop: 22 } as CSSProperties}>
              A few things I’ve built and shipped — scroll the strip sideways, or
              browse the full list below.
            </GsapReveal>
          </div>
        </section>

        {/* Horizontal carousel (reuses the pinned filmstrip primitive) */}
        <NoirWorkStrip />

        {/* Full grid with scroll-triggered reveals */}
        <section className="noir-sheet noir-section">
          <div className="noir-wrap">
            <div className="noir-grid">
              {projects.map((p, i) => (
                <GsapReveal key={p.slug} delay={(i % 2) * 0.06}>
                  <Link href={`/work/${p.slug}`} className="noir-card">
                    <div className="noir-card-top">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span>{p.year}</span>
                    </div>
                    <h2 className="noir-card-title preserve-case">
                      {p.displayName}
                    </h2>
                    <p className="noir-p" style={{ fontSize: "0.98rem" } as CSSProperties}>
                      {p.blurb}
                    </p>
                    <div className="noir-panel-tags">
                      {p.tags.map((t) => (
                        <span className="noir-tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                </GsapReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <NoirFooter />
    </div>
  );
}
