export type Project = {
  slug: string;
  name: string;
  /** Rendered with .preserve-case where casing matters */
  displayName: string;
  blurb: string;
  tags: string[];
  desktop: string;
  mobile: string;
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
    desktop: "/placeholders/golden-land-desktop.svg",
    mobile: "/placeholders/golden-land-mobile.svg",
    caseStudy: true,
  },
  {
    slug: "storiad",
    name: "storiad",
    displayName: "storiad",
    blurb:
      "a laravel / inertia / react saas for book marketing — openai function-calling integration and multi-tenant provisioning.",
    tags: ["laravel", "inertia", "react", "openai"],
    desktop: "/placeholders/storiad-desktop.svg",
    mobile: "/placeholders/storiad-mobile.svg",
    caseStudy: false,
  },
  {
    slug: "worktales",
    name: "worktales",
    displayName: "worktales",
    blurb:
      "a consultancy redesign, featuring a dark-themed svg insights discovery wheel.",
    tags: ["redesign", "svg"],
    desktop: "/placeholders/worktales-desktop.svg",
    mobile: "/placeholders/worktales-mobile.svg",
    caseStudy: false,
  },
  {
    slug: "trublu",
    name: "trublu",
    displayName: "trublu",
    blurb: "case study in progress.",
    tags: [],
    desktop: "/placeholders/trublu-desktop.svg",
    mobile: "/placeholders/trublu-mobile.svg",
    caseStudy: false,
  },
];
