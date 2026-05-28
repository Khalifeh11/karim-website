/* Pages.jsx — Direction C */

function Home({ projects, navigate }) {
  const [featured, ...rest] = projects;
  return (
    <main>
      <section className="hero hero-vignette page">
        <div className="hero-eyebrow">
          <span className="dot"></span>
          <span>Beirut · est. 2018 · available April 2026</span>
        </div>
        <h1 className="hero-headline">
          A small studio building websites that <span className="italic">earn their keep</span>.
        </h1>
        <p className="hero-sub">
          I'm Karim — a freelance full-stack developer. I work with three or four
          clients a year on web work that needs to look right and pay back.
        </p>
        <div className="hero-actions">
          <Button variant="primary" withArrow onClick={() => navigate("contact")}>Book a call</Button>
          <Button variant="secondary" onClick={() => navigate("work")}>See selected work</Button>
        </div>
        <StudioNote />
      </section>

      <section className="section page">
        <SectionDivider>note one · the work</SectionDivider>
        <div className="section-head-c">
          <h2 className="section-title">
            Selected projects, leading with the <span className="italic">strongest.</span>
          </h2>
          <p className="section-aside">
            Four projects from 2024 and 2025. Each one ships with real numbers,
            not vibes — read the case studies for the full story.
          </p>
        </div>
        <FeatureProject project={featured} onOpen={(slug) => navigate("case", slug)} />
        <div className="mini-projects">
          {rest.map((p, i) => (
            <MiniProject key={p.slug} project={p} index={i + 1} onOpen={(slug) => navigate("case", slug)} />
          ))}
        </div>
      </section>

      <section className="section page">
        <SectionDivider>note two · the process</SectionDivider>
        <div className="section-head-c">
          <h2 className="section-title">
            A calm process, in <span className="italic">three phases.</span>
          </h2>
          <p className="section-aside">
            Most projects run six to ten weeks. You'll know what's happening
            every Friday — and what's not.
          </p>
        </div>
        <div className="process">
          <div className="process-item">
            <div className="process-num">phase 01 / scope</div>
            <h3 className="process-title">A week of questions.</h3>
            <p className="process-body">
              Before quoting, we spend a week mapping the work. I want to know
              the business, the people who'll use what we build, and what
              success looks like in numbers.
            </p>
          </div>
          <div className="process-item">
            <div className="process-num">phase 02 / build</div>
            <h3 className="process-title">In the open, every Friday.</h3>
            <p className="process-body">
              A working build URL from week one. A Friday email with what shipped,
              what's next, and any decisions that need you. No surprises at the end.
            </p>
          </div>
          <div className="process-item">
            <div className="process-num">phase 03 / ship</div>
            <h3 className="process-title">Yours, then quiet.</h3>
            <p className="process-body">
              A codebase you can maintain — documented, tested, owned by you.
              Thirty days of free support, then we figure out what's next.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-block page">
        <h2 className="cta-title">
          Have a project in <span className="italic">mind?</span>
        </h2>
        <p className="cta-sub">
          Book a 30-minute call. I'll ask a lot of questions and tell you
          honestly whether I'm the right person for it.
        </p>
        <div className="cta-actions">
          <Button variant="primary" withArrow onClick={() => navigate("contact")}>Book a call</Button>
          <Button variant="secondary" onClick={() => navigate("contact")}>Send a brief instead</Button>
        </div>
      </section>
    </main>
  );
}

function Work({ projects, navigate }) {
  return (
    <main>
      <section className="hero hero-vignette page" style={{paddingBottom: 48}}>
        <div className="hero-eyebrow"><span>all work · 2024 – 2025</span></div>
        <h1 className="hero-headline" style={{fontSize: "clamp(48px, 7vw, 88px)", maxWidth: "22ch"}}>
          A small index of <span className="italic">recent work.</span>
        </h1>
      </section>
      <section className="page" style={{paddingBottom: 120}}>
        <div className="work-stack">
          {projects.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} onOpen={(slug) => navigate("case", slug)} />
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
        <a className="cs-back" onClick={() => navigate("work")}>← all work</a>
        <div className="cs-meta-row">
          <span><b>{project.client}</b></span>
          <span>·</span>
          <span>{project.year}</span>
          <span>·</span>
          <span>{project.duration}</span>
          <span>·</span>
          <span>{project.role}</span>
        </div>
        <h1 className="cs-title">{project.title}</h1>
        <p className="cs-subtitle">{project.subtitle}</p>
        <div className="cs-cover" style={{ background: project.image }}></div>
      </section>

      <section className="cs-body page">
        <div className="cs-section">
          <div className="cs-label">— problem —</div>
          <h3>What was <span className="italic">wrong.</span></h3>
          <p>{project.problem}</p>
        </div>
        <div className="cs-section">
          <div className="cs-label">— what i built —</div>
          <h3>The <span className="italic">work.</span></h3>
          <p>{project.built}</p>
        </div>
        <div className="cs-section">
          <div className="cs-label">— results —</div>
          <h3>What <span className="italic">happened.</span></h3>
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
          <div className="cs-label">— tech stack —</div>
          <h3>What's <span className="italic">underneath.</span></h3>
          <StackChips stack={project.stack} />
        </div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 32, borderTop: "1px solid var(--border)"}}>
          <a className="cs-back" onClick={() => navigate("work")}>← back to work</a>
          <Button variant="primary" withArrow onClick={() => navigate("contact")}>Start a project</Button>
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
            <div className="hero-eyebrow"><span>about the studio</span></div>
            <h2>
              Hello — I'm <span className="italic">Karim.</span>
            </h2>
            <p className="lead">
              I'm a freelance full-stack developer based in Beirut.
              I build fast, well-engineered websites and web apps for businesses
              around the world — from rare-book shops in the old city to
              investor portals for small funds.
            </p>
            <p>
              I've been building for the web for about ten years.
              Before going freelance I worked at two startups (one
              you've heard of, one you haven't), most recently as a
              senior engineer leading a team of four.
            </p>
            <p>
              I take on three or four projects a year. I work alone — no
              subcontractors, no white-labelled designers, no
              "team of fifteen specialists." If we work together, you work with me.
            </p>
            <p>
              When I'm not in front of a screen I'm probably with a book in
              Hamra, or up the mountain road with my film camera.
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
      <section className="hero hero-vignette page" style={{paddingBottom: 32}}>
        <div className="hero-eyebrow"><span>contact</span></div>
        <h1 className="hero-headline" style={{fontSize: "clamp(48px, 7vw, 88px)", maxWidth: "22ch"}}>
          Let's talk about your <span className="italic">project.</span>
        </h1>
        <p className="hero-sub">
          Book a 30-minute call, or send a short brief and I'll reply within two working days.
        </p>
      </section>
      <section className="page" style={{paddingBottom: 120}}>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Book a call</h3>
            <p>Pick a 30-minute slot. Google Meet; invite arrives by email.</p>
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
            <Button variant="primary" withArrow>Confirm slot</Button>
          </div>

          <div className="contact-card">
            <h3>Send a brief</h3>
            <p>If a call feels premature, a few lines about your project are perfect.</p>
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
            <Button variant="primary" withArrow>Send brief</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Home, Work, CaseStudy, About, Contact });
