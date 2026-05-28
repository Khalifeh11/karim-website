/* main.jsx — Direction C */

function App() {
  const projects = React.useMemo(() => {
    return JSON.parse(document.getElementById("projects-data").textContent);
  }, []);
  const [route, setRoute] = React.useState("home");
  const [slug, setSlug] = React.useState(null);
  const [dark, setDark] = React.useState(() => {
    try { return localStorage.getItem("kk-theme-c") === "dark"; } catch { return false; }
  });
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("kk-theme-c", dark ? "dark" : "light"); } catch {}
  }, [dark]);
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [route, slug]);

  const navigate = (r, s = null) => { setRoute(r); setSlug(s); };
  const currentProject = slug ? projects.find(p => p.slug === slug) : null;

  return (
    <>
      <Header route={route} navigate={navigate} dark={dark} toggleDark={() => setDark(d => !d)} />
      {route === "home" && <Home projects={projects} navigate={navigate} />}
      {route === "work" && <Work projects={projects} navigate={navigate} />}
      {route === "case" && <CaseStudy project={currentProject} navigate={navigate} />}
      {route === "about" && <About />}
      {route === "contact" && <Contact />}
      <Footer navigate={navigate} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
