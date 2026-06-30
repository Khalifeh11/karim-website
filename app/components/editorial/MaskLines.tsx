"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Headline reveal: each line sits in an overflow-clip and rises into view,
 * staggered. `trigger="mount"` plays on load (hero); `"view"` plays when
 * scrolled into view (section headings).
 */
export default function MaskLines({
  lines,
  trigger = "view",
  className,
  stagger = 0.09,
  delay = 0,
}: {
  lines: ReactNode[];
  trigger?: "view" | "mount";
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };
  const child = reduce
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : {
        hidden: { y: "115%" },
        show: { y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  const trig =
    trigger === "mount"
      ? { animate: "show" }
      : { whileInView: "show", viewport: { once: true, margin: "-60px" } };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      {...trig}
    >
      {lines.map((line, i) => (
        <span className="ed-line" key={i}>
          <motion.span className="ed-line-in" variants={child}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
