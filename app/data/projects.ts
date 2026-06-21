export type Project = {
  slug: string;
  name: string;
  /** Rendered with .preserve-case where casing matters */
  displayName: string;
  blurb: string;
  tags: string[];
  desktop: string;
  mobile: string;
  /** Shown in the browser-frame address bar of the device rig. */
  url: string;
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
    blurb:
      "built the full platform from scratch — property listings, agent dashboards, and media uploads backed by cloudflare r2. listings go from draft to live without touching a server.",
    tags: ["next.js", "cloudflare r2"],
    desktop: "/projects/goldenland.png",
    mobile: "/projects/goldenland-mobile.png",
    url: "goldenlandrealestate.net",
    caseStudy: true,
    themeHue: 80,
  },
  {
    slug: "storiad",
    name: "storiad",
    displayName: "storiad",
    blurb:
      "a multi-tenant saas for book marketing. built on laravel + react via inertia, with openai function-calling to automate campaign generation — each author gets an isolated, provisioned workspace.",
    tags: ["laravel", "inertia", "react", "openai"],
    desktop: "/projects/storiad.png",
    mobile: "/projects/storiad-mobile.png",
    url: "app.storiad.com",
    caseStudy: false,
    themeHue: 55,
  },
  {
    slug: "worktales",
    name: "worktales",
    displayName: "worktales",
    blurb:
      "worktales were repositioning their consultancy — the old site no longer reflected who they were. redesigned the web presence from the ground up to match the new direction, with a dark-themed, motion-driven layout built to communicate focus and authority.",
    tags: ["redesign", "svg"],
    desktop: "/projects/worktales.png",
    mobile: "/projects/worktales-mobile.png",
    url: "work-tales.pages.dev",
    caseStudy: false,
    themeHue: 35,
  },
  {
    slug: "trublu",
    name: "trublu",
    displayName: "trublu",
    blurb:
      "a full build for a technical services firm — converted a complete design into production, with a clean layout optimised to turn visitors into leads.",
    tags: [],
    desktop: "/projects/trublu.png",
    mobile: "/projects/trublu-mobile.png",
    url: "trublutechnical.com",
    caseStudy: false,
    themeHue: 200,
  },
];
