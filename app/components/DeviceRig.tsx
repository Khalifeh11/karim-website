import { ViewTransition } from "react";
import Image from "next/image";
import PhoneFrame from "./PhoneFrame";

type Shot = { src: string; alt: string };

type Props = {
  desktop: Shot;
  mobile: Shot;
  /** Pass true for the first carousel slide so it isn't lazy-loaded. */
  preload?: boolean;
  /** Pass true for the currently visible slide so its shots fetch at high
      priority the moment it activates (mutually exclusive with preload). */
  eager?: boolean;
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
  eager,
  url,
  phoneTransitionName,
}: Props) {
  const unopt = (src: string) => src.endsWith(".svg");
  // `preload` (head <link>) can't be combined with loading/fetchPriority,
  // so a preloaded rig ignores `eager`.
  const eagerProps =
    !preload && eager
      ? ({ loading: "eager", fetchPriority: "high" } as const)
      : {};

  return (
    <div className="device-rig">
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
            preload={preload}
            unoptimized={unopt(desktop.src)}
            {...eagerProps}
          />
        </div>
      </figure>

      {/* Keyed by name: React only untracks a shared-element name on unmount,
          so flipping `name` to undefined on a re-render would leak the old
          name in its registry and trigger duplicate-name errors later. */}
      <ViewTransition
        key={phoneTransitionName ?? "unnamed"}
        name={phoneTransitionName}
        share="morph"
        default="none"
      >
        <PhoneFrame
          src={mobile.src}
          alt={mobile.alt}
          className="rig-phone"
          preload={preload}
          eager={eager}
          sizes="(max-width: 768px) 26vw, 14vw"
        />
      </ViewTransition>
    </div>
  );
}
