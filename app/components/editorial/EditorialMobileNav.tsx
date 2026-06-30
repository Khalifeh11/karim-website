"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SoundToggle from "./SoundToggle";

const EASE = [0.16, 1, 0.3, 1] as const;

const items = [
  { id: "work", idx: "01", label: "Work", href: "/#work" },
  { id: "about", idx: "02", label: "About", href: "/about" },
  { id: "contact", idx: "03", label: "Contact", href: "/#contact" },
];

/** Hamburger + full-screen overlay nav for the editorial masthead on mobile.
 *  The inline `.ed-nav` is hidden under 720px (CSS); this takes over there. */
export default function EditorialMobileNav() {
  const [open, setOpen] = useState(false);
  // SSR-safe client check so the portal target (document.body) is only used
  // after hydration — no effect/setState, no hydration mismatch.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Lock body scroll + close on Escape while open.
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
    <>
      <button
        type="button"
        className="ed-menu-toggle preserve-case"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="ed-menu"
        onClick={() => setOpen(true)}
      >
        <span>Menu</span>
        <span className="ed-menu-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="ed-menu"
                className="ed-menu dir-editorial"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.26, ease: EASE }}
              >
                <div className="ed-menu-bar">
                  <Link
                    href="/"
                    className="ed-wordmark preserve-case"
                    onClick={close}
                  >
                    Karim Khalifeh<span className="dot">.</span>
                  </Link>
                  <button
                    type="button"
                    className="ed-menu-toggle is-open preserve-case"
                    aria-label="Close menu"
                    onClick={close}
                  >
                    <span>Close</span>
                    <span className="ed-menu-icon" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </div>

                <motion.nav
                  className="ed-menu-nav"
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
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <Link
                        className="ed-menu-link preserve-case"
                        href={item.href}
                        onClick={close}
                      >
                        <span className="idx">{item.idx}</span>
                        <span className="ed-menu-link-label">{item.label}</span>
                        <span className="ed-menu-link-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                <motion.div
                  className="ed-menu-foot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.24, ease: EASE }}
                >
                  <SoundToggle />
                  <a
                    className="ed-menu-email preserve-case"
                    href="mailto:karim.ah.khalifeh@gmail.com"
                    onClick={close}
                  >
                    karim.ah.khalifeh@gmail.com
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
