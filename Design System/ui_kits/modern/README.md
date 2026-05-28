# UI Kit · Direction A — Modern

Technical, but human. Dark by default, all-lowercase typography, deep forest accent.

## Distinguishing features

- **Terminal-prompt motif** — `>_` glyph in the brand mark, status pills (`>_ available for new projects — april 2026_` with a blinking cursor), `cd ..` back-links on case studies.
- **Numbered nav** — `01 / work`, `02 / about`, `03 / contact`. The active route gets a forest-soft pill background.
- **All-lowercase** — every word, including headlines and buttons. Proper nouns (Karim, project names, tech stack chips) preserved via `.preserve-case` class.
- **Dark by default** — light variant available via the theme pill, persisted in localStorage.
- **Animated node-graph hero** — an SVG of 9 nodes (next, ts, edge, pg, redis, stripe, auth, s3, resend) connected by edges. Nodes pulse with staggered timing; a "signal" travels along a pre-defined path through the graph.
- **Large project cards with mockup centerpiece** — each card has a meta strip (number, client, project name, year), a 16:10 mockup frame with browser chrome (traffic-light dots + URL pill), then a one-line description with stack chips on the right.
- **Four pages only** — home, work, about, contact. Case studies are reached by clicking a project card.

## Motion

- Entrance fade-ups (10px translate + opacity), 460ms, staggered 60–90ms per child.
- Route transitions: 140ms fade-out, 420ms fade-up in.
- Project cards: mockup zooms slightly on hover; border colors to accent.
- Theme pill: icon swap.
- Node graph: continuous, subtle. Nodes pulse opacity; signal travels along edges via stroke-dashoffset animation.
- `prefers-reduced-motion` disables everything.

## Files

- `index.html` — entry, loads React + JSX
- `styles.css` — visual layer
- `components.jsx` — Header, Footer, Button, NodeGraph, ProjectCard, FadeIn, ThemePill
- `pages.jsx` — Home, Work, CaseStudy, About, Contact
- `main.jsx` — App shell, state router, page transitions, theme persistence

## Footer personality touches

- "all systems operational" status with pulsing dot
- last deploy timestamp, Beirut local time
- `site_meta` column: version (v 4.2.0), build hash (0a3f1), commit short
- "no cookies. no analytics." sign-off

## Status

Recreation of the design direction, not production code. The node graph is decorative; project mockups are gradient placeholders.
