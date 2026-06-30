"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "../../data/projects";
import { Reveal } from "../Reveal";
import MaskLines from "./MaskLines";
import CountUp from "./CountUp";

const DEFAULT_SLUG = projects[0].slug;

/**
 * Numbered index of work — the centrepiece of the editorial homepage.
 * On desktop, a sticky panel on the right crossfades to whichever project the
 * cursor is over (it never follows the cursor, so nothing lingers). It rests on
 * the first project when the list isn't hovered. Hidden on narrow/touch layouts.
 */
export default function WorkIndex() {
  const [active, setActive] = useState(DEFAULT_SLUG);
  const activeProject =
    projects.find((p) => p.slug === active) ?? projects[0];

  return (
    <section className="ed-work" id="work">
      <div className="ed-wrap">
        <div className="ed-sec-head">
          <h2 className="preserve-case">
            <MaskLines className="ed-mask" lines={["Selected Work"]} />
          </h2>
          <span className="ed-eyebrow">
            (<CountUp to={projects.length} pad={2} duration={0.9} />)
          </span>
        </div>

        <div className="ed-work-grid">
          <ol
            className="ed-work-list"
            onMouseLeave={() => setActive(DEFAULT_SLUG)}
          >
            {projects.map((p, i) => {
              const num = String(i + 1).padStart(2, "0");
              const inner = (
                <>
                  <span className="ed-row-num">{num}</span>
                  <div className="ed-row-main">
                    <span className="ed-row-name preserve-case">
                      {p.displayName}
                    </span>
                    <div className="ed-row-tags preserve-case">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="ed-row-meta">
                    <span>{p.year}</span>
                    {p.caseStudy ? (
                      <span className="ed-row-arrow" aria-hidden>
                        ↗
                      </span>
                    ) : (
                      <span className="ed-soon">Soon</span>
                    )}
                  </div>
                </>
              );

              const handlers = {
                className: `ed-row${p.caseStudy ? "" : " ed-row--soon"}`,
                onMouseEnter: () => setActive(p.slug),
              };

              return (
                <li key={p.slug}>
                  <Reveal y={20}>
                    {p.caseStudy ? (
                      <Link href={`/work/${p.slug}`} {...handlers}>
                        {inner}
                      </Link>
                    ) : (
                      <div {...handlers}>{inner}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <aside className="ed-work-aside" aria-hidden="true">
            <div className="ed-work-panel">
              {projects.map((p) => (
                <Image
                  key={p.slug}
                  src={p.desktop}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 1px, 40vw"
                  className={`ed-work-shot${
                    p.slug === active ? " is-on" : ""
                  }`}
                />
              ))}
            </div>
            <div className="ed-work-cap">
              <span className="preserve-case">{activeProject.displayName}</span>
              <span>{activeProject.year}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
