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
              what i do
            </SectionLabel>
            <div>
              <Reveal delay={0.08}>
                <h2 className="case-h2">production-grade web apps, end to end</h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="case-p">
                  i build full-stack web applications — owning the data model,
                  the backend logic, and the interface — so the whole thing
                  holds together instead of being stitched from parts that
                  don&apos;t quite fit. at storiad i led the migration of a
                  near-1,000-user publishing platform off wordpress onto a custom
                  laravel and react app, then shipped self-serve multi-tenant
                  infrastructure that provisions a secured site per author on
                  demand.
                </p>
                <p className="case-p">
                  i also build applied-ai features that earn their place:
                  in-app assistants using llm tool calling, structured outputs,
                  and usage metering — not ai for its own sake, but to remove
                  real, repetitive work. the goal on every project is the same:
                  something that works on day one and won&apos;t need rebuilding
                  when the business grows.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Background ────────────────────────────────────── */}
        <section className="case-section page">
          <div className="case-section-inner">
            <SectionLabel num="03" as="p">
              background
            </SectionLabel>
            <div>
              <Reveal delay={0.08}>
                <h2 className="case-h2">a route into engineering through people</h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="case-p">
                  i came to software from clinical and health psychology — an
                  msc from bangor university before i moved into full-stack
                  development. that background is less of a detour than it
                  sounds: it left me with a habit of starting from the person
                  using the thing, not the feature list.
                </p>
                <p className="case-p">
                  in practice that means asking what a user is actually trying to
                  do before deciding what to build, and weighing how a system
                  feels under load — not only whether it passes its tests. i work
                  in english and arabic natively, and in professional french.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Toolkit ───────────────────────────────────────── */}
        <section className="case-section page">
          <div className="case-section-inner">
            <SectionLabel num="04" as="p">
              toolkit
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
