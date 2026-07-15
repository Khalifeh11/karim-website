# Projects

## Golden Land

### 1. What it is
A real estate listings website for Golden Land, rebuilt in Next.js (App Router) as a migration off the old ApostropheCMS platform. It carries over an existing dataset — ~7,953 properties, 57 agents, 37K+ images, 236 contact submissions — while modernizing the stack.

### 2. Main things built
- Public site: home, about, contact, property listings + detail pages, agent listings + detail pages, login.
- Admin dashboard: properties (list/create/edit), agents, contacts, users, and a trash view for soft-deleted records.
- Supporting API routes for all of the above, plus presigned-upload endpoints for images and location lookups.
- Data models: Property, Agent, ContactRequest, User (Mongoose).

### 3. How it's put together
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4.
- MongoDB/Mongoose for data (kept from the legacy system since listings are semi-structured).
- NextAuth v5 for auth, bcrypt for passwords.
- Cloudflare R2 (via S3 SDK) for image storage with presigned uploads — worked around Vercel's payload size limits. sharp for image processing.
- Radix UI, Tiptap editor, react-hook-form + Zod, Resend for email.
- Notable quirk: AGENTS.md tells any AI coding agent that this Next.js version diverges from training data and to check the bundled docs before writing code — a deliberate guardrail against outdated Next.js assumptions.

---

## Storiad

### 1. What it is
Storiad is a SaaS platform for independent authors — a marketing/publishing toolkit that helps self-published writers manage their author brand, content, and book promotion. `app.storiad.com` is the logged-in application (this repo); it sits alongside a marketing site on the main `storiad.com` Webflow domain and individual author websites hosted on WordPress on a separate server.

### 2. Main things built
- Core app: an Inertia-driven dashboard experience (`resources/js/Pages/NewDesign/`) covering the authenticated author workflow — content tools, an AI-assisted writing/chatbot feature (`ChatbotController.php`, `PersonaAi.jsx`), and author website management.
- Billing via Laravel Spark/Stripe subscriptions.
- An admin layer via Laravel Nova.
- A large, ongoing SEO/content initiative: an 11-step blog pipeline (`/content-writing` skill), recovery work after an August 2025 Google Core Update hit traffic hard, and cleanup of AI-thin/duplicate content.
- Recent git history shows mostly small fixes/polish: nav label renaming, PWA service-worker error handling, Sentry source-map config, Composer platform pinning — i.e. the app is in a stabilization/maintenance phase, not a big feature push right now.

### 3. How it's put together
- Backend: Laravel 9 / PHP 8.x, JWT for API auth, Laravel session for web, business logic in `app/Services/`.
- Frontend: React 18 via Inertia.js, Tailwind + MUI, Zustand (single store) + React Query, bundled with Vite.
- Data: MySQL.
- Notable pattern: a mega-controller (`RoutesController`) handles most Inertia page routing rather than one controller per resource.
- Known rough edge: the `api` middleware group has ~45 unauthenticated GET routes (no auth on that group at all) — flagged in a prior security audit but not yet remediated.
- No JS test runner is configured; PHP testing is PHPUnit/Feature-test based.

---

## Trublu

### 1. What it is
Trublu is a marketing website for a Beirut-based home repair and maintenance service ("True Service. Blue Standard."). It targets homeowners looking to book verified technicians for plumbing, electrical, HVAC, water heater, and general handyman work, with WhatsApp as the primary booking channel.

### 2. Main things built
- Homepage: hero section with WhatsApp CTA, services showcase, "Why Choose Us" section, and a "Blue Standard" brand-values block.
- Services section: a services listing page plus dynamic per-service detail pages (`/services/[slug]`) for Plumbing, Electrical, Heating & Cooling, Water Heater, Handyman, and Custom Jobs — each with its own headline, description, and an add-ons carousel/grid (parts and spares like capacitors, contactors, refrigerant gas, etc.).
- About page: intro, Blue Standard explanation, and a contact section.
- Site chrome: navbar, mobile menu, footer, scroll-to-top, and a floating WhatsApp button.
- SEO work (most recent commits): sitemap, robots.txt, OG image generation, JSON-LD structured data (HomeAndConstructionBusiness), canonical URLs pinned to www, and improved titles/meta descriptions.

### 3. How it's put together
- Stack: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4.
- Structure: pages live under `src/app/(marketing)/`; all copy/content is centralized in `src/content/marketing.ts` as the single source of truth; components split into `ui/` (generic primitives) and `marketing/` (page-specific, with `about/` and `services/` subfolders mirroring the routes).
- Notable patterns: design tokens as CSS custom properties (navy #00213c, cyan accent #65d3ef), fluid `clamp()`-based spacing/typography instead of breakpoint classes, and SEO handled via Next.js route handlers (`robots.ts`, `sitemap.ts`) rather than static files.
- No test suite is configured; `next lint` and `next build` are the main checks.

---

## Worktales

### 1. What it is
Worktales is a B2B sales-talent company (hiring, training, and "acceleration" of salespeople, plus a candidate-facing talent pool). This repo is their public marketing site — a static, dependency-free multi-page site meant to sell that offering to two audiences: employers ("For Businesses") and job-seeking salespeople.

### 2. Main things built
On the `sales-redesign` branch, the site was substantially rebuilt from an earlier structure:
- Homepage (`index.html`) with a redesigned hero, orbit graphic, and stats.
- Employer-facing pillar pages renamed and reworked: Attract→Hire, Develop→Train; `accel` follows the same visual pattern. Old `attract.html`/`develop.html` are now just meta-refresh redirects to `hire.html`.
- New pages: `talent.html` (candidate-facing "Join Talent Pool"), `webinars.html` (live/on-demand library via iframe), `aboutus.html` (full-viewport hero, rewritten FAQs).
- Site-wide copy pass against a "company profile" source of truth — audience language shifted to "For Businesses," em dashes stripped per client, form subjects updated, CTAs pointed at a real booking/scheduler link.
- Visual polish throughout: pillar/stat card redesigns, hero-meta dividers, watermark cleanup, image frame simplification.

### 3. How it's put together
No framework, build step, or package manager — hand-written HTML/CSS/JS. One shared stylesheet (`homepage.css`, dark theme, Montserrat, Font Awesome) and one shared script (dropdowns / mobile menu / contact-form-as-mailto) referenced across every page. Header and footer are copy-pasted into each HTML file (no partials/includes), which is the main structural risk — every nav/footer change must be made in multiple places. `_docs/` holds source sales material (PDFs, design exports) that isn't part of the deployed site.
