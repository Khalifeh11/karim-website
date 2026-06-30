import Link from "next/link";
import SoundToggle from "./SoundToggle";
import EditorialMobileNav from "./EditorialMobileNav";

/** Editorial top bar — serif nameplate + numbered mono nav. */
export default function EditorialMasthead() {
  return (
    <header className="ed-masthead">
      <div className="ed-wrap ed-masthead-inner">
        <Link href="/" className="ed-wordmark preserve-case">
          Karim Khalifeh<span className="dot">.</span>
        </Link>
        <nav className="ed-nav">
          <a className="ed-nav-link" href="#work">
            <span className="idx">01</span>
            <span className="ed-marquee">
              <span className="ed-marquee-row">Work</span>
              <span className="ed-marquee-row" aria-hidden="true">
                Work
              </span>
            </span>
          </a>
          <Link className="ed-nav-link" href="/about">
            <span className="idx">02</span>
            <span className="ed-marquee">
              <span className="ed-marquee-row">About</span>
              <span className="ed-marquee-row" aria-hidden="true">
                About
              </span>
            </span>
          </Link>
          <a className="ed-nav-link" href="#contact">
            <span className="idx">03</span>
            <span className="ed-marquee">
              <span className="ed-marquee-row">Contact</span>
              <span className="ed-marquee-row" aria-hidden="true">
                Contact
              </span>
            </span>
          </a>
          <SoundToggle />
        </nav>
        <EditorialMobileNav />
      </div>
    </header>
  );
}
