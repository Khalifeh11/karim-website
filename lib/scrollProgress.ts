/**
 * Module-level bridge between the scroll layer (Lenis / ScrollTrigger, which run
 * on React's timeline) and the 3D scene (which reads on every `useFrame`). Both
 * sides poke this plain object — no React state, so scroll never triggers a
 * re-render and the canvas stays at 60fps.
 */
export const scrollState = {
  /** 0..1 progress through the whole page. */
  progress: 0,
  /** 0..1 progress through the pinned horizontal section (0 when inactive). */
  horizontal: 0,
  /** Signed scroll velocity from Lenis, used for momentary emissive kicks. */
  velocity: 0,
};
