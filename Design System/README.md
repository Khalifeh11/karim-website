# Karim Khalifeh — Design System

A design system for **Karim Khalifeh**, a freelance full-stack web developer based in Lebanon, working with businesses internationally. The system supports his personal portfolio site, whose primary goal is **winning client work** — so project case studies are the hero, and the design itself must demonstrate strong taste and craft.

## Source materials provided

- A written brief describing the company, audience, and site structure (see below). **No codebase, Figma file, or existing brand assets were attached** — the system is designed from scratch against the brief.
- Audience: business owners and startups, local and international.
- Tone target: polished, trustworthy, modern. Clean and confident as the foundation, with distinctive touches and personality. Never flashy or gimmicky.
- Requested: light theme with a dark-mode toggle, excellent typography, generous spacing.

## Three visual directions

The brief asked for "a few distinct visual directions." This system ships **three** directions that share content fundamentals but diverge on type, color, and rhythm. Each is a complete, internally-consistent treatment — not three points on a slider.

| Direction | Voice | Typography | Color anchor |
|---|---|---|---|
| **A. Modern** | Technical, but human. Dark, terminal motif, numbered nav, big project cards. | Geist + Geist Mono | Dark forest base + bright forest accent |
| **B. Technical** | A modern operator. Vercel/Linear adjacent. | Geist Sans + Geist Mono throughout | Near-white + near-black, one electric accent |
| **C. Studio** | A small studio of one. Distinctive and warm. | Bricolage Grotesque display + Geist Sans + JetBrains Mono | Bone background + deep forest accent |

All three are documented in `colors_and_type.css` via CSS custom properties, and each has its own homepage UI kit under `ui_kits/`.

## Index

| File / Folder | Purpose |
|---|---|
| `index.html` | Landing page comparing the three directions side by side — start here |
| `README.md` | This file — context, content fundamentals, visual foundations, iconography |
| `SKILL.md` | Agent-Skill manifest so this system can be invoked as a skill |
| `colors_and_type.css` | All design tokens (colors, type, spacing, radii, shadows) for all three directions |
| `fonts/` | Locally-mirrored web fonts (currently sourced from Google Fonts CDN; document notes substitutions) |
| `assets/` | Logos, icons, illustrations, photography placeholders |
| `preview/` | Static HTML cards that populate the Design System tab |
| `ui_kits/modern/` | Direction A — homepage and components |
| `ui_kits/technical/` | Direction B — homepage and components |
| `ui_kits/studio/` | Direction C — homepage and components |

## Site structure (applies to all directions)

- **Home** — Headline, four-project portfolio grid (lead with strongest), short "How I work," "Book a call" CTA.
- **Work index** — All projects.
- **Case study** — Problem → What I built → Results (real numbers) → Tech stack.
- **About** — Who Karim is, where he works from, what he cares about.
- **Contact** — Call scheduler + short project-inquiry form.

---

## Content fundamentals

**Voice.** First person, lowercase confidence. Karim writes as a craftsman, not a salesperson. He names what he did and what happened; he doesn't oversell. The reader should feel they are reading a portfolio by a person, not a company.

**Pronouns.** "I" for Karim, "you" for the client. Never "we" — he is a freelancer, and pretending otherwise is the kind of small dishonesty that costs trust.

**Casing.** Sentence case for headings, navigation, and buttons. Title Case is reserved for proper nouns (project names, client names, technology names: "Next.js", "Postgres"). All-caps is used sparingly, only for one-word metadata labels ("ROLE", "YEAR", "STACK") and never in running prose.

**Tense.** Past tense for completed work ("I rebuilt the checkout"). Present tense for ongoing capabilities ("I build fast websites for…"). Avoid future-tense aspirational claims.

**Numbers.** Real, specific numbers wherever possible. "Cut LCP from 4.2s to 0.8s" is the goal — not "dramatically faster." If a number can't be shared (NDA), name the metric and the direction ("conversion up, NDA on the exact figure").

**No marketing slop.** Avoid: "transform," "leverage," "synergy," "cutting-edge," "next-generation," "passionate about," "world-class." Avoid: any sentence that could appear on any agency homepage. If a line reads like LinkedIn, rewrite it.

**Emoji.** None. Not in copy, not in headings, not in nav. Karim's brand is the absence of emoji — it signals seriousness.

