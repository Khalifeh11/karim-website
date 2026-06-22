"use client";

import Image from "next/image";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import PhoneFrame from "@/app/components/PhoneFrame";

export default function GoldenLandHero() {
  return (
    <section className="case-hero page">
      <div className="case-hero-grid">
        <div className="case-hero-text">
          <SectionLabel num="01" as="p">
            case study
          </SectionLabel>

          <Reveal delay={0.1}>
            <h1 className="case-headline">
              golden land
              <br />
              real estate
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="case-sub">
              built the full platform from scratch — property listings, agent
              dashboards, and media uploads backed by cloudflare r2. listings
              go from draft to live without touching a server.
            </p>
          </Reveal>

        </div>

        <Reveal delay={0.2} className="case-hero-img">
          <div className="case-devices">
            <Image
              src="/projects/Device - Macbook Air.png"
              alt="golden land real estate — desktop preview"
              width={720}
              height={445}
              priority
              className="case-hero-screenshot"
            />
            <PhoneFrame
              src="/projects/goldenland-mobile.png"
              alt="golden land real estate — mobile preview"
              className="case-phone"
              priority
              sizes="(max-width: 768px) 26vw, 16vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.3} className="case-hero-meta">
          <div className="case-meta">
            <div className="case-meta-item">
              <span className="case-meta-label">year</span>
              <span className="case-meta-value">2024</span>
            </div>
            <div className="case-meta-item">
              <span className="case-meta-label">stack</span>
              <span className="case-meta-value">next.js · cloudflare r2</span>
            </div>
            <div className="case-meta-item">
              <span className="case-meta-label">live</span>
              <a
                className="case-meta-link preserve-case"
                href="https://goldenlandrealestate.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                goldenlandrealestate.net →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
