"use client";

/**
 * Single place GSAP + ScrollTrigger get registered, so plugins are only set up
 * once and every scroll component imports the same instance. Client-only —
 * ScrollTrigger touches `window` the moment it runs.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
