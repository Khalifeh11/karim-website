---
name: karim-khalifeh-design
description: Use this skill to generate well-branded interfaces, mocks, slides, and assets for Karim Khalifeh — a freelance full-stack web developer based in Beirut. Contains brand guidelines, voice and tone rules, type and color tokens, web fonts, iconography, and three complete homepage UI kits (Editorial / Technical / Studio) for prototyping his portfolio and client deliverables.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Important context

This brand currently ships **three visual directions** the user is choosing between:

| Class | Direction | Anchor |
|---|---|---|
| `.dir-modern`    | A · Modern    | Geist + Geist Mono — dark-default, all-lowercase, deep forest accent, terminal motif |
| `.dir-technical` | B · Technical | Geist throughout + electric blue, near-white/near-black |
| `.dir-studio`    | C · Studio    | Bricolage Grotesque + Geist + deep forest, bone background |

When asked for a Karim deliverable, **first confirm which direction** to use. If the user hasn't decided, default to **A · Modern** — bold sans, deep forest, with subtle motion built in. All three direction tokens live as CSS custom properties in `colors_and_type.css`; apply the relevant `.dir-*` class to the root element (also `.dark` for dark mode).

## Voice rules (non-negotiable)

- First person, lowercase confidence.
- Karim is "I" — never "we." He is a freelancer.
- Real, specific numbers. No marketing slop ("transform," "leverage," "next-generation").
- No emoji.
- Sentence case for headings and UI; Title Case only for proper nouns.

See README.md → "Content fundamentals" for full guidance and examples.

## File layout

- `README.md` — full brand guide (voice, visual foundations, iconography)
- `colors_and_type.css` — all design tokens for the three directions
- `preview/*.html` — design system cards (type, colors, components, brand)
- `ui_kits/modern/`, `ui_kits/technical/`, `ui_kits/studio/` — full portfolio recreations per direction
- `index.html` — landing page comparing the three directions

## Sourcing assets

- **Icons**: link Lucide from CDN (https://unpkg.com/lucide-static/icons/...). 1.5px stroke, outline-only.
- **Fonts**: Google Fonts CDN for Instrument Serif, Geist, Geist Mono, Bricolage Grotesque, JetBrains Mono.
- **Logos & screenshots**: none provided yet. Use the typeset monogram (`KK` in the direction's display face) as the logo. Use linear-gradient or solid color placeholders for project screenshots until real assets arrive.
