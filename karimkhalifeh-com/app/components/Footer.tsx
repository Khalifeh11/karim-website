export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner page">
        <span className="brand-mark">
          <span className="prompt">{">_"}</span>
          <span className="who preserve-case">karim_khalifeh</span>
        </span>
        <span className="footer-meta">
          full-stack developer · beirut · {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
