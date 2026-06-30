"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Number that ticks up (easeOutCubic) the first time it scrolls into view. */
export default function CountUp({
  to,
  from = 0,
  duration = 1.1,
  pad = 0,
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  pad?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, from, to, duration]);

  // Under reduced motion, skip the animation and show the final value.
  const shown = reduce ? to : val;
  return (
    <span ref={ref} className={className}>
      {pad ? String(shown).padStart(pad, "0") : shown}
    </span>
  );
}
