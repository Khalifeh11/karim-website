import Image from "next/image";

type Shot = { src: string; alt: string };

type Props = {
  desktop: Shot;
  mobile: Shot;
  /** Pass true for the first carousel slide so it isn't lazy-loaded. */
  preload?: boolean;
  /** Fake address-bar text shown in the browser chrome. */
  url?: string;
};

/**
 * Browser-frame mockup with an overlapping phone frame, both showing
 * real screenshots. Purely presentational — sizing comes from the parent.
 */
export default function DeviceRig({ desktop, mobile, preload, url }: Props) {
  const unopt = (src: string) => src.endsWith(".svg");

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
            priority={preload}
            unoptimized={unopt(desktop.src)}
          />
        </div>
      </figure>

      <figure className="rig-phone">
        <div className="rig-phone-screen">
          <Image
            src={mobile.src}
            alt={mobile.alt}
            fill
            sizes="(max-width: 768px) 26vw, 14vw"
            priority={preload}
            unoptimized={unopt(mobile.src)}
          />
        </div>
        <span className="rig-phone-notch" aria-hidden="true" />
      </figure>
    </div>
  );
}
