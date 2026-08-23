export type Project = {
  slug: string;
  name: string;
  /** Rendered with .preserve-case where casing matters */
  displayName: string;
  /** Case-study hero headline; "\n" marks a line break. */
  headline: string;
  blurb: string;
  tags: string[];
  desktop: string;
  mobile: string;
  /** Macbook-framed shot shown in the case-study hero. */
  heroDesktop: string;
  /** Phone-framed shot shown in the case-study hero. */
  heroMobile: string;
  /** Shown in the browser-frame address bar of the device rig. */
  url: string;
  /** Extent of the engagement, shown in the case-study hero meta. */
  scope: string;
  caseStudy: boolean;
  /** OKLCH hue (0–360) used for the ambient scene tint while this project is active. */
  themeHue: number;
};

// Blurbs stick to confirmed facts only. Real screenshots are swapped in per project.
export const projects: Project[] = [
  {
    slug: "storiad",
    name: "Storiad",
    displayName: "Storiad",
    headline: "Storiad",
    blurb:
      "Lead developer on the logged-in app for self-published authors. An Inertia dashboard with AI-assisted writing, a press-contact database for outreach, self-publishing profit calculators, and Stripe billing.",
    tags: ["laravel", "inertia", "react", "ai"],
    desktop: "/projects/storiad.webp",
    mobile: "/projects/storiad-mobile.webp",
    heroDesktop: "/projects/storiad-macbook.webp",
    heroMobile: "/projects/storiad-mobile.webp",
    url: "app.storiad.com",
    scope: "lead developer",
    caseStudy: true,
    themeHue: 55,
  },
  {
    slug: "golden-land",
    name: "Golden Land Real Estate",
    displayName: "Golden Land Real Estate",
    headline: "Golden Land\nReal Estate",
    blurb:
      "Solo build that migrated a real-estate platform off a legacy CMS with zero data loss: 7,953 listings, 57 agents, 37K+ images. Public listings plus a full admin dashboard, with image uploads wired straight to Cloudflare R2.",
    tags: ["next.js", "react", "typescript", "cloudflare r2"],
    desktop: "/projects/goldenland.webp",
    mobile: "/projects/goldenland-mobile.webp",
    heroDesktop: "/projects/Device - Macbook Air.webp",
    heroMobile: "/projects/goldenland-mobile.webp",
    url: "goldenlandrealestate.net",
    scope: "solo build",
    caseStudy: true,
    themeHue: 80,
  },
  {
    slug: "worktales",
    name: "Worktales",
    displayName: "Worktales",
    headline: "Worktales",
    blurb:
      "A full redesign of a B2B sales-talent site, rebuilt page by page for two audiences: employers and job-seeking salespeople. A dark-themed, motion-driven layout built to communicate focus and authority.",
    tags: ["redesign"],
    desktop: "/projects/worktales.webp",
    mobile: "/projects/worktales-mobile.webp",
    heroDesktop: "/projects/worktales-macbook.webp",
    heroMobile: "/projects/worktales-mobile.webp",
    url: "worktales.com",
    scope: "full redesign",
    caseStudy: true,
    themeHue: 35,
  },
  {
    slug: "trublu",
    name: "Trublu",
    displayName: "Trublu",
    headline: "Trublu\nTechnical",
    blurb:
      "Converted a complete design into production for a Beirut home-services firm. Per-service pages and a WhatsApp-driven booking funnel, with full technical SEO.",
    tags: ["next.js", "react", "typescript"],
    desktop: "/projects/trublu.webp",
    mobile: "/projects/trublu-mobile.webp",
    heroDesktop: "/projects/turblue-macbook.webp",
    heroMobile: "/projects/trublu-mobile.webp",
    url: "trublutechnical.com",
    scope: "build from design",
    caseStudy: true,
    themeHue: 200,
  },
];

/** Look up a project by slug. Throws on an unknown slug so build/render fails loudly. */
export function getProject(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project slug: ${slug}`);
  return project;
}
