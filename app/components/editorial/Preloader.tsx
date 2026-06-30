"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const BARS = 14;
const DURATION = 2600;
const SEEN_KEY = "ed-intro-seen";

/**
 * Andrei-style barcode intro: the bars shuffle their widths while a counter
 * ticks 0 → 100, then the whole sheet clips upward to reveal the page.
 * Plays once per session; on repeat visits / reduced-motion it removes itself
 * instantly without the slide.
 */
export default function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [widths, setWidths] = useState<number[]>(() =>
    Array.from({ length: BARS }, () => 1),
  );
  const lastShuffle = useRef(0);
  // Whether to vanish instantly (repeat visit / reduced-motion) vs. slide away.
  const [quick, setQuick] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SEEN_KEY);
    if (seen || reduce) {
      sessionStorage.setItem(SEEN_KEY, "1");
      // Flag instant-exit first, then drop it the next frame so AnimatePresence
      // captures the up-to-date exit prop.
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        setQuick(true);
        raf2 = requestAnimationFrame(() => setVisible(false));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      // Shuffle bar widths a few times a second (not every frame).
      if (now - lastShuffle.current > 70) {
        lastShuffle.current = now;
        setWidths(Array.from({ length: BARS }, () => 0.35 + Math.random() * 1.65));
      }
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(SEEN_KEY, "1");
        document.documentElement.style.overflow = "";
        setTimeout(() => setVisible(false), 220);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="ed-preloader"
          initial={{ y: 0 }}
          exit={quick ? { opacity: 0 } : { y: "-100%" }}
          transition={
            quick ? { duration: 0 } : { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
          }
          aria-hidden="true"
        >
          <div className="ed-preloader-inner">
            <div className="ed-barcode">
              {widths.map((w, i) => (
                <span key={i} style={{ flexGrow: w }} />
              ))}
            </div>
            <div className="ed-preloader-meta">
              <span className="preserve-case">K. Khalifeh</span>
              <span>({count})</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
