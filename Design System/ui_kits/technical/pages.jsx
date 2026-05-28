/* Pages.jsx — Direction B */

function Home({ projects, navigate }) {
  return (
    <main>
      <section className="hero page">
        <div className="hero-grid">
          <div>
            <h1 className="hero-headline">
              Fast websites. Honest code. <span className="accent">Shipped on time.</span>
            </h1>
            <p className="hero-sub">
              I'm Karim — a freelance full-stack developer based in Beirut.
              I build production-grade web apps and marketing sites for
              startups and small businesses around the world.
            </p>
            <div className="hero-actions">
              <Button variant="accent" withArrow onClick={() => navigate("contact")}>Book a call</Button>
              <Button variant="secondary" onClick={() => navigate("work")}>See selected work →</Button>
            </div>
          </div>
          <StatusPanel />
        </div>
      </section>

      <section className="section page">
        <SectionHead marker="01" label="selected_work" meta="4 projects · 2024 — 2025">
          A small index of recent work, leading with the strongest.
        </SectionHead>
        <div className="project-rows">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} onOpen={(slug) => navigate("case", slug)} />
          ))}
        </div>
      </section>

      <section className="section page">
        <SectionHead marker="02" label="how_i_work" meta="3 phases · ~6–10 weeks">
          A calm process. No surprises, no scope-creep.
        </SectionHead>
        <div className="process">
          <div className="process-item">
            <div className="process-num">01 / scope</div>
            <h3 className="process-title">A week of questions.</h3>
            <p className="process-body">
              Before quoting, we map the work. I learn the business, the people who'll
              use what we build, and what success looks like in numbers.
            </p>
          </div>
          <div className="process-item">
            <div className="process-num">02 / build</div>
            <h3 className="process-title">In the open, every Friday.</h3>
            <p className="process-body">
              A working build URL from week one. A Friday email with what shipped,
              what's next, and any decisions that need you.
            </p>
          </div>
          <div className="process-item">
            <div className="process-num">03 / ship</div>
            <h3 className="process-title">Yours, then quiet.</h3>
            <p className="process-body">
              A codebase you can maintain — documented, tested, owned by you.
              Thirty days of free support, then we figure out what's next.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-block page">
        <div>
          <h2 className="cta-title">Have a project in mind?</h2>
        </div>
        <div className="cta-side">
          <p className="cta-sub">
            Book a 30-minute call. I'll ask a lot of questions and tell you
            honestly whether I'm the right person for it.
          </p>
          <div className="cta-actions">
            <Button variant="accent" withArrow onClick={() => navigate("contact")}>Book a call</Button>
            <Button variant="secondary" onClick={() => navigate("contact")}>Send a brief</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Work({ projects, navigate }) {
  return (
    <main>
      <section className="hero page" style={{paddingBottom: 32}}>
        <div className="label" style={{marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)"}}>
          <span style={{color: "var(--accent)", marginRight: 6}}>§</span>all_work
        </div>
        <h1 className="hero-headline" style={{fontSize: "clamp(40px, 5.5vw, 72px)", maxWidth: "24ch"}}>
          A small index of recent work.
        </h1>
      </section>
      <section className="page" style={{paddingBottom: 96}}>
        <div className="project-rows">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} onOpen={(slug) => navigate("case", slug)} />
          ))}
        </div>
      </section>
    </main>
  );
}

