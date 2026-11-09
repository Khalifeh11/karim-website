import { EMAIL, GITHUB, LINKEDIN, RESUME } from "../lib/links";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner page">
        <span className="brand-mark">
          <span className="prompt">{">_"}</span>
          <span className="who preserve-case">karim_khalifeh</span>
        </span>
        <nav className="footer-links" aria-label="social links">
          <a href={GITHUB} target="_blank" rel="noreferrer">
            github ↗
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            linkedin ↗
          </a>
          <a href={`mailto:${EMAIL}`}>email</a>
          <a href={RESUME} target="_blank" rel="noreferrer">
            résumé ↗
          </a>
        </nav>
        <span className="footer-meta">
          senior full-stack developer · beirut · {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
