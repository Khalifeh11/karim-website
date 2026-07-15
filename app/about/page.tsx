import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactCta from "@/app/components/ContactCta";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import AboutHero from "./AboutHero";

export const metadata: Metadata = {
  title: "about — karim khalifeh",
  description:
    "karim khalifeh — a full-stack developer in beirut building production-grade web apps that hold up as your business scales.",
  alternates: {
    canonical: "/about",
  },
};

const TOOLKIT = [
  { label: "languages", items: ["javascript", "typescript", "php", "python", "sql"] },
  { label: "frontend", items: ["react", "next.js", "react native", "inertia.js", "tailwind"] },
  { label: "backend", items: ["laravel", "node.js"] },
  { label: "ai", items: ["llm tool calling", "structured outputs", "openai api"] },
  { label: "cloud & infra", items: ["aws", "cloudflare r2", "vercel", "laravel forge", "git"] },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ "--scene-hue": 148 } as CSSProperties}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <AboutHero />

        {/* ── What I do ────────────────────────────────────── */}
        <section className="case-section page">
          <div className="case-section-inner">
            <SectionLabel num="02" as="p">
              What I do
            </SectionLabel>
            <div>
              <Reveal delay={0.08}>
                <h2 className="case-h2">Production-grade web apps, end to end</h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="case-p">
                  I build full-stack web applications and own the whole thing:
                  the data model, the backend logic, and the interface. That way
                  it holds together instead of feeling stitched from parts that
                  don&apos;t quite fit. At Storiad I led the move of a
                  near-1,000-user publishing platform off WordPress and onto a
                  custom Laravel and React app, then built self-serve
                  multi-tenant infrastructure that spins up a secured site for
                  each author on demand.
                </p>
                <p className="case-p">
                  I also build AI features that earn their keep: in-app
                  assistants using LLM tool calling, structured outputs, and
                  usage metering. Not AI for its own sake, but to take real,
                  repetitive work off people&apos;s plates. The goal on every
                  project is the same. Ship something that works on day one and
                  won&apos;t need rebuilding as the business grows.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Background ────────────────────────────────────── */}
        <section className="case-section page">
          <div className="case-section-inner">
            <SectionLabel num="03" as="p">
              Background
            </SectionLabel>
            <div>
              <Reveal delay={0.08}>
                <h2 className="case-h2">I build for the person, not the feature list</h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="case-p">
                  Before I decide what to build, I ask what the person using it
                  is actually trying to do. It&apos;s a habit that keeps me from
                  shipping screens that technically work but leave someone stuck,
                  and it shapes everything from the data model up to the last bit
                  of copy.
                </p>
                <p className="case-p">
                  That instinct is partly where I come from: an MSc in clinical
                  and health psychology from Bangor University before I moved
                  into full-stack development. It&apos;s also why I pay attention
                  to how a system feels under real load, not just whether it
                  passes its tests. I work natively in English and Arabic, and
                  professionally in French, so building for mixed-language users
                  and teams is familiar ground.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Toolkit ───────────────────────────────────────── */}
        <section className="case-section page">
          <div className="case-section-inner">
            <SectionLabel num="04" as="p">
              Toolkit
            </SectionLabel>
            <div className="about-skills">
              {TOOLKIT.map((group, i) => (
                <Reveal key={group.label} delay={i * 0.06}>
                  <div className="about-skill-group">
                    <p className="about-skill-label">{group.label}</p>
                    <ul className="case-stack" aria-label={group.label}>
                      {group.items.map((item) => (
                        <li key={item} className="case-stack-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────── */}
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
