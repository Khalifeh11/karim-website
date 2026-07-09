// Tiny Web Audio "mechanical thock" engine — synthesized, no assets, no deps.
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

// Mechanical "thock" vocabulary — the sound of a good keyboard switch, not
// a video game. Two primitives: a filtered noise tick (the contact) and a
// low sine thump (the body). No pitch melodies anywhere; the identity of
// each event comes from texture and weight instead.

let noiseBuf: AudioBuffer | null = null;

function getNoise(ac: AudioContext) {
  if (!noiseBuf) {
    noiseBuf = ac.createBuffer(1, ac.sampleRate * 0.1, ac.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuf;
}

// Short burst of bandpassed noise — the "tick" of contact. Center frequency
// sets the perceived material: high = plasticky tap, low = muted felt.
function tick(at: number, dur: number, peak: number, center: number) {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime + at;
  const src = ac.createBufferSource();
  src.buffer = getNoise(ac);
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(center, t);
  filter.Q.setValueAtTime(1.2, t);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(peak, t + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter).connect(gain).connect(ac.destination);
  src.start(t);
  src.stop(t + dur + 0.02);
}

// Low sine with a slight downward bend — the "body" behind the tick that
// makes a click feel weighted instead of thin.
function thump(at: number, dur: number, peak: number, freq: number) {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime + at;
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + dur);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(peak, t + 0.004);
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

/** Featherweight tick for hovers — contact only, no body. Throttled so
 *  link-sweeps don't machine-gun. */
export function playHover() {
  if (!ready()) return;
  const now = performance.now();
  if (now - lastHover < 70) return;
  lastHover = now;
  tick(0, 0.03, 0.02, 2600);
}

/** Full thock for clicks: sharp contact plus a low body an instant later,
 *  like a switch bottoming out. */
export function playClick() {
  if (!ready()) return;
  tick(0, 0.04, 0.06, 1800);
  thump(0.004, 0.08, 0.05, 190);
}

/** Switch on = firm press (deeper body); off = softer release. Same texture
 *  family, weight carries the meaning. */
export function playToggle(on: boolean) {
  if (!ready()) return;
  if (on) {
    tick(0, 0.04, 0.06, 1800);
    thump(0.004, 0.1, 0.06, 160);
  } else {
    tick(0, 0.035, 0.04, 1300);
    thump(0.004, 0.07, 0.035, 130);
  }
}
