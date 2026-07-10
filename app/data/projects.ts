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
  /** Year shown in the case-study hero meta. */
  year: string;
  caseStudy: boolean;
  /** OKLCH hue (0–360) used for the ambient scene tint while this project is active. */
  themeHue: number;
};

// Blurbs stick to confirmed facts only — real copy and screenshots
// are swapped in per project once Karim provides them.
export const projects: Project[] = [
  {
    slug: "golden-land",
    name: "golden land real estate",
    displayName: "golden land real estate",
    headline: "golden land\nreal estate",
    blurb:
      "built the full platform from scratch — property listings, agent dashboards, and media uploads backed by cloudflare r2. listings go from draft to live without touching a server.",
    tags: ["next.js", "react", "typescript", "cloudflare r2"],
    desktop: "/projects/goldenland.webp",
    mobile: "/projects/goldenland-mobile.webp",
    heroDesktop: "/projects/Device - Macbook Air.webp",
    heroMobile: "/projects/goldenland-mobile.webp",
    url: "goldenlandrealestate.net",
    year: "2024",
    caseStudy: true,
    themeHue: 80,
  },
  {
    slug: "storiad",
    name: "storiad",
    displayName: "storiad",
    headline: "storiad",
    blurb:
      "a multi-tenant saas for book marketing. built on laravel + react via inertia, with openai function-calling to automate campaign generation — each author gets an isolated, provisioned workspace.",
    tags: ["laravel", "inertia", "react", "openai"],
    desktop: "/projects/storiad.webp",
    mobile: "/projects/storiad-mobile.webp",
    heroDesktop: "/projects/storiad-macbook.webp",
    heroMobile: "/projects/storiad-mobile.webp",
    url: "app.storiad.com",
    year: "2024",
    caseStudy: true,
    themeHue: 55,
  },
  {
    slug: "worktales",
    name: "worktales",
    displayName: "worktales",
    headline: "worktales",
    blurb:
      "worktales were repositioning their consultancy — the old site no longer reflected who they were. redesigned the web presence from the ground up to match the new direction, with a dark-themed, motion-driven layout built to communicate focus and authority.",
    tags: ["redesign", "svg"],
    desktop: "/projects/worktales.webp",
    mobile: "/projects/worktales-mobile.webp",
    heroDesktop: "/projects/worktales-macbook.webp",
    heroMobile: "/projects/worktales-mobile.webp",
    url: "work-tales.pages.dev",
    year: "2024",
    caseStudy: true,
    themeHue: 35,
  },
  {
    slug: "trublu",
    name: "trublu",
    displayName: "trublu",
    headline: "trublu\ntechnical",
    blurb:
      "a full build for a technical services firm — converted a complete design into production, with a clean layout optimised to turn visitors into leads.",
    tags: ["next.js", "react", "typescript"],
    desktop: "/projects/trublu.webp",
    mobile: "/projects/trublu-mobile.webp",
    heroDesktop: "/projects/turblue-macbook.webp",
    heroMobile: "/projects/trublu-mobile.webp",
    url: "trublutechnical.com",
    year: "2024",
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
