import Link from "next/link";
import Preloader from "./components/editorial/Preloader";
import Cursor from "./components/editorial/Cursor";
import SoundController from "./components/editorial/SoundController";
import SceneCanvas from "./components/three/SceneCanvas";
import NoirNav from "./components/noir/NoirNav";
import NoirHero from "./components/noir/NoirHero";
import NoirWorkStrip from "./components/noir/NoirWorkStrip";
import NoirFooter from "./components/noir/NoirFooter";
import GsapReveal from "./components/scroll/GsapReveal";

export default function Home() {
  return (
    <div className="dir-noir">
      <Cursor />
      <SoundController />
      <Preloader />
      {/* The one 3D moment — fixed backdrop, only mounted on this route. */}
      <SceneCanvas />
      <NoirNav />

      <main>
        <NoirHero />
        <NoirWorkStrip />

        {/* About teaser */}
        <section className="noir-sheet noir-section">
          <div className="noir-wrap">
            <div className="noir-section-head">
              <GsapReveal as="p" className="noir-eyebrow">
                <span className="accent">02</span> — About
              </GsapReveal>
              <GsapReveal as="h2" className="noir-h2">
                Engineering that starts from the person using it.
              </GsapReveal>
            </div>
            <GsapReveal as="p" className="noir-p" delay={0.08}>
              I’m a full-stack developer in Beirut. I build production-grade web
              apps end to end — data model, backend, and interface — so the whole
              thing holds together instead of being stitched from parts that don’t
              quite fit.
            </GsapReveal>
            <GsapReveal delay={0.16}>
              <Link
                href="/about"
                className="noir-panel-link"
                style={{ marginTop: 28 }}
              >
                More about me →
              </Link>
            </GsapReveal>
          </div>
        </section>

        {/* Contact */}
        <section className="noir-sheet noir-section">
          <div className="noir-wrap">
            <div className="noir-section-head">
              <GsapReveal as="p" className="noir-eyebrow">
                <span className="accent">03</span> — Contact
              </GsapReveal>
              <GsapReveal as="h2" className="noir-h2">
                Let’s build something that lasts.
              </GsapReveal>
            </div>
            <GsapReveal delay={0.08}>
              <a
                href="mailto:karim@storiad.com"
                className="noir-panel-link preserve-case"
              >
                karim@storiad.com →
              </a>
            </GsapReveal>
          </div>
        </section>
      </main>

      <NoirFooter />
    </div>
  );
}
