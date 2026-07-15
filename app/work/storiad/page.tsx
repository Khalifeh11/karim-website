import type { Metadata } from "next";
import type { CSSProperties } from "react";
import CaseEnd from "@/app/components/CaseEnd";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import { getProject } from "@/app/data/projects";
import { JsonLd, workJsonLd } from "@/app/lib/jsonld";
import StoriadHero from "./StoriadHero";

const project = getProject("storiad");

const DESCRIPTION =
  "the logged-in app for self-published authors, built on laravel and react via inertia — ai-assisted writing, a press-contact database, self-publishing profit calculators, and stripe billing.";

export const metadata: Metadata = {
  title: "storiad",
  description: DESCRIPTION,
  alternates: {
    canonical: "/work/storiad",
  },
  openGraph: {
    title: "storiad — karim khalifeh",
    description: DESCRIPTION,
    url: "/work/storiad",
  },
};

const FEATURES = [
  {
    num: "01",
    title: "AI-assisted writing",
    desc: "A writing and chatbot feature helps authors draft and shape their content, turning a blank page into a starting point.",
  },
  {
    num: "02",
    title: "Contacts Database",
    desc: "A searchable media and press directory authors use to build outreach lists and pitch reviewers and bloggers directly.",
  },
  {
    num: "03",
    title: "Financial Calculators",
    desc: "Self-publishing profit tools — projected book worth and ROI, sales targets, and profit and loss — with charts and a public, embeddable version.",
  },
  {
    num: "04",
    title: "Author websites and billing",
    desc: "Author-website management alongside Stripe subscription billing, all inside one Inertia-driven dashboard.",
  },
];

export default function StoriadPage() {
  return (
    <>
      <JsonLd data={workJsonLd(project, DESCRIPTION)} />
      <Header />
      <main className="case-tinted" style={{ "--scene-hue": project.themeHue } as CSSProperties}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <StoriadHero />

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
                  Self-published authors have no single place to manage their
                  brand, their content, and their book promotion. The work is
                  scattered across tools that were never built for them.
                </p>
                <p className="case-p">
                  The goal was one logged-in app that pulls the whole author
                  workflow together: writing, outreach, the numbers behind a
                  launch, and the author&apos;s own website.
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
