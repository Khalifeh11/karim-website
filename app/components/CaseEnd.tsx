import Link from "next/link";
import { Reveal } from "./Reveal";

/** Conversion CTA at the end of every case study page. */
export default function CaseEnd() {
  return (
    <div className="case-end page">
      <Reveal>
        <p className="case-end-label">need something like this?</p>
        <Link className="case-end-cta" href="/#contact">
          <span className="case-end-title">let&apos;s talk about your project</span>
          <span className="case-end-arrow">→</span>
        </Link>
        <p className="case-end-back">
          <Link href="/#work">back to all work →</Link>
        </p>
      </Reveal>
    </div>
  );
}
