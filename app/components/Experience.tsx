import { Reveal, SectionLabel } from "./Reveal";
import { HIGHLIGHTS, ROLE } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="experience page has-grid section-glow">
      <header className="section-head">
        <SectionLabel num="02">Experience</SectionLabel>
      </header>

      <Reveal>
        <div className="exp-role">
          <h3 className="exp-role-title">
            {ROLE.title} ·{" "}
            <a
              className="preserve-case"
              href={ROLE.url}
              target="_blank"
              rel="noreferrer"
            >
              {ROLE.company}
            </a>
          </h3>
          <p className="exp-role-meta">
            {ROLE.period} · {ROLE.location}
          </p>
        </div>
      </Reveal>

      <ul className="exp-list">
        {HIGHLIGHTS.map((h, i) => (
          <li key={h.name}>
            <Reveal delay={i * 0.06}>
              <div className="exp-row">
                <span className="exp-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="exp-name">{h.name}</h4>
                <p className="exp-desc">{h.desc}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
