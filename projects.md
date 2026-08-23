# Projects

Portfolio case-study notes. Each entry covers role, problem, what shipped, and stack.
Kept short and punchy. No invented metrics, only confirmed facts.

---

## Storiad: SaaS for Independent Authors

**Role:** Lead developer on a team.

**The problem:** Self-published authors have no single place to manage their brand, their content, and their book promotion.

**What shipped:** The logged-in application at app.storiad.com, an Inertia dashboard covering the full author workflow:

- AI-assisted writing and chatbot feature
- Author-website management
- Stripe subscription billing
- Contacts Database: a media and press directory authors search to build outreach lists and pitch reviewers and bloggers
- Financial Calculators for self-publishing (projected book worth and ROI, sales targets, profit and loss) with charts and a public, iframe-embeddable version for marketing

I also led the SEO and content work.

**Stack:** Laravel, React via Inertia.js, MySQL.

---

## Golden Land: Real Estate Platform

**Role:** Solo developer. Built end to end.

**The problem:** Golden Land ran on an aging ApostropheCMS platform, with years of real inventory locked inside it.

**What shipped:** A full rebuild in Next.js that migrated the entire legacy dataset (7,953 properties, 57 agents, 37K+ images) with zero data loss. The public site handles listings, property and agent detail pages, and contact. A separate admin dashboard lets staff manage listings, agents, and contacts, so a listing goes from draft to live without touching a server. To get past Vercel's upload-size limit, images upload straight to Cloudflare R2 through presigned URLs.

**Stack:** Next.js, React, TypeScript, MongoDB, Cloudflare R2.

---

## Worktales: Sales-Talent Marketing Site

**Role:** Solo developer. Full redesign.

**The problem:** Worktales, a B2B sales-talent company, had outgrown a site that no longer reflected who they were or who they sell to.

**What shipped:** A full redesign of their existing site, rebuilt page by page. The copy speaks to two audiences: employers ("For Businesses") and job-seeking salespeople. It covers the employer pillar pages (Diagnose, Develop, Deliver), a candidate talent-pool page, a webinars library, a homepage, and an about page, all rewritten to match the client's brand voice. The dark-themed, motion-driven layout communicates focus and authority.

**Stack:** Hand-written HTML, CSS, and JS with no framework or build step.

---

## Trublu: Home Services Marketing Site

**Role:** Solo developer. Built to a supplied design.

**The problem:** A Beirut home-repair service ("True Service. Blue Standard.") needed a site that turns visitors into booked jobs, with WhatsApp as the booking channel.

**What shipped:** A supplied design converted into production. It includes a homepage, an about page, and dynamic per-service pages (plumbing, electrical, HVAC, water heater, handyman, and custom jobs), each with its own add-ons. A WhatsApp CTA drives the leads. The build ships full technical SEO: sitemap, structured data, OG images, and canonical URLs.

**Stack:** Next.js, React, TypeScript, Tailwind CSS.
