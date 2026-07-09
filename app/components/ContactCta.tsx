import { Reveal, SectionLabel } from "./Reveal";
import LocalTime from "./LocalTime";
import {
  CALENDLY,
  EMAIL,
  GITHUB,
  LINKEDIN,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from "../lib/links";

export default function ContactCta() {
  return (
    <section id="contact" className="contact-cta page has-grid section-glow">
      <SectionLabel num="04" as="p" className="contact-kicker">
        contact
      </SectionLabel>
      <Reveal delay={0.1}>
        <h2 className="contact-headline">
          have a project in mind?{" "}
          <span className="accent">let&apos;s talk.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="hero-actions">
          <a
            className="btn btn-primary preserve-case"
            href={`mailto:${EMAIL}`}
          >
            {EMAIL}
            <span className="arrow">→</span>
          </a>
          {WHATSAPP_NUMBER && (
            <a
              className="btn btn-secondary"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              whatsapp
              <span className="arrow">→</span>
            </a>
          )}
        </div>
      </Reveal>
      {CALENDLY && (
        <Reveal delay={0.25}>
          <p className="contact-alt">
            or{" "}
            <a href={CALENDLY} target="_blank" rel="noreferrer">
              book a 30-min intro call <span className="arrow">→</span>
            </a>
          </p>
        </Reveal>
      )}
      <Reveal delay={0.3}>
        <div className="contact-meta">
          <LocalTime />
          <p className="contact-status">replies within 24h</p>
          <p className="contact-status contact-social">
            <a href={GITHUB} target="_blank" rel="noreferrer">
              github ↗
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              linkedin ↗
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
