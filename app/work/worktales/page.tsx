import type { Metadata } from "next";
import type { CSSProperties } from "react";
import CaseEnd from "@/app/components/CaseEnd";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import { getProject } from "@/app/data/projects";
import { JsonLd, workJsonLd } from "@/app/lib/jsonld";
import WorktalesHero from "./WorktalesHero";

const project = getProject("worktales");

const DESCRIPTION =
  "a full redesign of a b2b sales-talent site — rebuilt page by page for two audiences, employers and job-seeking salespeople, with a dark-themed, motion-driven layout.";

export const metadata: Metadata = {
  title: "worktales",
  description: DESCRIPTION,
  alternates: {
    canonical: "/work/worktales",
  },
  openGraph: {
    title: "worktales — karim khalifeh",
    description: DESCRIPTION,
    url: "/work/worktales",
  },
};

const FEATURES = [
  {
    num: "01",
    title: "Built for two audiences",
    desc: "One site speaking to both sides of the business: employers hiring sales talent, and salespeople looking for their next role.",
  },
  {
    num: "02",
    title: "Employer pillar pages",
    desc: "Diagnose, Develop, and Deliver — each pillar of the offering gets its own page, framing the value for businesses.",
  },
  {
    num: "03",
    title: "Candidate talent pool",
    desc: "A dedicated page inviting salespeople to join the talent pool, turning the site into a two-sided funnel.",
  },
  {
    num: "04",
    title: "Webinars library",
    desc: "A resource hub of live and on-demand sessions, plus an about page, all rewritten to match the client's brand voice.",
  },
];

export default function WorktalesPage() {
  return (
    <>
      <JsonLd data={workJsonLd(project, DESCRIPTION)} />
      <Header />
      <main className="case-tinted" style={{ "--scene-hue": project.themeHue } as CSSProperties}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <WorktalesHero />

        {/* ── Overview ─────────────────────────────────────── */}
        <section className="case-section page">
          <div className="case-section-inner">
            <SectionLabel num="02" as="p">
              Overview
            </SectionLabel>
            <div>
              <Reveal delay={0.08}>
                <h2 className="case-h2">The problem</h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="case-p">
                  Worktales, a B2B sales-talent company, had outgrown a site that
                  no longer reflected who they were or who they sell to. It
                  spoke to no one clearly.
                </p>
                <p className="case-p">
                  The goal was a full redesign, rebuilt page by page, that speaks
                  to both audiences at once: employers and job-seeking
                  salespeople. A dark-themed, motion-driven layout carries the
                  focus and authority the brand was missing.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── What was built ───────────────────────────────── */}
        <section className="case-section page">
          <div className="section-head">
            <SectionLabel num="03" as="p">
              What was built
            </SectionLabel>
          </div>
          <div className="case-features">
            {FEATURES.map((f, i) => (
              <Reveal key={f.num} delay={i * 0.07}>
                <div className="case-feature">
                  <p className="case-feature-num">{f.num}</p>
                  <h3 className="case-feature-title">{f.title}</h3>
                  <p className="case-feature-desc">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── The Stack ────────────────────────────────────── */}
        <section className="case-section page">
          <div className="case-section-inner">
            <SectionLabel num="04" as="p">
              The stack
            </SectionLabel>
            <Reveal delay={0.1}>
              <ul className="case-stack" aria-label="technologies used">
                {project.tags.map((s) => (
                  <li key={s} className="case-stack-item">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── End CTA ──────────────────────────────────────── */}
        <CaseEnd />
      </main>
      <Footer />
    </>
  );
}
