import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import TrubluHero from "./TrubluHero";

export const metadata: Metadata = {
  title: "trublu technical — karim khalifeh",
  description:
    "a full build for a technical services firm — a complete design converted into production with a clean, lead-focused layout.",
};

const FEATURES = [
  {
    num: "01",
    title: "design to production",
    desc: "took a finished design and turned it into a pixel-faithful, production-ready site — no compromises between mockup and build.",
  },
  {
    num: "02",
    title: "lead-focused layout",
    desc: "every section is structured to guide visitors toward enquiry, with clear calls to action that turn interest into leads.",
  },
  {
    num: "03",
    title: "responsive across devices",
    desc: "the layout holds up from wide desktop down to mobile, so the firm looks sharp wherever a prospect lands.",
  },
  {
    num: "04",
    title: "fast, clean delivery",
    desc: "built lean for quick load times and a frictionless first impression — the site feels as professional as the service behind it.",
  },
];

const STACK = ["next.js", "react", "typescript"];

export default function TrubluPage() {
  return (
    <>
      <Header />
      <main style={{ "--scene-hue": 200 } as CSSProperties}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <TrubluHero />

        {/* ── Overview ─────────────────────────────────────── */}
        <section className="case-section page">
          <div className="case-section-inner">
            <SectionLabel num="02" as="p">
              overview
            </SectionLabel>
            <div>
              <Reveal delay={0.08}>
                <h2 className="case-h2">the problem</h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="case-p">
                  trublu is a technical services firm that needed a web presence
                  matching the quality of their work. they had a complete design
                  but no production site to put it in front of prospects.
                </p>
                <p className="case-p">
                  the goal was a faithful, fast build that did more than look
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
              what was built
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
              the stack
            </SectionLabel>
            <Reveal delay={0.1}>
              <ul className="case-stack" aria-label="technologies used">
                {STACK.map((s) => (
                  <li key={s} className="case-stack-item">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── End CTA ──────────────────────────────────────── */}
        <div className="case-end page">
          <Reveal>
            <p className="case-end-label">explore more</p>
            <Link className="case-end-cta" href="/#work">
              <span className="case-end-title">back to all work</span>
              <span className="case-end-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
