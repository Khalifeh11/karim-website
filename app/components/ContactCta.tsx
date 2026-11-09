import { Reveal, SectionLabel } from "./Reveal";
import LocalTime from "./LocalTime";
import ContactForm from "./ContactForm";
import { CALENDLY, EMAIL, GITHUB, LINKEDIN, RESUME } from "../lib/links";

export default function ContactCta() {
  return (
    <section id="contact" className="contact-cta page has-grid section-glow">
      <SectionLabel num="04" as="p" className="contact-kicker">
        Contact
      </SectionLabel>
      <div className="contact-grid">
        <div className="contact-intro">
          <Reveal delay={0.1}>
            <h2 className="contact-headline">
              Hiring? <span className="accent">Let&apos;s talk.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <a
              className="btn btn-primary"
              href={RESUME}
              target="_blank"
              rel="noreferrer"
            >
              Résumé (PDF)
              <span className="arrow">→</span>
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="contact-form-col">
          <ContactForm />
        </Reveal>
        <Reveal delay={0.22} className="contact-skip-col">
          <div className="contact-alt contact-skip">
            <p className="contact-skip-label">or skip the form:</p>
            {CALENDLY && (
              <a href={CALENDLY} target="_blank" rel="noreferrer">
                Book a 30-min call <span className="arrow">→</span>
              </a>
            )}
            <a className="preserve-case" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.25} className="contact-meta-col">
          <div className="contact-meta">
            <LocalTime />
            <p className="contact-status">open to remote senior roles</p>
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
      </div>
    </section>
  );
}