function CaseStudy({ project, navigate }) {
  if (!project) return null;
  return (
    <main>
      <section className="cs-hero page">
        <a className="cs-back" onClick={() => navigate("work")}>← all_work</a>
        <div className="cs-meta-strip">
          <div className="item"><div className="k">client</div><div className="v">{project.client}</div></div>
          <div className="item"><div className="k">year</div><div className="v">{project.year}</div></div>
          <div className="item"><div className="k">duration</div><div className="v">{project.duration}</div></div>
          <div className="item"><div className="k">role</div><div className="v">{project.role}</div></div>
        </div>
        <h1 className="cs-title">{project.title}</h1>
        <p className="cs-subtitle">{project.subtitle}</p>
        <div className="cs-cover" style={{ background: project.image }}></div>
      </section>

      <section className="cs-body page">
        <div className="cs-section">
          <div className="cs-label">// problem</div>
          <h3>What was wrong.</h3>
          <p>{project.problem}</p>
        </div>
        <div className="cs-section">
          <div className="cs-label">// what i built</div>
          <h3>The work.</h3>
          <p>{project.built}</p>
        </div>
        <div className="cs-section">
          <div className="cs-label">// results</div>
          <h3>What happened.</h3>
          <div className="results-grid">
            {project.results.map(([n, d], i) => (
              <div key={i} className="result-cell">
                <div className="result-num">{n}</div>
                <div className="result-desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="cs-section">
          <div className="cs-label">// tech stack</div>
          <h3>What's underneath.</h3>
          <StackChips stack={project.stack} />
        </div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid var(--border)"}}>
          <a className="cs-back" onClick={() => navigate("work")}>← back</a>
          <Button variant="accent" withArrow onClick={() => navigate("contact")}>Start a project</Button>
        </div>
      </section>
    </main>
  );
}

function About() {
  return (
    <main>
      <section className="about-hero page">
        <div className="about-grid">
          <div className="about-portrait" />
          <div className="about-prose">
            <div className="label" style={{fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)"}}>
              <span style={{color: "var(--accent)", marginRight: 6}}>§</span>about
            </div>
            <h2>Hello — I'm Karim.</h2>
            <p className="lead">
              I'm a freelance full-stack developer based in Beirut.
              I build fast, well-engineered websites and web apps for
              businesses around the world — from rare-book shops to
              investor portals.
            </p>
            <p>
              I've been building for the web for about ten years.
              Before going freelance I worked at two startups (one
              you've heard of, one you haven't), most recently as a
              senior engineer leading a team of four.
            </p>
            <p>
              I take on three or four projects a year. I work alone —
              no subcontractors, no white-labelled designers. If we work
              together, you work with me.
            </p>
            <p>
              When I'm not in front of a screen I'm probably with a
              book in Hamra, or up the mountain road with my film camera.
              I'm slow to reply on Sundays. Sorry in advance.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Contact() {
  const [day, setDay] = React.useState(18);
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  return (
    <main>
      <section className="hero page" style={{paddingBottom: 24}}>
        <div className="label" style={{marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)"}}>
          <span style={{color: "var(--accent)", marginRight: 6}}>§</span>contact
        </div>
        <h1 className="hero-headline" style={{fontSize: "clamp(40px, 5.5vw, 72px)", maxWidth: "22ch"}}>
          Let's talk about your project.
        </h1>
        <p className="hero-sub">
          Book a 30-minute call, or send a short brief and I'll reply
          within two working days.
        </p>
      </section>

      <section className="page" style={{paddingBottom: 96}}>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Book a call</h3>
            <p>Pick a 30-minute slot. Google Meet; calendar invite by email.</p>
            <div className="scheduler-mock">
              <div className="month">
                <span className="nav-arr">←</span>
                <span>April 2026</span>
                <span className="nav-arr">→</span>
              </div>
              <div className="grid7">
                {"M T W T F S S".split(" ").map((d, i) => <div className="dow" key={i}>{d}</div>)}
                {days.map((d, i) => {
                  if (d < 1 || d > 30) return <div className="day" key={i}></div>;
                  const isWeekend = i % 7 === 5 || i % 7 === 6;
                  const avail = !isWeekend && d > 14;
                  const cls = ["day", avail && "avail", d === day && "sel", d === 14 && "today"].filter(Boolean).join(" ");
                  return <div key={i} className={cls} onClick={() => avail && setDay(d)}>{d}</div>;
                })}
              </div>
              <div style={{marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6}}>
                {["10:00", "11:30", "14:00", "15:30", "17:00"].map((t, i) => (
                  <span key={t} className="chip" style={i === 2 ? {borderColor: "var(--accent)", color: "var(--accent)"} : {}}>{t}</span>
                ))}
              </div>
            </div>
            <Button variant="accent" withArrow>Confirm slot</Button>
          </div>

          <div className="contact-card">
            <h3>Send a brief</h3>
            <p>If a call feels premature, a few lines are perfect.</p>
            <div className="field"><label>name</label><input placeholder="Lina Hage"/></div>
            <div className="field"><label>email</label><input placeholder="lina@yourcompany.com"/></div>
            <div className="field">
              <label>budget</label>
              <select defaultValue="">
                <option value="">prefer not to say</option>
                <option>$5k–$15k</option>
                <option>$15k–$40k</option>
                <option>$40k+</option>
              </select>
            </div>
            <div className="field">
              <label>project</label>
              <textarea placeholder="A few lines is fine. What it is, who it's for, when you'd like it done."/>
            </div>
            <Button variant="accent" withArrow>Send brief</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Home, Work, CaseStudy, About, Contact });
