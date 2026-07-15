import type { Metadata } from "next";
import type { CSSProperties } from "react";
import CaseEnd from "@/app/components/CaseEnd";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import { getProject } from "@/app/data/projects";
import GoldenLandHero from "./GoldenLandHero";

const project = getProject("golden-land");

export const metadata: Metadata = {
  title: "golden land real estate — karim khalifeh",
  description:
    "a real-estate platform rebuilt in next.js and migrated off a legacy cms with zero data loss — public listings, a staff admin dashboard, and image uploads backed by cloudflare r2.",
  alternates: {
    canonical: "/work/golden-land",
  },
};

const FEATURES = [
  {
    num: "01",
    title: "Legacy migration",
    desc: "Moved the entire dataset off an aging ApostropheCMS platform with zero data loss: 7,953 properties, 57 agents, and 37K+ images.",
  },
  {
    num: "02",
    title: "Property listings",
    desc: "A complete browsable catalogue with property and agent detail pages — buyers find the right property without friction.",
  },
  {
    num: "03",
    title: "Staff admin dashboard",
    desc: "One internal dashboard where staff manage listings, agents, and contacts, so a listing goes from draft to live without touching a server.",
  },
  {
    num: "04",
    title: "Media pipeline",
    desc: "Images upload directly to Cloudflare R2, bypassing Vercel's upload-size limit entirely. No storage ceiling, no redeployment.",
  },
];

export default function GoldenLandPage() {
  return (
    <>
      <Header />
      <main className="case-tinted" style={{ "--scene-hue": project.themeHue } as CSSProperties}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <GoldenLandHero />

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
                  Golden Land ran on an aging ApostropheCMS platform, with years
                  of real inventory locked inside it. The stack was holding the
                  business back, but the data was too valuable to lose.
                </p>
                <p className="case-p">
                  The goal was a full rebuild in Next.js that carried the entire
                  legacy dataset across intact, then removed every technical
                  bottleneck between a staff member writing a listing and a buyer
                  finding it.
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
