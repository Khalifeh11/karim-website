import { Resend } from "resend";
import { z } from "zod";
import { EMAIL } from "../../lib/links";

// Resend's shared test sender — works without domain verification but only
// delivers to the Resend account owner's own email. Once karimkhalifeh.com
// is verified in Resend, switch to: "karim khalifeh <contact@karimkhalifeh.com>"
const FROM = "karim khalifeh <onboarding@resend.dev>";

/** Bots autofill every field and submit instantly; humans need a few seconds. */
const MIN_ELAPSED_MS = 3000;

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  message: z.string().trim().min(1).max(5000),
  budget: z
    .enum(["under $1k", "$1k–$5k", "$5k–$10k", "$10k+", "not sure"])
    .optional(),
  // Honeypot — hidden from humans, bots fill it in.
  company: z.string().max(1000).optional().default(""),
  // Milliseconds the form was open before submit (client-measured).
  elapsed: z.number(),
});

// Best-effort in-memory limiter: per-instance, resets on cold start — enough
// to stop a naive script hammering the endpoint, not a hard guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const { name, email, message, budget, company, elapsed } = parsed.data;

  // Tripped the honeypot or submitted faster than a human could type —
  // pretend it worked so the bot doesn't learn what caught it.
  if (company !== "" || elapsed < MIN_ELAPSED_MS) {
    return Response.json({ ok: true });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("contact form: RESEND_API_KEY is not set");
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: EMAIL,
      replyTo: email,
      subject: `portfolio contact — ${name}`,
      text: [
        `name: ${name}`,
        `email: ${email}`,
        budget ? `budget: ${budget}` : null,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });
    if (error) {
      console.error("contact form send failed:", error);
      return Response.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("contact form send failed:", err);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
