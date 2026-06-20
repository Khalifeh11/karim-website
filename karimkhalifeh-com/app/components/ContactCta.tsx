import { Reveal, SectionLabel } from "./Reveal";

export default function ContactCta() {
  return (
    <section id="contact" className="contact-cta page has-grid">
      <SectionLabel num="03" as="p" className="contact-kicker">
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
            href="mailto:karim@storiad.com"
          >
            karim@storiad.com
            <span className="arrow">→</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
