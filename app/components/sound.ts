// Tiny Web Audio "terminal blip" engine — synthesized, no assets, no deps.
// Off by default; the choice persists in localStorage. All play functions
// are safe to call anywhere: they no-op when sound is off or before init.

const STORAGE_KEY = "snd-enabled";

let enabled: boolean | null = null; // null = not read from storage yet
let ctx: AudioContext | null = null;
const listeners = new Set<() => void>();

function ensureInit() {
  if (enabled === null) {
    enabled =
      typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY) === "1";
  }
  return enabled;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isSoundEnabled() {
  return !!ensureInit();
}

export function toggleSound() {
  const turningOff = !!ensureInit();
  if (turningOff) playToggle(false); // farewell blip while still audible
  enabled = !turningOff;
  window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  listeners.forEach((l) => l());
  if (enabled) {
    // Created inside a click handler, so autoplay policy allows it to run.
    getCtx()?.resume();
    playToggle(true);
  }
}

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

// One short square-wave tone with a fast exponential decay — the whole
// vocabulary of the terminal aesthetic is built from stacking these.
function tone(
  freq: number,
  at: number,
  dur: number,
  peak: number,
  type: OscillatorType = "square",
) {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime + at;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function ready() {
  if (!ensureInit()) return false;
  const ac = getCtx();
  if (!ac) return false;
  // If the context loaded suspended (enabled in a past visit, no user
  // gesture yet), try resuming; stay silent until the browser allows it.
  if (ac.state === "suspended") {
    ac.resume();
    return ac.state !== "suspended";
  }
  return true;
}

let lastHover = 0;

/** Quiet high blip for hovers. Throttled so link-sweeps don't machine-gun. */
export function playHover() {
  if (!ready()) return;
  const now = performance.now();
  if (now - lastHover < 70) return;
  lastHover = now;
  tone(1320, 0, 0.045, 0.015);
}

/** Two-step confirm blip for clicks / selections. */
export function playClick() {
  if (!ready()) return;
  tone(880, 0, 0.05, 0.03);
  tone(1480, 0.055, 0.07, 0.025);
}

/** Rising (on) / falling (off) pair for the sound switch itself. */
export function playToggle(on: boolean) {
  if (!ready()) return;
  if (on) {
    tone(740, 0, 0.06, 0.03);
    tone(1240, 0.07, 0.09, 0.025);
  } else {
    tone(1240, 0, 0.06, 0.03);
    tone(740, 0.07, 0.09, 0.025);
  }
}