**Examples (good).**
> "Hi, I'm Karim. I'm a full-stack developer in Beirut. I build fast, well-engineered websites and web apps for businesses around the world."
>
> "Built in 6 weeks with Next.js, Postgres, and Stripe. Live since March 2025. Handles 12k orders/month."
>
> "The old site took 4.2 seconds to load on a 4G connection. The new one takes 0.8."

**Examples (bad).**
> ~~"I'm a passionate developer leveraging cutting-edge technologies to deliver transformative digital experiences."~~
>
> ~~"We're a boutique studio crafting next-generation solutions."~~ (Wrong pronoun, marketing slop)

---

## Visual foundations

These apply to **all three directions** unless a direction overrides them. Direction-specific tokens live in `colors_and_type.css`.

### Color philosophy

- **Light is the default.** A dark-mode toggle is present on every page; the default is light, and the toggle persists in localStorage.
- **One accent, used surgically.** Each direction has exactly one accent color, used for: links, the primary CTA, focus rings, and a single brand mark. The accent should never appear in body text, large fills, or backgrounds.
- **Warm neutrals over cold grays.** Even the "Technical" direction's near-whites and near-blacks have a faint warm cast (a few percent yellow in OKLCH) to avoid the clinical feel of pure #FFF / #000.
- **No gradients in chrome.** Card backgrounds, buttons, and surfaces are flat. The only sanctioned gradient is a subtle vignette/grain texture on hero backgrounds in Direction C.

### Typography

- **Scale.** Modular, ~1.25 ratio. Display sizes are large and confident (72–120px on hero); body sits at 17–18px with 1.6 line-height.
- **Generous tracking on small caps and metadata labels.** `letter-spacing: 0.08em` on UPPERCASE labels.
- **Hyphenation off, balanced wrapping on.** `text-wrap: balance` on headlines, `text-wrap: pretty` on prose.
- **Italic for emphasis, never bold.** In prose; bold is reserved for UI labels.

### Spacing

- Base unit: **8px**. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160px.
- **Generous vertical rhythm.** Section padding `clamp(80px, 12vh, 160px)` top and bottom on marketing pages.
- **Wide max-content width on case studies** (720px) — these are reading documents.
- **Narrow max width on hero copy** (~640px) so headlines breathe.

### Backgrounds

- **Flat, color-only surfaces** in chrome and components. No drop-in stock textures.
- **Direction A** uses a near-imperceptible paper texture (CSS noise via SVG filter) at 3% opacity on the body.
- **Direction C** uses a soft radial vignette on hero sections only.
- **Project case studies use real screenshots as the hero image**, full-bleed on the case study page, contained within an aspect-ratio frame on the index. No mockup chrome (no laptop frames, no phone bezels) — the screenshot stands alone.

### Animation

- **Easing.** A custom cubic-bezier — `cubic-bezier(0.32, 0.72, 0, 1)` (a confident ease-out, no bounce).
- **Durations.** 150ms for hover/press, 240ms for component transitions (drawer open, modal), 480ms for page-level scroll-triggered fades. Nothing longer than 600ms.
- **Scroll behavior.** Fade + 8px translate-up on element entry, once. No parallax. No scroll-jacking.
- **No bouncing, no loops, no decorative motion.** Motion is functional only: it confirms an action or directs attention.
- **Cursor.** Default; project cards may show a custom "View →" cursor on hover (Direction A and C only).

### Hover and press states

- **Links in prose.** Underline always present (1px, `text-underline-offset: 0.2em`). On hover, color shifts to the accent; underline color matches.
- **Buttons (primary).** On hover, background darkens 6% in OKLCH lightness. On press, scales to 0.98 with 80ms transition.
- **Cards.** On hover, parent container shifts background to a faint neutral (`--surface-2`); the image inside scales to 1.02 over 480ms with the custom easing. No drop shadow appears or grows.
- **Nav links.** On hover, opacity drops to 0.6. Active route has a 1px underline.

### Borders

- **Hairlines only.** 1px borders, `--border` color which is a very low-contrast neutral (e.g. `oklch(0.92 0.005 80)` in light, `oklch(0.22 0.005 80)` in dark).
- **No double borders.** Either border or divider, not both.
- **Dividers** are full-bleed within their container and use the same `--border` color.

### Shadows

