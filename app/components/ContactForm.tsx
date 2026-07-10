"use client";

import { useEffect, useRef, useState } from "react";

const BUDGETS = ["under $1k", "$1k–$5k", "$5k–$10k", "$10k+", "not sure"];

type FieldErrors = { name?: string; email?: string; message?: string };
type Status = "idle" | "sending" | "sent" | "error" | "rate_limited";

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "> error: name is required";
  if (!email.trim()) errors.email = "> error: email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "> error: enter a valid email";
  if (!message.trim()) errors.message = "> error: message is required";
  return errors;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  // Opened-at timestamp for the minimum-time-to-submit spam check.
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const budget = String(data.get("budget") ?? "");

    const fieldErrors = validate(name, email, message);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          ...(budget ? { budget } : {}),
          company: String(data.get("company") ?? ""),
          elapsed: Date.now() - openedAt.current,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus(res.status === 429 ? "rate_limited" : "error");
      }
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      <div className="cform-bar">
        <span className="prompt">{">_"}</span>
        <span>new_message</span>
      </div>

      <div className="cform-field">
        <label className="cform-label" htmlFor="cform-name">
          <span className="cform-prompt" aria-hidden="true">
            $
          </span>
          name
        </label>
        <input
          id="cform-name"
          className="cform-input preserve-case"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="your name"
          spellCheck={false}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cform-name-error" : undefined}
        />
        {errors.name && (
          <p className="cform-error" id="cform-name-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="cform-field">
        <label className="cform-label" htmlFor="cform-email">
          <span className="cform-prompt" aria-hidden="true">
            $
          </span>
          email
        </label>
        <input
          id="cform-email"
          className="cform-input preserve-case"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          spellCheck={false}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cform-email-error" : undefined}
        />
        {errors.email && (
          <p className="cform-error" id="cform-email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="cform-field">
        <label className="cform-label" htmlFor="cform-message">
          <span className="cform-prompt" aria-hidden="true">
            $
          </span>
          message
        </label>
        <textarea
          id="cform-message"
          className="cform-input cform-textarea preserve-case"
          name="message"
          rows={5}
          placeholder="what are we building?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cform-message-error" : undefined}
        />
        {errors.message && (
          <p className="cform-error" id="cform-message-error">
            {errors.message}
          </p>
        )}
      </div>

      <div className="cform-field">
        <label className="cform-label" htmlFor="cform-budget">
          <span className="cform-prompt" aria-hidden="true">
            $
          </span>
          budget
          <span className="cform-flag">--optional</span>
        </label>
        <select
          id="cform-budget"
          className="cform-input cform-select preserve-case"
          name="budget"
          defaultValue=""
        >
          <option value="">—</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Honeypot — invisible to humans, bots fill it in. */}
      <div className="cform-hp" aria-hidden="true">
        <label htmlFor="cform-company">company</label>
        <input
          id="cform-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button className="cform-submit" type="submit" disabled={sending}>
        send_message <span aria-hidden="true">↵</span>
      </button>

      <div className="cform-out" role="status" aria-live="polite">
        {status === "sending" && <p>{"> sending..."}</p>}
        {status === "sent" && (
          <>
            <p className="cform-out-ok">{"> message sent ✓"}</p>
            <p>{"> expect a reply within 24h"}</p>
          </>
        )}
        {status === "error" && (
          <p className="cform-error">
            {"> error: send failed — try again or email me directly"}
          </p>
        )}
        {status === "rate_limited" && (
          <p className="cform-error">
            {"> error: too many requests — try again in a minute"}
          </p>
        )}
      </div>
    </form>
  );
}
