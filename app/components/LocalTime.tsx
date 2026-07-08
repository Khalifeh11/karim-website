"use client";

import { useEffect, useState } from "react";

function beirutTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Beirut",
  }).format(new Date());
}

/** "beirut, lebanon · 18:42 local" — ticks every minute. */
export default function LocalTime() {
  // Rendered empty on the server; time only exists client-side, so this
  // avoids a hydration mismatch.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setTime(beirutTime());
    sync();
    const id = setInterval(sync, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="contact-status">
      <span className="status-dot" aria-hidden="true" />
      beirut, lebanon
      {time && <> · <span className="preserve-case">{time}</span> local</>}
    </p>
  );
}
