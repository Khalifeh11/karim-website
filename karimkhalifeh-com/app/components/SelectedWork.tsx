import { projects } from "../data/projects";
import { Reveal, SectionLabel } from "./Reveal";

export default function SelectedWork() {
  return (
    <section id="selected-work" className="selected page">
      <header className="section-head">
        <SectionLabel num="02">all projects</SectionLabel>
        <a className="section-aside" href="/work">
          view the work page <span className="arrow">→</span>
        </a>
      </header>

      <ul className="work-index">
        {projects.map((p, i) => {
          const row = (
            <>
              <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="work-name">{p.name}</span>
              <span className="work-tags">{p.tags.join(" · ") || "—"}</span>
              <span className="work-go" aria-hidden="true">
                {p.caseStudy ? "→" : "soon"}
              </span>
            </>
          );
          return (
            <li key={p.slug}>
              <Reveal delay={i * 0.08}>
                {p.caseStudy ? (
                  <a className="work-row" href={`/work/${p.slug}`}>
                    {row}
                  </a>
                ) : (
                  <div className="work-row is-static">{row}</div>
                )}
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
