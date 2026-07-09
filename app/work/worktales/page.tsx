import type { Metadata } from "next";
import type { CSSProperties } from "react";
import CaseEnd from "@/app/components/CaseEnd";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import { getProject } from "@/app/data/projects";
import WorktalesHero from "./WorktalesHero";

const project = getProject("worktales");

export const metadata: Metadata = {
  title: "worktales — karim khalifeh",
  description:
    "a ground-up redesign for a repositioning consultancy — a dark-themed, motion-driven web presence built to communicate focus and authority.",
  alternates: {
    canonical: "/work/worktales",
  },
};

const FEATURES = [
  {
    num: "01",
    title: "ground-up redesign",
    desc: "rebuilt the web presence from scratch to match the consultancy's new direction — the old site no longer reflected who they were.",
  },
  {
    num: "02",
    title: "dark, focused identity",
    desc: "a dark-themed layout sets a confident, premium tone that communicates focus and authority at a glance.",
  },
  {
    num: "03",
    title: "motion-driven layout",
    desc: "considered motion guides the eye through the story, giving the site momentum without distracting from the message.",
  },
  {
    num: "04",
    title: "crisp svg visuals",
    desc: "vector graphics keep visuals sharp at any size and load fast, reinforcing the polished, technical feel.",
  },
];

export default function WorktalesPage() {
  return (
    <>
      <Header />
      <main className="case-tinted" style={{ "--scene-hue": project.themeHue } as CSSProperties}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <WorktalesHero />

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
                  worktales were repositioning their consultancy, but their old
                  site no longer reflected who they were. it undersold a sharper,
                  more focused business.
                </p>
                <p className="case-p">
                  the goal was a web presence that matched the new direction — a
                  dark-themed, motion-driven layout built to communicate focus
                  and authority from the first scroll.
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
