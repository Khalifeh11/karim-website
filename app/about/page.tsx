import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Cursor from "@/app/components/editorial/Cursor";
import NoirNav from "@/app/components/noir/NoirNav";
import NoirFooter from "@/app/components/noir/NoirFooter";
import GsapReveal from "@/app/components/scroll/GsapReveal";

export const metadata: Metadata = {
  title: "about — karim khalifeh",
  description:
    "Karim Khalifeh — a full-stack developer in Beirut building production-grade web apps that hold up as your business scales.",
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
    <div className="dir-noir">
      <Cursor />
      <NoirNav />

      <main>
        {/* Hero */}
        <section
          className="noir-section"
          style={{ paddingTop: "clamp(140px, 18vh, 220px)" } as CSSProperties}
        >
          <div className="noir-wrap">
            <GsapReveal as="p" className="noir-eyebrow">
              <span className="accent">◆</span>&nbsp;&nbsp;About
            </GsapReveal>
            <GsapReveal as="h1" className="noir-lead" delay={0.06} style={{ marginTop: 24 } as CSSProperties}>
              I build web apps that hold up as the business scales.
            </GsapReveal>
          </div>
        </section>

        {/* What I do */}
        <section className="noir-sheet noir-section">
          <div className="noir-wrap">
            <div className="noir-section-head">
              <GsapReveal as="p" className="noir-eyebrow">
                <span className="accent">02</span> — What I do
              </GsapReveal>
              <GsapReveal as="h2" className="noir-h2">
                Production-grade web apps, end to end.
              </GsapReveal>
            </div>
            <GsapReveal className="noir-prose" delay={0.08}>
              <p>
                I build full-stack web applications — owning the data model, the
                backend logic, and the interface — so the whole thing holds
                together instead of being stitched from parts that don’t quite
                fit. At Storiad I led the migration of a near-1,000-user
                publishing platform off WordPress onto a custom Laravel and React
                app, then shipped self-serve multi-tenant infrastructure that
                provisions a secured site per author on demand.
              </p>
              <p>
                I also build applied-AI features that earn their place: in-app
                assistants using LLM tool calling, structured outputs, and usage
                metering — not AI for its own sake, but to remove real, repetitive
                work. The goal on every project is the same: something that works
                on day one and won’t need rebuilding when the business grows.
              </p>
            </GsapReveal>
          </div>
        </section>

        {/* Background */}
        <section className="noir-sheet noir-section">
          <div className="noir-wrap">
            <div className="noir-section-head">
              <GsapReveal as="p" className="noir-eyebrow">
                <span className="accent">03</span> — Background
              </GsapReveal>
              <GsapReveal as="h2" className="noir-h2">
                A route into engineering through people.
              </GsapReveal>
            </div>
            <GsapReveal className="noir-prose" delay={0.08}>
              <p>
                I came to software from clinical and health psychology — an MSc
                from Bangor University before I moved into full-stack development.
                That background is less of a detour than it sounds: it left me with
                a habit of starting from the person using the thing, not the
                feature list.
              </p>
              <p>
                In practice that means asking what a user is actually trying to do
                before deciding what to build, and weighing how a system feels
                under load — not only whether it passes its tests. I work in
                English and Arabic natively, and in professional French.
              </p>
            </GsapReveal>
          </div>
        </section>

        {/* Toolkit */}
        <section className="noir-sheet noir-section">
          <div className="noir-wrap">
            <div className="noir-section-head">
              <GsapReveal as="p" className="noir-eyebrow">
                <span className="accent">04</span> — Toolkit
              </GsapReveal>
            </div>
            <div className="noir-skills">
              {TOOLKIT.map((group, i) => (
                <GsapReveal key={group.label} delay={i * 0.05}>
                  <p className="noir-skill-label">{group.label}</p>
                  <ul className="noir-skill-list" aria-label={group.label}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </GsapReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="noir-sheet noir-section">
          <div className="noir-wrap">
            <div className="noir-section-head">
              <GsapReveal as="p" className="noir-eyebrow">
                <span className="accent">05</span> — Contact
              </GsapReveal>
              <GsapReveal as="h2" className="noir-h2">
                Let’s build something that lasts.
              </GsapReveal>
            </div>
            <GsapReveal delay={0.08}>
              <a
                href="mailto:karim@storiad.com"
                className="noir-panel-link preserve-case"
              >
                karim@storiad.com →
              </a>
            </GsapReveal>
          </div>
        </section>
      </main>

      <NoirFooter />
    </div>
  );
}
