import { Reveal } from "../Reveal";
import MaskLines from "./MaskLines";

/** Magazine-style masthead statement set in the display serif. */
export default function EditorialHero() {
  return (
    <section className="ed-hero">
      <div className="ed-wrap">
        <Reveal y={16}>
          <div className="ed-hero-dateline">
            <span className="ed-eyebrow preserve-case">Full-stack developer</span>
            <span className="ed-eyebrow preserve-case">Beirut, Lebanon</span>
            <span className="ed-eyebrow">Selected work, 2022—2026</span>
          </div>
        </Reveal>

        <h1 className="preserve-case">
          <MaskLines
            trigger="mount"
            delay={0.12}
            className="ed-mask"
            lines={[
              "Fast, durable web apps",
              "for people who",
              <em key="em">ship things that matter.</em>,
            ]}
          />
        </h1>

        <div className="ed-hero-foot">
          <Reveal delay={0.16}>
            <p className="ed-lede preserve-case">
              I&apos;m Karim — a freelance full-stack developer building
              well-engineered websites and web apps for businesses around the
              world, from <strong>real-estate platforms</strong> to{" "}
              <strong>multi-tenant SaaS</strong>.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="ed-hero-cta">
              <a
                className="ed-btn ed-btn--solid preserve-case"
                href="mailto:karim.ah.khalifeh@gmail.com"
              >
                Start a project <span className="arr">→</span>
              </a>
              <a className="ed-btn preserve-case" href="#work">
                See selected work
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
