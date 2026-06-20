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
};

// Blurbs stick to confirmed facts only — real copy and screenshots
// are swapped in per project once Karim provides them.
export const projects: Project[] = [
  {
    slug: "golden-land",
    name: "golden land real estate",
    displayName: "golden land real estate",
    blurb:
      "a next.js real-estate platform with cloudflare r2 image storage.",
    tags: ["next.js", "cloudflare r2"],
    desktop: "/projects/goldenland.png",
    mobile: "/projects/goldenland-mobile.png",
    url: "goldenlandrealestate.net",
    caseStudy: true,
  },
  {
    slug: "storiad",
    name: "storiad",
    displayName: "storiad",
    blurb:
      "a laravel / inertia / react saas for book marketing — openai function-calling integration and multi-tenant provisioning.",
    tags: ["laravel", "inertia", "react", "openai"],
    desktop: "/projects/storiad.png",
    mobile: "/projects/storiad-mobile.png",
    url: "app.storiad.com",
    caseStudy: false,
  },
  {
    slug: "worktales",
    name: "worktales",
    displayName: "worktales",
    blurb:
      "a consultancy redesign, featuring a dark-themed svg insights discovery wheel.",
    tags: ["redesign", "svg"],
    desktop: "/projects/worktales.png",
    mobile: "/projects/worktales-mobile.png",
    url: "work-tales.pages.dev",
    caseStudy: false,
  },
  {
    slug: "trublu",
    name: "trublu",
    displayName: "trublu",
    blurb: "case study in progress.",
    tags: [],
    desktop: "/projects/trublu.png",
    mobile: "/projects/trublu-mobile.png",
    url: "trublutechnical.com",
    caseStudy: false,
  },
];
