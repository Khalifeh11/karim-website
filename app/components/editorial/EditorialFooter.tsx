/** Minimal mono colophon footer. */
export default function EditorialFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="ed-footer">
      <div className="ed-wrap ed-footer-inner">
        <span className="preserve-case">Karim Khalifeh — Beirut</span>
        <span className="preserve-case">
          Set in Fraunces &amp; Geist · {year}
        </span>
      </div>
    </footer>
  );
}
