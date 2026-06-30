"use client";

import { useRef } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll-triggered reveal. Slides + fades its child in as it enters the
 * viewport. `useGSAP` sets the "from" state in a layout effect (before paint),
 * so there's no flash of the final position. Under reduced-motion it does
 * nothing — the content just renders in place.
 */
export default function GsapReveal({
  children,
  as,
  className,
  style,
  y = 28,
  delay = 0,
  duration = 0.9,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  y?: number;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref },
  );

  // Polymorphic `as` + a forwarded ref makes the precise JSX prop type explode
  // (TS2590) / collapse to `never`. The runtime is plain — cast the tag loose.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as ?? "div") as any;
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
