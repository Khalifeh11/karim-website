import Link from "next/link";
import { Reveal } from "./Reveal";

/** Closing links at the end of every case study page. */
export default function CaseEnd() {
  return (
    <div className="case-end page">
      <Reveal>
        <p className="case-end-label">want to talk about this work?</p>
        <Link className="case-end-cta" href="/#contact">
          <span className="case-end-title">Get in touch</span>
          <span className="case-end-arrow">→</span>
        </Link>
        <p className="case-end-back">
          <Link href="/#work">back to all work →</Link>
        </p>
      </Reveal>
    </div>
  );
}
