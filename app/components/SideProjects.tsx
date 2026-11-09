import { Reveal, SectionLabel } from "./Reveal";
import { SIDE_PROJECTS } from "../data/experience";

export default function SideProjects() {
  return (
    <section id="projects" className="side-projects page has-grid section-glow">
      <header className="section-head">
        <SectionLabel num="03">Side projects</SectionLabel>
      </header>

      <ul className="exp-list">
        {SIDE_PROJECTS.map((p, i) => (
          <li key={p.name}>
            <Reveal delay={i * 0.08}>
              <div className="exp-row">
                <span className="exp-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="exp-name">{p.name}</h3>
                  <ul className="slide-tags exp-tags">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="exp-desc">{p.desc}</p>
                  <a
                    className="exp-link"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    source on github ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
