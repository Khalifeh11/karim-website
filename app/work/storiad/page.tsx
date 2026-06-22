import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import StoriadHero from "./StoriadHero";

export const metadata: Metadata = {
  title: "storiad — karim khalifeh",
  description:
    "a multi-tenant saas for book marketing — laravel + react via inertia, with openai function-calling automating campaign generation per author.",
};

const FEATURES = [
  {
    num: "01",
    title: "multi-tenant workspaces",
    desc: "each author gets an isolated, provisioned workspace — their data, campaigns, and settings fully separated from every other tenant.",
  },
  {
    num: "02",
    title: "ai campaign generation",
    desc: "openai function-calling automates campaign creation, turning a few inputs into structured marketing output without manual setup.",
  },
  {
    num: "03",
    title: "inertia-driven ui",
    desc: "a laravel back end paired with a react front end over inertia — server-driven routing with the responsiveness of a single-page app.",
  },
  {
    num: "04",
    title: "automated provisioning",
    desc: "new tenants are spun up and provisioned automatically, so onboarding an author needs no manual intervention.",
  },
];

const STACK = ["laravel", "inertia", "react", "openai"];

export default function StoriadPage() {
  return (
    <>
      <Header />
      <main style={{ "--scene-hue": 55 } as CSSProperties}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <StoriadHero />

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
                  marketing a book is repetitive, manual work — and most authors
                  don&apos;t have the time or tooling to do it well. storiad
                  needed a platform that could carry that load for many authors
                  at once, each in their own space.
                </p>
                <p className="case-p">
                  the goal was a multi-tenant saas that provisions a private
                  workspace per author and uses ai to turn campaign setup from a
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
