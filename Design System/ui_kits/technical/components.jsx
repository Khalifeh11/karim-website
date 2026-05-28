/* Components.jsx — Direction B (Technical) */

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
    case "arrow-up-right":
      return <svg {...props}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>;
    case "github":
      return <svg {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
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

function TopStrip() {
  return (
    <div className="topstrip">
      <div className="topstrip-inner">
        <div><span className="dot"></span> available for projects · April 2026</div>
        <div className="topstrip-right" style={{display: "flex", gap: 20}}>
          <span>Beirut · 33.89°N</span>
          <a href="#">github.com/karimk</a>
          <span>v 4.2.0</span>
        </div>
      </div>
    </div>
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
        <div className="brand" onClick={() => navigate("home")}>
          <div className="monogram">K</div>
          <div>
            <div className="name">Karim Khalifeh</div>
            <div className="role">full-stack developer</div>
          </div>
        </div>
        <nav className="nav-links">
          <a className={route === "home" ? "active" : ""} onClick={() => navigate("home")}>home</a>
          <a className={route === "work" ? "active" : ""} onClick={() => navigate("work")}>work</a>
          <a className={route === "about" ? "active" : ""} onClick={() => navigate("about")}>about</a>
          <a className={route === "contact" ? "active" : ""} onClick={() => navigate("contact")}>contact</a>
        </nav>
        <div className="header-right">
          <button className="theme-pill" onClick={toggleDark}>
            <Icon name={dark ? "sun" : "moon"} size={14} />
            <span>{dark ? "dark" : "light"}</span>
          </button>
          <Button variant="accent" withArrow onClick={() => navigate("contact")}>Book a call</Button>
        </div>
      </div>
    </header>
  );
}

function StatusPanel() {
  return (
    <div className="status-panel">
      <div className="sp-head">
        <span className="dot"></span>
        <span>karim.dev — status</span>
      </div>
      <div className="sp-row"><span className="sp-key">location</span><span className="sp-val">Beirut, Lebanon</span></div>
      <div className="sp-row"><span className="sp-key">timezone</span><span className="sp-val">EET — UTC+2</span></div>
      <div className="sp-row"><span className="sp-key">availability</span><span className="sp-val accent">open · April 2026</span></div>
      <div className="sp-row"><span className="sp-key">current_project</span><span className="sp-val">Halab Books v2</span></div>
      <div className="sp-row"><span className="sp-key">last_shipped</span><span className="sp-val">3d ago — payouts</span></div>
      <div className="sp-row"><span className="sp-key">response_time</span><span className="sp-val">~ 18 hours</span></div>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer page">
      <div className="col-block-f">
        <div className="footer-label">karim_khalifeh</div>
        <div>Beirut, Lebanon</div>
        <div>Available April 2026</div>
      </div>
      <div className="col-block-f">
        <div className="footer-label">elsewhere</div>
        <a href="mailto:hi@karim.dev">hi@karim.dev</a>
        <a href="#">github / karimk</a>
        <a href="#">read.cv / karim</a>
        <a href="#">x / @karimkdev</a>
      </div>
      <div className="col-block-f" style={{textAlign: "right"}}>
        <div className="footer-label">site</div>
        <div className="copyright">© 2026 · Geist · v4.2.0</div>
      </div>
    </footer>
  );
}

function SectionHead({ marker, label, meta, children }) {
  return (
    <div className="section-head">
      <div style={{display: "flex", flexDirection: "column", gap: 14}}>
        <div className="label"><span className="marker">{marker || "§"}</span>{label}</div>
        {children && <h2 className="section-title">{children}</h2>}
      </div>
      {meta && <div className="label">{meta}</div>}
    </div>
  );
}

function ProjectRow({ project, index, onOpen }) {
  return (
    <div className="project-row" onClick={() => onOpen(project.slug)}>
      <div className="pr-idx">{String(index + 1).padStart(2, "0")}</div>
      <div className="pr-thumb" style={{ background: project.image }}></div>
      <div>
        <div className="pr-title">{project.title}</div>
        <div className="pr-sub">{project.subtitle}</div>
      </div>
      <div className="pr-stack">
        {project.stack.slice(0, 4).map(s => <span key={s}>{s}</span>)}
      </div>
      <div className="pr-arrow">→</div>
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

Object.assign(window, { Icon, Button, TopStrip, Header, StatusPanel, Footer, SectionHead, ProjectRow, StackChips });
