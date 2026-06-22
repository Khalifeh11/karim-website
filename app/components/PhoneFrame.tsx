import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Extra class for positioning/sizing in the parent context. */
  className?: string;
  /** Pass true to skip lazy-loading (e.g. above-the-fold heroes). */
  priority?: boolean;
  sizes?: string;
};

/**
 * Presentational phone-frame mockup: device frame + screen + notch around a
 * single screenshot. Visual only — width/positioning come from `className`.
 */
export default function PhoneFrame({ src, alt, className = "", priority, sizes }: Props) {
  const unoptimized = src.endsWith(".svg");

  return (
    <figure className={`phone-frame ${className}`.trim()}>
      <div className="phone-frame-screen">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 26vw, 14vw"}
          priority={priority}
          unoptimized={unoptimized}
        />
      </div>
      <span className="phone-frame-notch" aria-hidden="true" />
    </figure>
  );
}
