import type { Metadata } from "next";
import type { CSSProperties } from "react";
import CaseEnd from "@/app/components/CaseEnd";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import { getProject } from "@/app/data/projects";
import { JsonLd, workJsonLd } from "@/app/lib/jsonld";
import TrubluHero from "./TrubluHero";

const project = getProject("trublu");

const DESCRIPTION =
  "a marketing site for a beirut home-services firm — a supplied design converted into production, with per-service pages, a whatsapp booking funnel, and full technical seo.";

export const metadata: Metadata = {
  title: "trublu technical",
  description: DESCRIPTION,
  alternates: {
    canonical: "/work/trublu",
  },
  openGraph: {
    title: "trublu technical — karim khalifeh",
    description: DESCRIPTION,
    url: "/work/trublu",
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
    title: "Per-service pages",
    desc: "Dynamic pages for plumbing, electrical, HVAC, water heater, handyman, and custom jobs, each with its own copy and add-ons.",
  },
  {
    num: "03",
    title: "WhatsApp booking funnel",
    desc: "A WhatsApp CTA runs through the site as the primary booking channel, turning interest into a booked job in one tap.",
  },
  {
    num: "04",
    title: "Full technical SEO",
    desc: "Sitemap, structured data, OG images, and canonical URLs, so the firm surfaces cleanly in search and shares.",
  },
];

export default function TrubluPage() {
  return (
    <>
      <JsonLd data={workJsonLd(project, DESCRIPTION)} />
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
                  Trublu is a Beirut home-repair and maintenance service that
                  needed a site matching the quality of their work. They had a
                  complete design but no production site to put it in front of
                  homeowners.
                </p>
                <p className="case-p">
                  The goal was a faithful, fast build that did more than look
                  good — a layout engineered to turn visitors into booked jobs,
                  with WhatsApp as the booking channel.
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
