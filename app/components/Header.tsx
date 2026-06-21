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
        <a className="brand-mark" href="/">
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

      </div>
    </motion.header>
  );
}
