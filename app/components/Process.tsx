import { Reveal, SectionLabel } from "./Reveal";

const steps = [
  {
    name: "intro call",
    desc: "30 minutes, free. we talk through what you need and whether i'm the right fit.",
  },
  {
    name: "proposal",
    desc: "a fixed scope and quote in your inbox within 2–3 days. no surprises later.",
  },
  {
    name: "build",
    desc: "weekly demos on a live link — you watch it come together and steer as we go.",
  },
  {
    name: "launch",
    desc: "deploy, handoff, and 30 days of support after going live.",
  },
];

export default function Process() {
  return (
    <section id="process" className="process page has-grid section-glow">
      <header className="section-head">
        <SectionLabel num="03">how it works</SectionLabel>
      </header>

      <ol className="process-grid">
        {steps.map((s, i) => (
          <li key={s.name}>
            <Reveal delay={i * 0.08}>
              <div className="step">
                <span className="step-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="step-name">{s.name}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
