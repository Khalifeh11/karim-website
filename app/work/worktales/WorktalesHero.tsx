"use client";

import { Fragment, ViewTransition } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Reveal, SectionLabel } from "@/app/components/Reveal";
import PhoneFrame from "@/app/components/PhoneFrame";
import { getProject } from "@/app/data/projects";

const project = getProject("worktales");

export default function WorktalesHero() {
  const { name, headline, blurb, tags, url, year, heroDesktop, heroMobile } =
    project;
  // Mirror of the carousel's gate: shared-element names must exist on only
  // one route's tree per commit, or React flags them as duplicates.
  const named = usePathname() === `/work/${project.slug}`;

  return (
    <section className="case-hero page">
      <div className="case-hero-grid">
        <div className="case-hero-text">
          <SectionLabel num="01" as="p">
            Case study
          </SectionLabel>

          {/* Keyed by name: React only untracks a shared-element name on
              unmount, so flipping `name` to undefined on a re-render would
              leak it in the registry and cause duplicate-name errors. */}
          <ViewTransition
            key={named ? "named" : "unnamed"}
            name={named ? `case-title-${project.slug}` : undefined}
            share="morph"
            default="none"
          >
            <h1 className="case-headline">
              {headline.split("\n").map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h1>
          </ViewTransition>

          <Reveal delay={0.18}>
            <p className="case-sub">{blurb}</p>
          </Reveal>
        </div>

        {/* No Reveal here — a mount fade would play inside the live
            view-transition snapshot and fight the phone morph. */}
        <div className="case-hero-img">
          <div className="case-devices">
            <Image
              src={heroDesktop}
              alt={`${name} — desktop preview`}
              width={720}
              height={445}
              preload
              className="case-hero-screenshot"
            />
            <ViewTransition
              key={named ? "named" : "unnamed"}
              name={named ? `case-phone-${project.slug}` : undefined}
              share="morph"
              default="none"
            >
              <PhoneFrame
                src={heroMobile}
                alt={`${name} — mobile preview`}
                className="case-phone"
                preload
                sizes="(max-width: 768px) 26vw, 16vw"
              />
            </ViewTransition>
          </div>
        </div>

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
