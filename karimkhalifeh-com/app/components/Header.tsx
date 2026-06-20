"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "./Reveal";

const navItems = [
  { id: "work", num: "01", label: "work" },
  { id: "about", num: "02", label: "about" },
  { id: "contact", num: "03", label: "contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? "scrolled" : ""}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="header-inner">
        <a className="brand-mark" href="#">
          <span className="prompt">{">_"}</span>
          <span className="who preserve-case">karim_khalifeh</span>
        </a>

        <nav className="nav-numbered">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              <span className="num">{item.num}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="header-right">
          <button className="theme-pill" type="button" aria-label="Toggle theme">
            <SunIcon />
            <span>dark</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

function SunIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
