import type { CSSProperties } from "react";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` } as CSSProperties);

export default function Hero() {
  return (
    <section className="hero page has-grid">
      <div className="hero-inner">
        <p className="availability fade-up">
          <span className="status-dot" aria-hidden="true" />
          <span>available for new projects — april 2026</span>
        </p>

        <h1 className="hero-headline fade-up" style={delay(80)}>
          fast, careful web work{" "}
          <span className="accent">for serious businesses.</span>
        </h1>

        <p className="hero-sub fade-up" style={delay(180)}>
          i&apos;m karim — a freelance full-stack developer based in beirut. i
          build production-grade websites and web apps for startups and small
          businesses, locally and abroad.
        </p>

        <div className="hero-actions fade-up" style={delay(260)}>
          <a className="btn btn-primary" href="#">
            book a call
            <span className="arrow">→</span>
          </a>
          <a className="btn btn-secondary" href="#">
            see selected work
          </a>
        </div>
      </div>
    </section>
  );
}
