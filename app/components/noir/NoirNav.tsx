import Link from "next/link";

/** Minimal fixed nav. `mix-blend-mode: difference` (in CSS) keeps it legible
 *  whether it sits over the bright crystal or a dark content sheet. */
export default function NoirNav() {
  return (
    <nav className="noir-nav" aria-label="Primary">
      <Link href="/" className="noir-brand preserve-case">
        KK
      </Link>
      <div className="noir-nav-links">
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <a href="mailto:karim@storiad.com" className="preserve-case">
          Email
        </a>
      </div>
    </nav>
  );
}
