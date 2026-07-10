"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./Reveal";
import SoundToggle from "./SoundToggle";
import { openPalette } from "./CommandPalette";
import { EMAIL } from "../lib/links";

const navItems = [
  { id: "work", num: "01", label: "work", href: "/#work" },
  { id: "about", num: "02", label: "about", href: "/about" },
  { id: "contact", num: "03", label: "contact", href: "/#contact" },
];

// The header remounts on every client navigation (it's rendered per page);
// replaying the drop-in there would fight the pinned view transition.
let headerHasAnimated = false;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // SSR-safe "are we on the client?" check so the portal target (document.body)
  // is only touched after hydration — no effect/setState, no hydration mismatch.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <motion.header
      className={`header ${scrolled ? "scrolled" : ""}`}
      style={{ viewTransitionName: "site-header" }}
      initial={headerHasAnimated ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      onAnimationComplete={() => {
        headerHasAnimated = true;
      }}
    >
      <div className="header-inner">
        <Link className="brand-mark" href="/" onClick={close}>
          <span className="prompt">{">_"}</span>
          <span className="who preserve-case">karim_khalifeh</span>
        </Link>

        <nav className="nav-numbered">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <span className="num">{item.num}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-right">
          <button
            type="button"
            className="slash-hint"
            aria-label="open command palette"
            title="command palette"
            onClick={openPalette}
          >
            <kbd>/</kbd>
          </button>
          <SoundToggle />
          <button
            type="button"
            className="nav-toggle"
            aria-label="open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span className="nav-toggle-label">menu</span>
            <span className="nav-toggle-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                className="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="site menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.26, ease: EASE }}
              >
                <div className="mobile-menu-bar">
                  <Link className="brand-mark" href="/" onClick={close}>
                    <span className="prompt">{">_"}</span>
                    <span className="who preserve-case">karim_khalifeh</span>
                  </Link>
                  <button
                    type="button"
                    className="nav-toggle is-open"
                    aria-label="close menu"
                    onClick={close}
                  >
                    <span className="nav-toggle-label">close</span>
                    <span className="nav-toggle-icon" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </div>

                <motion.nav
                  className="mobile-menu-nav"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    show: {
                      transition: { staggerChildren: 0.06, delayChildren: 0.06 },
                    },
                    hidden: {},
                  }}
                >
                  {navItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <Link
                        className="mobile-menu-link"
                        href={item.href}
                        onClick={close}
                      >
                        <span className="num">{item.num}</span>
                        <span className="mobile-menu-link-label">
                          {item.label}
                        </span>
                        <span className="mobile-menu-link-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                <motion.div
                  className="mobile-menu-foot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.24, ease: EASE }}
                >
                  <span className="mobile-menu-status">
                    <span className="status-dot" aria-hidden="true" />
                    available for work
                  </span>
                  <Link
                    className="mobile-menu-email preserve-case"
                    href="/#contact"
                    onClick={close}
                  >
                    {EMAIL}
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </motion.header>
  );
}
