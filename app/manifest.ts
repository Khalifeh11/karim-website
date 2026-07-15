import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Karim Khalifeh — full-stack developer, Beirut",
    short_name: "Karim Khalifeh",
    description:
      "I'm Karim — a freelance full-stack developer based in Beirut. I build fast, well-engineered websites and web apps for businesses around the world.",
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
