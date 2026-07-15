import type { Metadata } from "next";
import type { CSSProperties } from "react";
import CaseEnd from "@/app/components/CaseEnd";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import { getProject } from "@/app/data/projects";
import StoriadHero from "./StoriadHero";

const project = getProject("storiad");

export const metadata: Metadata = {
  title: "storiad — karim khalifeh",
  description:
    "a multi-tenant saas for book marketing — laravel + react via inertia, with openai function-calling automating campaign generation per author.",
  alternates: {
    canonical: "/work/storiad",
  },
};

const FEATURES = [
  {
    num: "01",
    title: "Multi-tenant workspaces",
    desc: "Each author gets an isolated, provisioned workspace — their data, campaigns, and settings fully separated from every other tenant.",
  },
  {
    num: "02",
    title: "AI campaign generation",
    desc: "OpenAI function-calling automates campaign creation, turning a few inputs into structured marketing output without manual setup.",
  },
  {
    num: "03",
    title: "Inertia-driven UI",
    desc: "A Laravel back end paired with a React front end over Inertia — server-driven routing with the responsiveness of a single-page app.",
  },
  {
    num: "04",
    title: "Automated provisioning",
    desc: "New tenants are spun up and provisioned automatically, so onboarding an author needs no manual intervention.",
  },
];

export default function StoriadPage() {
  return (
    <>
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
                  Marketing a book is repetitive, manual work — and most authors
                  don&apos;t have the time or tooling to do it well. Storiad
                  needed a platform that could carry that load for many authors
                  at once, each in their own space.
                </p>
                <p className="case-p">
                  The goal was a multi-tenant SaaS that provisions a private
                  workspace per author and uses AI to turn campaign setup from a
                  chore into a few clicks.
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
