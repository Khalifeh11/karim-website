"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.25, 0.1, 0.25, 1] as const;

export const VIEWPORT = { once: true, margin: "-40px" } as const;

/** Scroll-triggered fade-up used by every section heading and row. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Numbered section label with a green line that draws in beside it. */
export function SectionLabel({
  num,
  children,
  as: Tag = "h2",
  className = "section-title",
}: {
  num: string;
  children: ReactNode;
  as?: "h2" | "p";
  className?: string;
}) {
  const MotionTag = Tag === "p" ? motion.p : motion.h2;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <span className="num">{num}</span>
      <motion.span
        className="num-line"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
      />
      {children}
    </MotionTag>
  );
}
