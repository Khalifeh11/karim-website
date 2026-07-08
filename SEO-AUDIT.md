# SEO Audit — karimkhalifeh.com

_Date: 2026-07-08 · Scope: codebase-level audit (Next.js 16 / Vercel)._
_Not verified against a live URL — Core Web Vitals and indexation (Search Console) are not covered here._

**Site type:** Personal portfolio (freelance full-stack developer, Beirut).
**Goal:** Rank for name + "full-stack developer Beirut / freelance"; convert client leads.

**Overall health:** Content and semantics are solid (clean H1s, good alt text, unique per-page
titles/descriptions). But the **technical discoverability layer is almost entirely missing** — no
sitemap, no robots, no canonical/OG infrastructure. For a 6-page site this is quick to fix and
high-leverage.

---

## Critical — blocking discoverability (fix first)

| # | Issue | Impact | Evidence |
|---|-------|--------|----------|
| 1 | **No `sitemap.xml`** | High | No `app/sitemap.ts` exists |
| 2 | **No `robots.txt`** | High | No `app/robots.ts`; nothing points crawlers to a sitemap |
| 3 | **No `metadataBase`** | High | Absent in `layout.tsx` → any OG/canonical URL resolves relative and breaks; console warns in prod |
| 4 | **No OpenGraph / Twitter cards** | High | `grep openGraph\|twitter` → zero hits. Links shared on LinkedIn/X/WhatsApp render with no image/title card — costly for a portfolio shared with prospects |

## High

- **5 — No canonical tags anywhere.** Next 16 does not auto-emit them; add `alternates.canonical`
  per page to preempt any www/trailing-slash/query duplication.
- **6 — No structured data.** A `Person` + `ProfilePage` JSON-LD (name, jobTitle, location,
  sameAs socials) strengthens E-E-A-T and eligibility for a knowledge panel on your name.
- **7 — Homepage H1 has no keyword.** `AetherFlowHero.tsx:244` — _"the last version of your
  website you'll need to build."_ Zero overlap with "developer / Beirut / web apps." The `<p>`
  below carries the keywords, but the H1 is the strongest on-page signal. Consider working
  "full-stack developer" into the headline or accent span.
- **8 — Oversized source images.** `goldenland_devices_transparent.png` 1.7 MB, several
  600 KB–1.5 MB PNGs. `next/image` re-encodes to WebP/AVIF on Vercel so _delivery_ is mostly
  fine, but source weight bloats the repo and the LCP hero. Convert to WebP.

## Medium / Low

- **9 — No `apple-touch-icon` / PNG icons / no `manifest`.** Only `favicon.ico`. Minor, but
  affects mobile bookmark/share appearance.
- **10 — Sub-page titles are lowercase** (`"about — karim khalifeh"`). Stylistically on-brand,
  but lowercase reads as less authoritative in the SERP and your name is a proper noun.
  Judgment call.
- **11 — Root description is ~185 chars** (`layout.tsx`) — will truncate at ~160 in the SERP.
  Trim the tail.

## Non-issues (verified good)

- `alt=""` on `SelectedWork.tsx:91` is **correct** — the layer is `aria-hidden` decorative.
- Case-study images use descriptive templated alt (`${name} — desktop preview`).
- One H1 per page, logical H2/H3 hierarchy. Unique titles + descriptions per page.
  `lang="en"` set. HTTPS via Vercel.

---

## Prioritized action plan

1. **Add `app/sitemap.ts` + `app/robots.ts`** (~10 min, unblocks crawling).
2. **Add `metadataBase` + default OpenGraph/Twitter** to root `layout.tsx`; add one OG image.
3. **Add `Person`/`ProfilePage` JSON-LD** to the homepage.
4. **Add per-page `alternates.canonical`.**
5. Optimize the PNGs to WebP.
6. Rework the homepage H1 keyword; trim root description.
