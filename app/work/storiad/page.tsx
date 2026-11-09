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
  "software developer at storiad since 2022 — owned the laravel backend of a ~1,000-user publishing platform: wordpress migration, openai-powered assistant with usage metering, per-seat stripe billing, and one-click author-site provisioning.";

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
    title: "Off WordPress",
    desc: "The product had run on WordPress since 2011. I rebuilt it as a Laravel/React app serving nearly 1,000 authors and publishers, and moved the data with a one-time importer: WP exports to CSV, one importer per table, original IDs preserved so every link between records survived. WordPress password hashes came across as-is and are re-hashed to Laravel's format on each user's first successful login, so nobody was forced to reset.",
  },
  {
    num: "02",
    title: "StoriA, the in-app assistant",
    desc: "It began as regex matching on the user's message. I replaced that with OpenAI tool calling: nine tools covering navigation, profile, books, contact lists, calendar and workflow state. The tool loop runs in the browser so data tools fire in parallel against the user's own logged-in session, and a sliding-window token manager keeps the system prompt while trimming the oldest turns to a 32k context. Laravel sits behind it as a metering proxy with per-user rate limits and monthly AI quotas per plan tier.",
  },
  {
    num: "03",
    title: "Publisher Edition",
    desc: "A B2B tier shipped as one release: a portal for publishers to manage authors, step into an author's account for editorial work, and run analytics, branding and white-label email. Seats bill through Stripe on custom Cashier code: one seat is one invite code, codes are minted only after Checkout succeeds, and revoking or transferring an author re-syncs the subscription quantity. Each publisher gets its own OpenAI project and service account via the Admin API, with per-call cost recorded locally from a price table.",
  },
  {
    num: "04",
    title: "Author sites and the public demo",
    desc: "One click from the dashboard provisions an SSL-secured site at handle.storiad.com: Laravel calls a WordPress endpoint I built that drives the Forge API, polls until the site answers, then queues one job per book to push the catalogue across. The public demo runs on its own host: middleware signs every request in as the demo user with nothing in the session, a second layer blocks all writes, and an hourly job deep-copies a live account in one transaction, skipping the run when a row-count fingerprint says nothing changed.",
  },
  {
    num: "05",
    title: "Author tooling",
    desc: "A ~67k-row press-contact database with filtered search, bookmarks, dead-link reporting and a link checker, plus spreadsheet import for an author's own lists. Three self-publishing calculators: a sales funnel, book worth with a discounted-cash-flow chart, and P&L by format. The sales calculator is public and embeddable, with framing allowed only on public routes. AI writing on top: blog posts, social post ideas, book descriptions and an audience profile wizard.",
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
                <h2 className="case-h2">My role</h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="case-p">
                  Storiad is where I&apos;ve worked since April 2022. Self-published
                  authors had no single place to manage their brand, content,
                  and book promotion; the product is one logged-in app that
                  pulls that workflow together.
                </p>
                <p className="case-p">
                  I own the Laravel backend architecture and data layer — core
                  application logic, data modeling, and queued jobs — and
                  partner with the design team to ship the React interface.
                  Below is what I built along the way.
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
          <div className="case-feature-rows">
            {FEATURES.map((f, i) => (
              <Reveal key={f.num} delay={i * 0.07}>
                <div className="case-feature-row">
                  <div className="case-feature-row-head">
                    <p className="case-feature-num">{f.num}</p>
                    <h3 className="case-feature-title">{f.title}</h3>
                  </div>
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
