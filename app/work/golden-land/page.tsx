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
    "full platform built from scratch — property listings, agent dashboards, and media uploads backed by cloudflare r2.",
  alternates: {
    canonical: "/work/golden-land",
  },
};

const FEATURES = [
  {
    num: "01",
    title: "Property listings",
    desc: "A complete browsable catalogue with filtering — buyers find the right property without friction.",
  },
  {
    num: "02",
    title: "Agent dashboards",
    desc: "Each agent gets a dedicated workspace to manage their listings, track status, and publish updates.",
  },
  {
    num: "03",
    title: "Media pipeline",
    desc: "Images upload directly to Cloudflare R2, bypassing the server entirely. No storage limits, no redeployment.",
  },
  {
    num: "04",
    title: "Zero-touch publishing",
    desc: "Listings go from draft to live without touching a server. The whole workflow is self-contained.",
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
                  Golden Land had no digital infrastructure. Listings were
                  managed manually, agents had no centralised workspace, and
                  putting a property online meant calling someone with server
                  access.
                </p>
                <p className="case-p">
                  The goal was a complete operational platform — one that removed
                  every technical bottleneck between an agent writing a listing
                  and a buyer finding it.
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
