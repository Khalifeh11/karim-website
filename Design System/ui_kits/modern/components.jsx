/* Components.jsx — Direction A (Modern, dark-default) */

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
    default: return null;
  }
}

function Button({ variant = "primary", children, onClick, withArrow = false, className = "" }) {
  return (
    <button className={`btn btn-${variant} ${className}`} onClick={onClick}>
      {children}
      {withArrow && <span className="arrow">→</span>}
    </button>
  );
}

function FadeIn({ children, delay = 0, className = "", as: As = "div", ...rest }) {
  const style = { "--enter-delay": `${delay}ms`, ...(rest.style || {}) };
  return <As className={`fade-up ${className}`} {...rest} style={style}>{children}</As>;
}

/* =========================================================================
   NODE GRAPH — animated SVG, subtle pulse + traveling signal
   ========================================================================= */
const GRAPH = {
  size: 460,
  nodes: [
    { id: "next",    x: 105, y:  85,  label: "next" },
    { id: "ts",      x: 240, y:  60,  label: "ts" },
    { id: "edge",    x: 360, y: 120,  label: "edge" },
    { id: "pg",      x: 175, y: 175,  label: "pg" },
    { id: "redis",   x: 305, y: 215,  label: "redis" },
    { id: "stripe",  x: 95,  y: 270,  label: "stripe" },
    { id: "auth",    x: 220, y: 305,  label: "auth" },
    { id: "s3",      x: 360, y: 320,  label: "s3" },
    { id: "resend",  x: 130, y: 380,  label: "resend" },
  ],
  edges: [
    ["next", "ts"], ["next", "pg"], ["next", "stripe"], ["next", "auth"],
    ["ts", "edge"], ["edge", "redis"], ["pg", "redis"], ["pg", "auth"],
    ["pg", "stripe"], ["auth", "s3"], ["redis", "s3"], ["auth", "resend"],
    ["stripe", "resend"], ["edge", "s3"]
  ],
  /* Signal-traversal path — pre-defined to feel intentional */
  signalPath: ["next", "ts", "edge", "redis", "pg", "auth", "s3", "resend", "stripe", "next"],
};

