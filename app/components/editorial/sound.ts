/**
 * Tiny Web Audio click-sound engine for the editorial homepage.
 * One decoded buffer, replayed with per-click pitch/gain variation so the
 * single typewriter sample never sounds copy-pasted. Default off; the choice
 * persists in localStorage. Browsers block audio until a user gesture, so the
 * context is only created/resumed from the toggle or the first pointer-down.
 */

const SRC = "/sounds/typewriter.wav";
const STORE_KEY = "ed-sound-on";
const VOLUME = 0.5;

let ctx: AudioContext | null = null;
let buffer: AudioBuffer | null = null;
let loadPromise: Promise<void> | null = null;
let enabled = false;
let inited = false;

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((fn) => fn());

/** Subscribe to enabled-state changes (shape matches useSyncExternalStore). */
export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function isEnabled() {
  return enabled;
}

/** Read the persisted choice once, on the client. */
export function initFromStorage() {
  if (inited) return;
  inited = true;
  try {
    enabled = localStorage.getItem(STORE_KEY) === "1";
  } catch {
    enabled = false;
  }
  emit();
}

/** Create + resume the context and decode the sample. Must run in a gesture. */
export async function ensureLoaded() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      /* ignore */
    }
  }
  if (!buffer && !loadPromise) {
    loadPromise = fetch(SRC)
      .then((r) => r.arrayBuffer())
      .then((data) => ctx!.decodeAudioData(data))
      .then((buf) => {
        buffer = buf;
      })
      .catch(() => {
        /* ignore load failure — just stays silent */
      });
  }
  await loadPromise;
}

export async function setEnabled(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(STORE_KEY, on ? "1" : "0");
  } catch {
    /* ignore */
  }
  emit();
  if (on) {
    await ensureLoaded();
    play(); // immediate feedback when switching on
  }
}

export function toggle() {
  void setEnabled(!enabled);
}

/** Play one clack with slight pitch + gain variation. No-op when disabled. */
export function play() {
  if (!enabled || !ctx || !buffer) return;
  if (ctx.state === "suspended") void ctx.resume();
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  // ±2 semitones keeps repeated clicks from sounding identical.
  const semitones = Math.random() * 4 - 2;
  source.playbackRate.value = Math.pow(2, semitones / 12);
  const gain = ctx.createGain();
  gain.gain.value = VOLUME * (0.85 + Math.random() * 0.3);
  source.connect(gain).connect(ctx.destination);
  source.start(0);
}
