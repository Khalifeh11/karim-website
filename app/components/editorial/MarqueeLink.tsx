import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Andrei-style hover link: the label is doubled and the pair slides up on
 * hover so the second copy swaps into place. Pure CSS — no JS needed.
 */
export default function MarqueeLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: ReactNode;
  className?: string;
}) {
  const cls = `ed-marquee ${className}`.trim();
  const body = (
    <>
      <span className="ed-marquee-row">{label}</span>
      <span className="ed-marquee-row" aria-hidden="true">
        {label}
      </span>
    </>
  );
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  return isInternal ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {body}
    </a>
  );
}
