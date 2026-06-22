"use client";

import Image from "next/image";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import PhoneFrame from "@/app/components/PhoneFrame";

export default function TrubluHero() {
  return (
    <section className="case-hero page">
      <div className="case-hero-grid">
        <div className="case-hero-text">
          <SectionLabel num="01" as="p">
            case study
          </SectionLabel>

          <Reveal delay={0.1}>
            <h1 className="case-headline">
              trublu
              <br />
              technical
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="case-sub">
              a full build for a technical services firm — converted a complete
              design into production, with a clean layout optimised to turn
              visitors into leads.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="case-meta">
              <div className="case-meta-item">
                <span className="case-meta-label">year</span>
                <span className="case-meta-value">2024</span>
              </div>
              <div className="case-meta-item">
                <span className="case-meta-label">stack</span>
                <span className="case-meta-value">next.js · react · typescript</span>
              </div>
              <div className="case-meta-item">
                <span className="case-meta-label">live</span>
                <a
                  className="case-meta-link preserve-case"
                  href="https://trublutechnical.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  trublutechnical.com →
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="case-hero-img">
          <div className="case-devices">
            <Image
              src="/projects/turblue-macbook.png"
              alt="trublu technical — desktop preview"
              width={720}
              height={445}
              priority
              className="case-hero-screenshot"
            />
            <PhoneFrame
              src="/projects/trublu-mobile.png"
              alt="trublu technical — mobile preview"
              className="case-phone"
              priority
              sizes="(max-width: 768px) 26vw, 16vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
