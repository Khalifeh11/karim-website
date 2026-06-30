/** Shared Noir footer. Sits on an opaque sheet so it's never washed out by the
 *  fixed canvas behind it. */
export default function NoirFooter() {
  return (
    <footer className="noir-foot">
      <span className="preserve-case">© 2026 Karim Khalifeh — Beirut</span>
      <a href="mailto:karim@storiad.com" className="preserve-case">
        karim@storiad.com
      </a>
      <span>Full-stack developer</span>
    </footer>
  );
}
