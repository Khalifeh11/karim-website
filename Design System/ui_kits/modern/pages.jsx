/* Pages.jsx — Direction A (Modern) — dark-default, lowercase, terminal motif */

function Home({ projects, navigate }) {
  return (
    <main>
      {/* Hero */}
      <section className="hero page">
        <div className="hero-grid">
          <div>
            <FadeIn className="terminal-line">
              <span className="status-dot" />
              <span><span className="prompt">{'>_'}</span> available for new projects — april 2026<span className="cursor-blink">_</span></span>
            </FadeIn>
            <FadeIn delay={80} as="h1" className="hero-headline">
              fast, careful web work <span className="accent">for serious businesses.</span>
            </FadeIn>
            <FadeIn delay={180} as="p" className="hero-sub">
              i'm karim — a freelance full-stack developer based in beirut.
              i build production-grade websites and web apps for startups
              and small businesses, locally and abroad.
            </FadeIn>
            <FadeIn delay={260} className="hero-actions">
              <Button variant="primary" withArrow onClick={() => navigate("contact")}>book a call</Button>
              <Button variant="secondary" onClick={() => navigate("work")}>see selected work</Button>
            </FadeIn>
          </div>
          <FadeIn delay={320}>
            <NodeGraph />
          </FadeIn>
        </div>
      </section>

      {/* Selected work — large cards */}
      <section className="section page">
        <SectionHead
          num="01 /"
          label="selected_work"
          title="four projects, leading with the strongest."
          aside="a small index from the last two years. each case study lays out the problem, the build, and what happened in real numbers."
        />
        <div className="project-cards">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              onOpen={(slug) => navigate("case", slug)}
              fadeDelay={i * 80}
            />
          ))}
        </div>
      </section>

      {/* How I work */}
      <section className="section page">
        <SectionHead
          num="02 /"
          label="how_i_work"
          title="a calm process, in three phases."
          aside="six to ten weeks for a typical project. you'll know what's happening every friday — and what's not."
        />
        <div className="process">
          <FadeIn delay={0} className="process-item">
            <div className="process-num">phase 01 / scope</div>
            <h3 className="process-title">a week of questions.</h3>
            <p className="process-body">
              before i quote anything, we spend a week mapping the work.
              i want to understand the business, the people who'll use
              what we build, and what success looks like in numbers.
            </p>
          </FadeIn>
          <FadeIn delay={90} className="process-item">
            <div className="process-num">phase 02 / build</div>
            <h3 className="process-title">in the open, every friday.</h3>
            <p className="process-body">
              a working build url from week one. a friday email with what shipped,
              what's next, and any decisions that need you. no surprises at the end.
            </p>
          </FadeIn>
          <FadeIn delay={180} className="process-item">
            <div className="process-num">phase 03 / ship</div>
            <h3 className="process-title">yours, then quiet.</h3>
            <p className="process-body">
              a codebase you can maintain — documented, tested, owned by you.
              thirty days of free support, then we figure out an ongoing
              arrangement if you want one.
            </p>
          </FadeIn>
        </div>

        {/* CTA */}
        <FadeIn delay={140} className="cta-block">
          <h2 className="cta-title">have a project <span className="accent">in mind?</span></h2>
          <div className="cta-side">
            <p className="cta-sub">
              book a 30-minute call. i'll ask a lot of questions and tell you
              honestly whether i'm the right person for the work.
            </p>
            <div className="cta-actions">
              <Button variant="primary" withArrow onClick={() => navigate("contact")}>book a call</Button>
              <Button variant="secondary" onClick={() => navigate("contact")}>send a brief</Button>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}

