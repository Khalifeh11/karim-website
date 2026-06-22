"use client";

import Image from "next/image";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import PhoneFrame from "@/app/components/PhoneFrame";

export default function StoriadHero() {
  return (
    <section className="case-hero page">
      <div className="case-hero-grid">
        <div className="case-hero-text">
          <SectionLabel num="01" as="p">
            case study
          </SectionLabel>

          <Reveal delay={0.1}>
            <h1 className="case-headline">
              storiad
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="case-sub">
              a multi-tenant saas for book marketing. built on laravel + react
              via inertia, with openai function-calling to automate campaign
              generation — each author gets an isolated, provisioned workspace.
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
                <span className="case-meta-value">laravel · inertia · react · openai</span>
              </div>
              <div className="case-meta-item">
                <span className="case-meta-label">live</span>
                <a
                  className="case-meta-link preserve-case"
                  href="https://app.storiad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  app.storiad.com →
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="case-hero-img">
          <div className="case-devices">
            <Image
              src="/projects/storiad-macbook.png"
              alt="storiad — desktop preview"
              width={720}
              height={445}
              priority
              className="case-hero-screenshot"
            />
            <PhoneFrame
              src="/projects/storiad-mobile.png"
              alt="storiad — mobile preview"
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
