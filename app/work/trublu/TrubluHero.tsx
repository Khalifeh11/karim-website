"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import PhoneFrame from "@/app/components/PhoneFrame";
import { getProject } from "@/app/data/projects";

const project = getProject("trublu");

export default function TrubluHero() {
  const { name, headline, blurb, tags, url, year, heroDesktop, heroMobile } =
    project;

  return (
    <section className="case-hero page">
      <div className="case-hero-grid">
        <div className="case-hero-text">
          <SectionLabel num="01" as="p" display>
            case study
          </SectionLabel>

          <Reveal delay={0.1}>
            <h1 className="case-headline">
              {headline.split("\n").map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="case-sub">{blurb}</p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="case-hero-img">
          <div className="case-devices">
            <Image
              src={heroDesktop}
              alt={`${name} — desktop preview`}
              width={720}
              height={445}
              priority
              className="case-hero-screenshot"
            />
            <PhoneFrame
              src={heroMobile}
              alt={`${name} — mobile preview`}
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
              <span className="case-meta-value">{year}</span>
            </div>
            <div className="case-meta-item">
              <span className="case-meta-label">stack</span>
              <span className="case-meta-value">{tags.join(" · ")}</span>
            </div>
            <div className="case-meta-item">
              <span className="case-meta-label">live</span>
              <a
                className="case-meta-link preserve-case"
                href={`https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url} →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