function NodeGraph() {
  const nodeMap = React.useMemo(() => Object.fromEntries(GRAPH.nodes.map(n => [n.id, n])), []);
  // Build the signal polyline string from the predetermined path
  const signalPolyline = React.useMemo(() => {
    return GRAPH.signalPath.map(id => `${nodeMap[id].x},${nodeMap[id].y}`).join(" ");
  }, [nodeMap]);

  return (
    <div className="hero-graph-wrap" aria-hidden="true">
      <svg className="hero-graph" viewBox={`0 0 ${GRAPH.size} ${GRAPH.size}`}>
        {/* Edges */}
        {GRAPH.edges.map(([a, b], i) => {
          const A = nodeMap[a], B = nodeMap[b];
          return <line key={i} className="ng-edge" x1={A.x} y1={A.y} x2={B.x} y2={B.y} />;
        })}
        {/* Traveling signal — drawn as polyline w/ dasharray + dashoffset anim */}
        <polyline className="ng-signal" points={signalPolyline} />
        {/* Nodes */}
        {GRAPH.nodes.map((n, i) => (
          <g key={n.id}>
            <circle className="ng-node-bg" cx={n.x} cy={n.y} r="9" />
            <circle
              className="ng-node bright"
              cx={n.x} cy={n.y} r="3.5"
              style={{ animationDelay: `${(i * 280) % 3200}ms` }}
            />
            <text
              className="ng-label"
              x={n.x + 14} y={n.y + 4}
            >{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* =========================================================================
   HEADER — brand + numbered nav
   ========================================================================= */
function Header({ route, navigate, dark, toggleDark }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "work",    num: "01", label: "work" },
    { id: "about",   num: "02", label: "about" },
    { id: "contact", num: "03", label: "contact" },
  ];

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <div className="brand-mark" onClick={() => navigate("home")}>
          <span className="prompt">{'>_'}</span>
          <span className="who">karim_khalifeh</span>
        </div>
        <nav className="nav-numbered">
          {navItems.map(item => (
            <a
              key={item.id}
              className={route === item.id ? "active" : ""}
              onClick={() => navigate(item.id)}
            >
              <span className="num">{item.num}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="header-right">
          <button className="theme-pill" onClick={toggleDark} aria-label="Toggle theme">
            <Icon name={dark ? "sun" : "moon"} size={14} />
            <span>{dark ? "dark" : "light"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================================
   FOOTER — terminal status + columns
   ========================================================================= */
function Footer({ navigate }) {
  return (
    <div className="footer-wrap">
      <div className="footer-status">
        <div className="left">
          <span className="ok">all systems operational</span>
          <span>·</span>
          <span>last deploy 3d ago</span>
        </div>
        <div className="right">
          <span>beirut · utc+2</span>
          <span>·</span>
          <span>09:42</span>
        </div>
      </div>
      <footer className="footer">
        <div className="col-block-f footer-brand">
          <div className="footer-brand-line">
            <span className="prompt">{'>_'}</span> karim_khalifeh
          </div>
          <p>freelance full-stack developer.<br/>working from beirut on web projects for businesses around the world.</p>
          <div className="meta-line">© 2026 — karim khalifeh</div>
        </div>
        <div className="col-block-f">
          <div className="footer-label">site</div>
          <a onClick={() => navigate("work")}>01 / work</a>
          <a onClick={() => navigate("about")}>02 / about</a>
          <a onClick={() => navigate("contact")}>03 / contact</a>
        </div>
        <div className="col-block-f">
          <div className="footer-label">elsewhere</div>
          <a className="preserve-case" href="mailto:hi@karim.dev">hi@karim.dev</a>
          <a href="#">github</a>
          <a href="#">read.cv</a>
          <a href="#">x / @karimkdev</a>
        </div>
        <div className="col-block-f">
          <div className="footer-label">site_meta</div>
          <div>v 4.2.0 · build 0a3f1</div>
          <div>shipped: 18 mar 2026</div>
          <div>commit: <span className="preserve-case">0a3f1d2</span></div>
          <div className="meta-line">no cookies. no analytics.</div>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================================
   SECTION HEAD
   ========================================================================= */
function SectionHead({ num, label, title, aside, baseDelay = 0 }) {
  return (
    <div className="section-head">
      <div>
        <FadeIn delay={baseDelay}>
          <div className="section-label">
            {num && <span className="num">{num}</span>}
            <span>{label}</span>
          </div>
        </FadeIn>
        <FadeIn delay={baseDelay + 60} as="h2" className="section-title">
          {title}
        </FadeIn>
      </div>
      {aside && (
        <FadeIn delay={baseDelay + 120} as="p" className="section-aside">
          {aside}
        </FadeIn>
      )}
    </div>
  );
}

/* =========================================================================
   PROJECT CARD — large mockup-centered
   ========================================================================= */
function ProjectCard({ project, index, onOpen, fadeDelay = 0 }) {
  return (
    <FadeIn delay={fadeDelay} className="project-card" onClick={() => onOpen(project.slug)}>
      <div className="pc-meta-top">
        <div className="pc-id">
          <span className="num">{String(index + 1).padStart(2, "0")} /</span>
          <span>{project.client.toLowerCase()}</span>
          <span className="title preserve-case">— {project.title}</span>
        </div>
        <div className="pc-year">{project.year}</div>
      </div>
      <div className="pc-mockup">
        <div className="pc-chrome">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="url preserve-case">{project.url || `https://${project.slug}.dev`}</span>
        </div>
        <div className="pc-mockup-inner" style={{ background: project.image }} />
      </div>
      <div className="pc-bottom">
        <div className="pc-sub">{project.subtitle.toLowerCase()}</div>
        <div className="pc-stack">
          {project.stack.map(s => <span key={s} className="chip preserve-case">{s}</span>)}
        </div>
      </div>
      <div style={{marginTop: 14}}>
        <span className="pc-action">read case study <span className="pc-arrow">→</span></span>
      </div>
    </FadeIn>
  );
}

function StackChips({ stack }) {
  return (
    <div className="cs-chips">
      {stack.map(s => <span key={s} className="chip preserve-case">{s}</span>)}
    </div>
  );
}

Object.assign(window, {
  Icon, Button, FadeIn, NodeGraph,
  Header, Footer, SectionHead, ProjectCard, StackChips,
});
