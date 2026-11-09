"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Reveal, SectionLabel } from "@/app/components/Reveal";

const HEADLINE = "Four years owning\na production backend.";

export default function AboutHero() {
  return (
    <section className="case-hero page">
      <div className="case-hero-grid">
        <div className="case-hero-text">
          <SectionLabel num="01" as="p">
            About
          </SectionLabel>

          <Reveal delay={0.1}>
            <h1 className="case-headline">
              {HEADLINE.split("\n").map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="case-sub">
              I&apos;m{" "}
              <span className="preserve-case">Karim</span>, a senior
              full-stack developer in Beirut. I&apos;ve built and maintained
              production web apps on Laravel, React, and Node, mostly owning the backend at Storiad. I&apos;m
              open to remote senior roles.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="case-hero-img">
          <div className="about-portrait">
            <Image
              src="/about-image.jpeg"
              alt="karim khalifeh"
              width={1440}
              height={1440}
              priority
              sizes="(max-width: 768px) 80vw, 38vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
