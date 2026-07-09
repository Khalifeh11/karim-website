import { Reveal, SectionLabel } from "./Reveal";

const services = [
  {
    name: "full builds",
    desc: "your product taken from first commit to launch. design, build, deploy — one person, no handoffs.",
  },
  {
    name: "web apps & saas",
    desc: "dashboards, multi-tenant platforms, and ai features that actually ship.",
  },
  {
    name: "redesigns",
    desc: "your site, rebuilt to match who you are now.",
  },
];

export default function Services() {
  return (
    <section id="services" className="services page has-grid section-glow">
      <header className="section-head">
        <SectionLabel num="02">what i do</SectionLabel>
      </header>

      <ul className="svc-list">
        {services.map((s, i) => (
          <li key={s.name}>
            <Reveal delay={i * 0.08}>
              <div className="svc-row">
                <span className="svc-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="svc-name">{s.name}</h3>
                <p className="svc-desc">{s.desc}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
