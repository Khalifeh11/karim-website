import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactCta from "@/app/components/ContactCta";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import AboutHero from "./AboutHero";
import { JsonLd, PERSON } from "@/app/lib/jsonld";

const DESCRIPTION =
  "karim khalifeh — senior full-stack developer in beirut. laravel, react, node, and applied ai. background, toolkit, education, and certifications.";

export const metadata: Metadata = {
  title: "about",
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "about — karim khalifeh",
    description: DESCRIPTION,
    url: "/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: PERSON,
};

// Mirrors the résumé's "languages & technologies" section.
const TOOLKIT = [
  { label: "languages", items: ["javascript", "typescript", "php", "python", "sql"] },
  { label: "frontend & mobile", items: ["react", "next.js", "react native", "inertia.js", "tailwind"] },
  { label: "backend", items: ["laravel", "node.js"] },
  { label: "ai", items: ["llm tool calling", "structured outputs", "context grounding", "rag (embeddings, bm25, contextual retrieval)", "mcp"] },
  { label: "payments & billing", items: ["stripe (subscriptions, webhooks)", "laravel cashier"] },
  { label: "databases", items: ["mysql", "postgresql", "mongodb"] },
  { label: "cloud & infra", items: ["aws (ec2, s3)", "cloudflare r2", "vercel", "laravel forge", "git"] },
];

const CREDENTIALS = [
  { label: "certifications", items: [
    { name: "ZAKA Certified AI Consultant", org: "ZAKA", year: "2026" },
    { name: "Foundations of DevOps", org: "SE Factory", year: "2024" },
    { name: "AWS Certified Cloud Practitioner", org: "AWS", year: "2024" },
  ] },
  { label: "education", items: [
    { name: "Full-Stack Web Development", org: "SE Factory, Lebanon", year: "2022" },
    { name: "MSc Clinical & Health Psychology", org: "Bangor University, Wales", year: "2018" },
    { name: "BA Psychology", org: "Lebanese American University, Beirut", year: "2016" },
  ] },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
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
                  repetitive work off people&apos;s plates. After four years on
                  one codebase, I write code for whoever opens the file next.
                  Usually that&apos;s me.
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

        {/* ── Credentials ───────────────────────────────────── */}
        <section className="case-section page">
          <div className="case-section-inner">
            <SectionLabel num="05" as="p">
              Credentials
            </SectionLabel>
            <div className="about-skills">
              {CREDENTIALS.map((group, i) => (
                <Reveal key={group.label} delay={i * 0.06}>
                  <div className="about-skill-group">
                    <p className="about-skill-label">{group.label}</p>
                    <ul className="about-creds" aria-label={group.label}>
                      {group.items.map((item) => (
                        <li key={item.name} className="about-cred">
                          <span className="about-cred-name">{item.name}</span>
                          <span className="about-cred-meta">
                            {item.org} · {item.year}
                          </span>
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
