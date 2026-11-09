import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Karim Khalifeh — senior full-stack developer",
    short_name: "Karim Khalifeh",
    description:
      "Senior full-stack developer in Beirut — Laravel, React, Node, and applied AI. Four years owning the backend of a ~1,000-user publishing platform. Open to remote senior roles.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0d0a",
    theme_color: "#0a0d0a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
