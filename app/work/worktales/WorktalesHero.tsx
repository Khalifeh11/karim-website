"use client";

import Image from "next/image";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import PhoneFrame from "@/app/components/PhoneFrame";

export default function WorktalesHero() {
  return (
    <section className="case-hero page">
      <div className="case-hero-grid">
        <div className="case-hero-text">
          <SectionLabel num="01" as="p">
            case study
          </SectionLabel>

          <Reveal delay={0.1}>
            <h1 className="case-headline">
              worktales
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="case-sub">
              worktales were repositioning their consultancy — the old site no
              longer reflected who they were. redesigned the web presence from
              the ground up with a dark-themed, motion-driven layout built to
              communicate focus and authority.
            </p>
          </Reveal>

        </div>

        <Reveal delay={0.2} className="case-hero-img">
          <div className="case-devices">
            <Image
              src="/projects/worktales-macbook.png"
              alt="worktales — desktop preview"
              width={720}
              height={445}
              priority
              className="case-hero-screenshot"
            />
            <PhoneFrame
              src="/projects/worktales-mobile.png"
              alt="worktales — mobile preview"
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
              <span className="case-meta-value">redesign · svg</span>
            </div>
            <div className="case-meta-item">
              <span className="case-meta-label">live</span>
              <a
                className="case-meta-link preserve-case"
                href="https://work-tales.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                work-tales.pages.dev →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
