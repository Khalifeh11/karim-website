import { Reveal } from "../Reveal";

/** Short statement + colophon-style facts. */
export default function EditorialAbout() {
  return (
    <section className="ed-about" id="about">
      <div className="ed-wrap ed-about-grid">
        <Reveal>
          <p className="ed-about-statement preserve-case">
            I care about the parts users never see — the schema, the edge cases,
            the load times — because that&apos;s what makes the parts they{" "}
            <em>do</em> see feel effortless.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="ed-colophon">
            <div className="ed-colophon-row">
              <dt>Services</dt>
              <dd className="preserve-case">
                Web apps · Marketing sites · Redesigns
              </dd>
            </div>
            <div className="ed-colophon-row">
              <dt>Stack</dt>
              <dd className="preserve-case">
                Next.js · React · TypeScript · Laravel
              </dd>
            </div>
            <div className="ed-colophon-row">
              <dt>Based in</dt>
              <dd className="preserve-case">Beirut — working worldwide</dd>
            </div>
            <div className="ed-colophon-row">
              <dt>Status</dt>
              <dd className="preserve-case">Available for new projects</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
