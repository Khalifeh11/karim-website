import { Reveal, SectionLabel } from "./Reveal";

const services = [
  {
    name: "full builds",
    desc: "your whole product, start to finish — designed, built, shipped, and kept running after launch. one person, no handoffs.",
  },
  {
    name: "web apps & saas",
    desc: "customer dashboards, client portals, and ai automations that cut real busywork — working software, not demos.",
  },
  {
    name: "redesigns",
    desc: "your site, rebuilt to make your offer clear, look credible, and give visitors an obvious next step.",
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
