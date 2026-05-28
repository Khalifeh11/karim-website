/* main.jsx — Direction A (Modern). Dark by default. */

function App() {
  const projects = React.useMemo(() => {
    return JSON.parse(document.getElementById("projects-data").textContent);
  }, []);

  const [route, setRoute] = React.useState("home");
  const [slug, setSlug] = React.useState(null);

  const [displayedRoute, setDisplayedRoute] = React.useState("home");
  const [displayedSlug, setDisplayedSlug] = React.useState(null);
  const [exiting, setExiting] = React.useState(false);

  // Dark mode is the DEFAULT
  const [dark, setDark] = React.useState(() => {
    try {
      const saved = localStorage.getItem("kk-theme-modern");
      if (saved === "light") return false;
      if (saved === "dark") return true;
      return true; // default = dark
    } catch { return true; }
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("kk-theme-modern", dark ? "dark" : "light"); } catch {}
  }, [dark]);

  React.useEffect(() => {
    if (route === displayedRoute && slug === displayedSlug) return;
    setExiting(true);
    const t = setTimeout(() => {
      setDisplayedRoute(route);
      setDisplayedSlug(slug);
      setExiting(false);
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 140);
    return () => clearTimeout(t);
  }, [route, slug, displayedRoute, displayedSlug]);

  const navigate = (r, s = null) => {
    if (r === route && s === slug) return;
    setRoute(r); setSlug(s);
  };

  const currentProject = displayedSlug ? projects.find(p => p.slug === displayedSlug) : null;

  return (
    <>
      <Header route={displayedRoute} navigate={navigate} dark={dark} toggleDark={() => setDark(d => !d)} />
      <div key={`${displayedRoute}-${displayedSlug || ""}`} className={`route-view ${exiting ? "exiting" : ""}`}>
        {displayedRoute === "home" && <Home projects={projects} navigate={navigate} />}
        {displayedRoute === "work" && <Work projects={projects} navigate={navigate} />}
        {displayedRoute === "case" && <CaseStudy project={currentProject} navigate={navigate} />}
        {displayedRoute === "about" && <About />}
        {displayedRoute === "contact" && <Contact />}
      </div>
      <Footer navigate={navigate} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
