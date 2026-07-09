"use client";

import { useEffect, useRef, ViewTransition } from "react";
import Image from "next/image";
import PhoneFrame from "./PhoneFrame";

const MAX_TILT = 6; // degrees

/**
 * Tilts the rig toward the pointer on desktop and with the gyroscope on
 * mobile, relative to how the phone was held when readings started. Writes
 * transforms straight to the node so sensor/pointer rate never re-renders.
 */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (v: number) => Math.max(-MAX_TILT, Math.min(MAX_TILT, v));
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;

    const loop = () => {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      const settled =
        Math.abs(targetX - curX) < 0.01 && Math.abs(targetY - curY) < 0.01;
      if (settled && targetX === 0 && targetY === 0) {
        el.style.transform = "";
        raf = 0;
        return;
      }
      el.style.transform = `perspective(1100px) rotateX(${curX.toFixed(
        2,
      )}deg) rotateY(${curY.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      targetY = clamp(((e.clientX - r.left) / r.width - 0.5) * MAX_TILT * 2);
      targetX = clamp(-((e.clientY - r.top) / r.height - 0.5) * MAX_TILT * 2);
      kick();
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    // The baseline drifts slowly toward the current reading, so the tilt
    // tracks recent hand motion and settles flat when the phone is still.
    let base: { beta: number; gamma: number } | null = null;
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      if (!base) base = { beta: e.beta, gamma: e.gamma };
      base.beta += (e.beta - base.beta) * 0.01;
      base.gamma += (e.gamma - base.gamma) * 0.01;
      targetX = clamp((base.beta - e.beta) * 0.35);
      targetY = clamp((e.gamma - base.gamma) * 0.35);
      kick();
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);

    const listenGyro = () =>
      window.addEventListener("deviceorientation", onOrient);
    // iOS only grants sensor access from inside a user gesture: the first
    // tap on the rig triggers the permission prompt.
    const request = (
      DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      }
    ).requestPermission;
    const onFirstTouch = () => {
      el.removeEventListener("touchend", onFirstTouch);
      request!
        .call(DeviceOrientationEvent)
        .then((s) => {
          if (s === "granted") listenGyro();
        })
        .catch(() => {});
    };
    if (typeof window.DeviceOrientationEvent !== "undefined") {
      if (typeof request === "function") {
        el.addEventListener("touchend", onFirstTouch);
      } else {
        listenGyro();
      }
    }

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("touchend", onFirstTouch);
      window.removeEventListener("deviceorientation", onOrient);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, []);

  return ref;
}

type Shot = { src: string; alt: string };

type Props = {
  desktop: Shot;
  mobile: Shot;
  /** Pass true for the first carousel slide so it isn't lazy-loaded. */
  preload?: boolean;
  /** Fake address-bar text shown in the browser chrome. */
  url?: string;
  /** Names the phone as a shared element so it morphs across navigations. */
  phoneTransitionName?: string;
};

/**
 * Browser-frame mockup with an overlapping phone frame, both showing
 * real screenshots. Purely presentational — sizing comes from the parent.
 */
export default function DeviceRig({
  desktop,
  mobile,
  preload,
  url,
  phoneTransitionName,
}: Props) {
  const unopt = (src: string) => src.endsWith(".svg");
  const tiltRef = useTilt();

  return (
    <div className="device-rig" ref={tiltRef}>
      <figure className="rig-browser">
        <div className="rig-browser-bar" aria-hidden="true">
          <span className="rig-dot" />
          <span className="rig-dot" />
          <span className="rig-dot" />
          {url && <span className="rig-url preserve-case">{url}</span>}
        </div>
        <div className="rig-browser-screen">
          <Image
            src={desktop.src}
            alt={desktop.alt}
            fill
            sizes="(max-width: 768px) 92vw, 56vw"
            priority={preload}
            unoptimized={unopt(desktop.src)}
          />
        </div>
      </figure>

      <ViewTransition name={phoneTransitionName} share="morph" default="none">
        <PhoneFrame
          src={mobile.src}
          alt={mobile.alt}
          className="rig-phone"
          priority={preload}
          sizes="(max-width: 768px) 26vw, 14vw"
        />
      </ViewTransition>
    </div>
  );
}