function Work({ projects, navigate }) {
  return (
    <main>
      <section className="hero page" style={{paddingBottom: 64}}>
        <FadeIn className="terminal-line">
          <span><span className="prompt">{'>_'}</span> ls ~/work · 4 items</span>
        </FadeIn>
        <FadeIn delay={80} as="h1" className="hero-headline" style={{maxWidth: "20ch"}}>
          a small index of recent work.
        </FadeIn>
      </section>
      <section className="page" style={{paddingBottom: 120}}>
        <div className="project-cards">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              onOpen={(slug) => navigate("case", slug)}
              fadeDelay={i * 80}
            />
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
        <FadeIn as="a" className="cs-back" onClick={() => navigate("work")}>
          <span className="prompt">{'>_'}</span> cd .. <span style={{opacity: 0.7}}>back to work</span>
        </FadeIn>
        <FadeIn delay={60} className="cs-meta-strip">
          <div className="item"><div className="k">client</div><div className="v">{project.client.toLowerCase()}</div></div>
          <div className="item"><div className="k">year</div><div className="v">{project.year}</div></div>
          <div className="item"><div className="k">duration</div><div className="v">{project.duration}</div></div>
          <div className="item"><div className="k">role</div><div className="v">{project.role.toLowerCase()}</div></div>
        </FadeIn>
        <FadeIn delay={120} as="h1" className="cs-title">{project.title.toLowerCase()}</FadeIn>
        <FadeIn delay={180} as="p" className="cs-subtitle">{project.subtitle.toLowerCase()}</FadeIn>
        <FadeIn delay={240} className="cs-cover" style={{ background: project.image }} />
      </section>

      <section className="cs-body">
        <FadeIn delay={0} className="cs-section">
          <div className="cs-label">
            <span className="num">01 /</span><span>problem</span>
          </div>
          <h3>what was wrong.</h3>
          <p>{project.problem}</p>
        </FadeIn>
        <FadeIn delay={60} className="cs-section">
          <div className="cs-label">
            <span className="num">02 /</span><span>what_i_built</span>
          </div>
          <h3>the work.</h3>
          <p>{project.built}</p>
        </FadeIn>
        <FadeIn delay={120} className="cs-section">
          <div className="cs-label">
            <span className="num">03 /</span><span>results</span>
          </div>
          <h3>what happened.</h3>
          <div className="results-grid">
            {project.results.map(([n, d], i) => (
              <div key={i} className="result-cell">
                <div className="result-num">{n}</div>
                <div className="result-desc">{d.toLowerCase()}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={180} className="cs-section">
          <div className="cs-label">
            <span className="num">04 /</span><span>tech_stack</span>
          </div>
          <h3>what's underneath.</h3>
          <StackChips stack={project.stack} />
        </FadeIn>
        <FadeIn delay={240} className="cs-bottom">
          <a className="cs-back" onClick={() => navigate("work")}>
            <span className="prompt">{'>_'}</span> cd .. <span style={{opacity: 0.7}}>back</span>
          </a>
          <Button variant="primary" withArrow onClick={() => navigate("contact")}>start a project</Button>
        </FadeIn>
      </section>
    </main>
  );
}

function About() {
  return (
    <main>
      <section className="about-hero page">
        <div className="about-grid">
          <FadeIn className="about-portrait" />
          <div className="about-prose">
            <FadeIn delay={60} className="terminal-line">
              <span><span className="prompt">{'>_'}</span> cat about.md</span>
            </FadeIn>
            <FadeIn delay={120} as="h2">hello — i'm karim.</FadeIn>
            <FadeIn delay={180} as="p" className="lead">
              i'm a freelance full-stack developer based in beirut.
              i build fast, well-engineered websites and web apps for
              businesses around the world — from rare-book shops in
              the old city to investor portals for small funds.
            </FadeIn>
            <FadeIn delay={240} as="p">
              i've been building for the web for about ten years.
              before going freelance i worked at two startups, most recently
              as a senior engineer leading a team of four.
            </FadeIn>
            <FadeIn delay={300} as="p">
              i take on three or four projects a year. i work alone — no
              subcontractors, no white-labelled designers, no
              "team of fifteen specialists." if we work together, you work with me.
            </FadeIn>
            <FadeIn delay={360} className="about-aside">
              <div className="row"><div className="k">based in</div><div className="v">beirut, lebanon</div></div>
              <div className="row"><div className="k">working since</div><div className="v">2015</div></div>
              <div className="row"><div className="k">capacity</div><div className="v">3 — 4 projects / year</div></div>
              <div className="row"><div className="k">currently</div><div className="v">building halab books v2</div></div>
            </FadeIn>
            <FadeIn delay={420} as="p">
              when i'm not in front of a screen i'm probably with a book
              in hamra, or up the mountain road with my film camera.
              i'm slow to reply on sundays. sorry in advance.
            </FadeIn>
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
      <section className="hero page" style={{paddingBottom: 32}}>
        <FadeIn className="terminal-line">
          <span><span className="prompt">{'>_'}</span> contact --new</span>
        </FadeIn>
        <FadeIn delay={80} as="h1" className="hero-headline" style={{maxWidth: "20ch"}}>
          let's talk about your <span className="accent">project.</span>
        </FadeIn>
        <FadeIn delay={180} as="p" className="hero-sub">
          book a 30-minute call, or send a short brief and i'll reply
          within two working days.
        </FadeIn>
      </section>

      <section className="page" style={{paddingBottom: 120}}>
        <div className="contact-grid">
          <FadeIn delay={60} className="contact-card">
            <h3>book a call</h3>
            <p>pick a 30-minute slot. calls happen on google meet; calendar invite arrives by email.</p>
            <div className="scheduler-mock">
              <div className="month">
                <span className="nav-arr">←</span>
                <span>april 2026</span>
                <span className="nav-arr">→</span>
              </div>
              <div className="grid7">
                {"m t w t f s s".split(" ").map((d, i) => <div className="dow" key={i}>{d}</div>)}
                {days.map((d, i) => {
                  if (d < 1 || d > 30) return <div className="day" key={i}></div>;
                  const isWeekend = i % 7 === 5 || i % 7 === 6;
                  const avail = !isWeekend && d > 14;
                  const cls = ["day", avail && "avail", d === day && "sel", d === 14 && "today"].filter(Boolean).join(" ");
                  return <div key={i} className={cls} onClick={() => avail && setDay(d)}>{d}</div>;
                })}
              </div>
              <div style={{marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6}}>
                {["10:00", "11:30", "14:00", "15:30", "17:00"].map((t, i) => (
                  <span key={t} className="chip preserve-case" style={{
                    fontFamily: "var(--font-mono)", fontSize: 11,
                    padding: "5px 12px", borderRadius: 9999,
                    border: "1px solid " + (i === 2 ? "var(--accent)" : "var(--border)"),
                    color: i === 2 ? "var(--accent)" : "var(--fg-2)",
                  }}>{t}</span>
                ))}
              </div>
            </div>
            <Button variant="primary" withArrow>confirm slot</Button>
          </FadeIn>

          <FadeIn delay={140} className="contact-card">
            <h3>send a brief</h3>
            <p>if a call feels premature, a few lines about your project are perfect.</p>
            <div className="field"><label>your name</label><input className="preserve-case" placeholder="Lina Hage"/></div>
            <div className="field"><label>email</label><input className="preserve-case" placeholder="lina@yourcompany.com"/></div>
            <div className="field">
              <label>budget</label>
              <select className="preserve-case" defaultValue="">
                <option value="">prefer not to say</option>
                <option>$5k–$15k</option>
                <option>$15k–$40k</option>
                <option>$40k+</option>
              </select>
            </div>
            <div className="field">
              <label>what are you building?</label>
              <textarea className="preserve-case" placeholder="A few lines is fine. What it is, who it's for, when you'd like it done."/>
            </div>
            <Button variant="primary" withArrow>send brief</Button>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Home, Work, CaseStudy, About, Contact });
