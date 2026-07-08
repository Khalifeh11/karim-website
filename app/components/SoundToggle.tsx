"use client";

import { useSyncExternalStore } from "react";
import { isSoundEnabled, subscribe, toggleSound } from "./sound";

export default function SoundToggle() {
  const on = useSyncExternalStore(subscribe, isSoundEnabled, () => false);

  return (
    <button
      type="button"
      className="sound-toggle"
      aria-pressed={on}
      aria-label={on ? "turn sound off" : "turn sound on"}
      onClick={toggleSound}
    >
      <svg viewBox="0 0 20 16" aria-hidden="true">
        <path
          className="sound-icon-speaker"
          d="M2.75 5.5h3l4.5-3.75v12.5l-4.5-3.75h-3z"
        />
        <path className="sound-icon-wave" d="M13 5.4a3.3 3.3 0 0 1 0 5.2" />
        <path
          className="sound-icon-wave sound-icon-wave-2"
          d="M15.6 3.5a6 6 0 0 1 0 9"
        />
        <line className="sound-icon-slash" x1="3" y1="1.5" x2="17.5" y2="14.5" />
      </svg>
    </button>
  );
}
