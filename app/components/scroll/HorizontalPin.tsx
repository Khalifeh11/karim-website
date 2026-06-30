"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollState } from "@/lib/scrollProgress";

/**
 * The core pinned vertical→horizontal primitive. Pins the section to the
 * viewport, then maps the vertical scroll distance onto an X-translation of the
 * inner track, so the wheel/trackpad drives sideways movement. Section progress
 * is published to `scrollState.horizontal` for the 3D scene to react to.
 *
 * On touch / small screens / reduced-motion it creates no triggers — CSS turns
 * the track into a normal swipeable (or stacked) row instead, which is far less
 * janky than pinning on mobile.
 */
export default function HorizontalPin({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.matchMedia("(max-width: 768px)").matches;
      const trackEl = track.current;
      if (reduce || small || !trackEl) return;

      // Recomputed on every refresh so it survives resizes / font swaps.
      const distance = () => trackEl.scrollWidth - window.innerWidth;

      const tween = gsap.to(trackEl, { x: () => -distance(), ease: "none" });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollState.horizontal = self.progress;
        },
        onLeaveBack: () => {
          scrollState.horizontal = 0;
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`noir-pin ${className ?? ""}`}>
      <div ref={track} className="noir-pin-track">
        {children}
      </div>
    </section>
  );
}
