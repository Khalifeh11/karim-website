/* Components.jsx — Direction C (Studio) */

function Icon({ name, size = 16 }) {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.5,
    strokeLinecap: "round", strokeLinejoin: "round"
  };
  switch (name) {
    case "sun":
      return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
    case "moon":
      return <svg {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
    case "arrow-right":
      return <svg {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
    default: return null;
  }
}

function Button({ variant = "primary", children, onClick, withArrow = false }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
      {withArrow && <span className="arrow">→</span>}
    </button>
  );
}

function Header({ route, navigate, dark, toggleDark }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <div className="brand-mark" onClick={() => navigate("home")}>
          <div className="monogram">KK</div>
          <div className="ampersand">/</div>
          <div className="name">studio of one, est. 2018</div>
        </div>
        <nav className="nav-links">
          <a className={route === "work" ? "active" : ""} onClick={() => navigate("work")}>work</a>
          <a className={route === "about" ? "active" : ""} onClick={() => navigate("about")}>about</a>
          <a className={route === "contact" ? "active" : ""} onClick={() => navigate("contact")}>contact</a>
        </nav>
        <div className="header-right">
          <button className="theme-pill" onClick={toggleDark}>
            <Icon name={dark ? "sun" : "moon"} size={14} />
            <span>{dark ? "dark" : "light"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer page">
      <div className="col-block-f footer-brand">
        <div className="monogram">KK</div>
        <p>A studio of one, working from Beirut on web work for businesses around the world.</p>
      </div>
      <div className="col-block-f">
        <div className="footer-label">studio</div>
        <a onClick={() => navigate("work")}>work</a>
        <a onClick={() => navigate("about")}>about</a>
        <a onClick={() => navigate("contact")}>contact</a>
      </div>
      <div className="col-block-f">
        <div className="footer-label">elsewhere</div>
        <a href="mailto:hi@karim.dev">hi@karim.dev</a>
        <a href="#">github</a>
        <a href="#">read.cv</a>
      </div>
      <div className="col-block-f" style={{textAlign: "right"}}>
        <div className="footer-label">colophon</div>
        <div className="copyright">Set in Bricolage<br/>Grotesque &amp; Geist.</div>
        <div className="copyright">© 2026</div>
      </div>
    </footer>
  );
}

function StudioNote() {
  return (
    <aside className="studio-note">
      <span className="date">— Studio note · 12 March 2026</span>
      <span className="body">
        I'm taking on three projects this year. Two slots filled, one open for April.
        Reading: <em>The Studio</em>, John Gruen. Listening: Khaled Joubran.
      </span>
    </aside>
  );
}

function SectionDivider({ children }) {
  return <div className="section-divider">— {children} —</div>;
}

function FeatureProject({ project, onOpen }) {
  return (
    <div className="feature-project" onClick={() => onOpen(project.slug)}>
      <div className="feature-img">
        <div className="img-inner" style={{ background: project.image }} />
        <div className="badge">featured · {project.year}</div>
      </div>
      <div className="feature-info">
        <div className="feature-meta">
          <span><b>{project.client}</b></span>
          <span>·</span>
          <span>{project.duration}</span>
          <span>·</span>
          <span>{project.role}</span>
        </div>
        <h3 className="feature-title">{project.title}</h3>
        <p className="feature-sub">{project.subtitle}</p>
        <div className="feature-read">read the case study →</div>
      </div>
    </div>
  );
}

function MiniProject({ project, index, onOpen }) {
  return (
    <div className="mini-project" onClick={() => onOpen(project.slug)}>
      <div className="mini-img">
        <div className="img-inner" style={{ background: project.image }} />
      </div>
      <div className="mini-meta">
        <span>0{index + 1} / {project.client}</span>
        <span>{project.year}</span>
      </div>
      <h4 className="mini-title">{project.title}</h4>
      <p className="mini-sub">{project.subtitle}</p>
    </div>
  );
}

function WorkCard({ project, index, onOpen }) {
  return (
    <div className="work-card" onClick={() => onOpen(project.slug)}>
      <div className="work-card-img">
        <div className="img-inner" style={{ background: project.image }} />
      </div>
      <div className="work-card-info">
        <div className="work-card-meta">
          <span>0{index + 1}</span>
          <span>·</span>
          <span><b>{project.client}</b></span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
        <h3 className="work-card-title">{project.title}</h3>
        <p className="work-card-sub">{project.subtitle}</p>
        <div className="feature-read">read the case study →</div>
      </div>
    </div>
  );
}

function StackChips({ stack }) {
  return (
    <div className="chips">
      {stack.map(s => <span key={s} className="chip">{s}</span>)}
    </div>
  );
}

Object.assign(window, { Icon, Button, Header, Footer, StudioNote, SectionDivider, FeatureProject, MiniProject, WorkCard, StackChips });
