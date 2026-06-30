/** The cinematic title card. Sits transparently over the 3D canvas so the
 *  crystal reads behind the type. Static markup — the entrance is the preloader
 *  lifting away; the scroll cue is a pure CSS loop. */
export default function NoirHero() {
  return (
    <section className="noir-hero">
      <p className="noir-eyebrow" style={{ marginBottom: 22 }}>
        <span className="accent">◆</span>&nbsp;&nbsp;Portfolio — 2026
      </p>
      <h1 className="noir-hero-title">
        Karim
        <br />
        <span className="thin">Khalifeh</span>
      </h1>
      <p className="noir-hero-sub">Full-stack developer · Beirut</p>

      <div className="noir-scrollcue" aria-hidden="true">
        <span />
        Scroll
      </div>
    </section>
  );
}
