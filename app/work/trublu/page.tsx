import type { Metadata } from "next";
import type { CSSProperties } from "react";
import CaseEnd from "@/app/components/CaseEnd";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import { getProject } from "@/app/data/projects";
import TrubluHero from "./TrubluHero";

const project = getProject("trublu");

export const metadata: Metadata = {
  title: "trublu technical — karim khalifeh",
  description:
    "a full build for a technical services firm — a complete design converted into production with a clean, lead-focused layout.",
  alternates: {
    canonical: "/work/trublu",
  },
};

const FEATURES = [
  {
    num: "01",
    title: "Design to production",
    desc: "Took a finished design and turned it into a pixel-faithful, production-ready site — no compromises between mockup and build.",
  },
  {
    num: "02",
    title: "Lead-focused layout",
    desc: "Every section is structured to guide visitors toward enquiry, with clear calls to action that turn interest into leads.",
  },
  {
    num: "03",
    title: "Responsive across devices",
    desc: "The layout holds up from wide desktop down to mobile, so the firm looks sharp wherever a prospect lands.",
  },
  {
    num: "04",
    title: "Fast, clean delivery",
    desc: "Built lean for quick load times and a frictionless first impression — the site feels as professional as the service behind it.",
  },
];

export default function TrubluPage() {
  return (
    <>
      <Header />
      <main className="case-tinted" style={{ "--scene-hue": project.themeHue } as CSSProperties}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <TrubluHero />

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
                  Trublu is a technical services firm that needed a web presence
                  matching the quality of their work. They had a complete design
                  but no production site to put it in front of prospects.
                </p>
                <p className="case-p">
                  The goal was a faithful, fast build that did more than look
                  good — a layout engineered to convert visitors into leads.
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
