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
    desktop: "/projects/goldenland.png",
    mobile: "/projects/goldenland-mobile.png",
    heroDesktop: "/projects/Device - Macbook Air.png",
    heroMobile: "/projects/goldenland-mobile.png",
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
    desktop: "/projects/storiad.png",
    mobile: "/projects/storiad-mobile.png",
    heroDesktop: "/projects/storiad-macbook.png",
    heroMobile: "/projects/storiad-mobile.png",
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
    desktop: "/projects/worktales.png",
    mobile: "/projects/worktales-mobile.png",
    heroDesktop: "/projects/worktales-macbook.png",
    heroMobile: "/projects/worktales-mobile.png",
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
    desktop: "/projects/trublu.png",
    mobile: "/projects/trublu-mobile.png",
    heroDesktop: "/projects/turblue-macbook.png",
    heroMobile: "/projects/trublu-mobile.png",
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