- **One soft shadow token** (`--shadow-1`) used for the dark-mode toggle pill and any floating UI (toast, dropdown). It is small and tight: `0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)`.
- **Cards do not have shadows.** They use borders or background contrast instead. Shadows on flat cards is a tell of generic template design.
- **No inner shadows. No glow effects.**

### Corner radii

- **`--radius-sm: 6px`** for inputs, buttons, small chips.
- **`--radius-md: 10px`** for cards and surfaces.
- **`--radius-lg: 16px`** for the hero project image frame and modals.
- **Full pills (`9999px`)** for tags, metadata chips, and the dark-mode toggle.
- **Never mix radii within one composite component.** A card and its inner image use the same radius family.

### Layout rules

- **12-column grid** on desktop with 24px gutters; collapses to 4-col at <900px and 2-col at <600px.
- **Page max-width 1280px** with 32px page padding (24px on mobile).
- **Sticky header** with a backdrop blur (`backdrop-filter: blur(12px)`) and a translucent background. The header gets a hairline bottom border only after scroll > 8px.
- **Footer is small and quiet** — three rows of links, contact email, year. No newsletter signup, no social grid.

### Transparency and blur

- Used only on the sticky header (translucent background + backdrop-blur) and on the modal scrim (`rgba(0,0,0,0.4)`).
- Never on cards, never on buttons.

### Imagery

- **Project screenshots** are the dominant imagery type. Real, un-mockup'd, captured at native resolution.
- **Optional**: warm-toned, natural-light photography of Karim or his workspace on the About page. Never stock photography.
- **Color of imagery**: warm. Sliiightly desaturated. No teal-and-orange grade. No black-and-white unless intentional for a single asset.

### Iconography

See ICONOGRAPHY section below.

---

## Iconography

**Primary icon system: Lucide** (https://lucide.dev/), linked from CDN. Reasons:

- Open source (ISC), zero brand risk.
- 24px nominal, 1.5px stroke — matches the system's hairline border weight.
- Outline-only — does not compete with type or color.
- Vast coverage (1,400+ icons).

**Substitution flag:** No icons were provided by the user; **Lucide is a substitution choice**. If Karim prefers a different system (Phosphor, Heroicons, Tabler), the swap is a one-line CDN change. Flagged for confirmation.

**Usage rules.**

- **Stroke width: 1.5px** (Lucide default), never thicker.
- **Size**: 16px in inline UI (button icons, nav), 20px in section headers, 24px in standalone marks.
- **Color**: inherits `currentColor`. Never tinted with accent unless the icon IS the brand mark.
- **Spacing**: minimum 8px from any adjacent text or icon.
- **No filled icons.** No duotone. No colored icons. No emoji as icons.

**Where icons appear.**

- Nav: rarely, only for the dark-mode toggle (sun/moon).
- Buttons: the primary CTA pairs with an arrow (`arrow-right` from Lucide).
- Section headers: occasionally, in case studies, to denote "Problem / Build / Results."
- Tech stack chips: never icons, only typeset names ("Next.js", "Postgres"). Tech logos are a noise factor and we avoid them.

**Unicode and special characters.**

- `→` (U+2192 RIGHTWARDS ARROW) for inline directional cues in copy ("View case study →"). Preferred over an SVG icon for inline use.
- `·` (U+00B7 MIDDLE DOT) as a separator in metadata lines ("2025 · Beirut · 6 weeks").
- `—` (em dash) used in copy; never `--` or `-` as a substitute.

**Logos and brand marks.**

- **Karim's mark** is a monogram (`KK`) set in the direction's display face, typically appearing in the header. No bespoke logo — the type IS the logo. This is intentional and signals confidence in the typography choices.
- Client logos appearing in case studies are sourced from the client and never recolored.

---

## Caveats

- **Three directions, one pick.** This system ships three directions for the user to choose from. Once a direction is picked, the other two should be removed (or kept as references in a separate folder).
- **Substitutions.** Lucide for icons and Google-hosted fonts (Instrument Serif, Geist, Geist Mono, Bricolage Grotesque, JetBrains Mono) are substitutions — none were provided. All are open-licensed.
- **Real assets needed.** Project screenshots, the About-page portrait of Karim, and client logos will need to be added to `assets/` when real materials become available. Placeholders are used throughout.
