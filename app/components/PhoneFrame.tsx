import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Extra class for positioning/sizing in the parent context. */
  className?: string;
  /** Pass true to preload from the head (e.g. above-the-fold heroes). */
  preload?: boolean;
  /** Pass true to fetch at high priority without a head preload —
      for shots that become visible after mount (mutually exclusive). */
  eager?: boolean;
  sizes?: string;
};

/**
 * Presentational phone-frame mockup: device frame + screen + notch around a
 * single screenshot. Visual only — width/positioning come from `className`.
 */
export default function PhoneFrame({ src, alt, className = "", preload, eager, sizes }: Props) {
  const unoptimized = src.endsWith(".svg");
  const eagerProps =
    !preload && eager
      ? ({ loading: "eager", fetchPriority: "high" } as const)
      : {};

  return (
    <figure className={`phone-frame ${className}`.trim()}>
      <div className="phone-frame-screen">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 26vw, 14vw"}
          preload={preload}
          unoptimized={unoptimized}
          {...eagerProps}
        />
      </div>
      <span className="phone-frame-notch" aria-hidden="true" />
    </figure>
  );
}
