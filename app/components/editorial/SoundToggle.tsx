"use client";

import { useSyncExternalStore } from "react";
import { subscribe, isEnabled, toggle } from "./sound";

/** Mono on/off control for the click sounds. Default off.
 *  Renders as a small equalizer-bar mark; the bars pulse while enabled. */
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
      <svg
        className="ed-sound-bars"
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="0" y="10" width="2.4" height="6" rx="1.2" />
        <rect x="4.2" y="6" width="2.4" height="10" rx="1.2" />
        <rect x="8.4" y="2" width="2.4" height="14" rx="1.2" />
        <rect x="12.6" y="8" width="2.4" height="8" rx="1.2" />
      </svg>
      <span className="ed-sound-label preserve-case">
        {on ? "Sound on" : "Sound off"}
      </span>
    </button>
  );
}
