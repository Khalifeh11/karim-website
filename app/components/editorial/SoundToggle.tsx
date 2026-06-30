"use client";

import { useSyncExternalStore } from "react";
import { subscribe, isEnabled, toggle } from "./sound";

/** Mono on/off control for the click sounds. Default off. */
export default function SoundToggle() {
  const on = useSyncExternalStore(subscribe, isEnabled, () => false);
  return (
    <button
      type="button"
      className="ed-sound"
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      onClick={() => toggle()}
    >
      <span className="ed-sound-dot" aria-hidden="true" />
      <span className="preserve-case">sound</span>
    </button>
  );
}
