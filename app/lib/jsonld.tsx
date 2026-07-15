import type { Project } from "@/app/data/projects";

export const SITE_URL = "https://karimkhalifeh.com";

export const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Karim Khalifeh",
  jobTitle: "Full-Stack Web Developer",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beirut",
    addressCountry: "Lebanon",
  },
  sameAs: [
    "https://github.com/Khalifeh11",
    "https://www.linkedin.com/in/karimkhalifeh/",
  ],
};

/** WebPage + BreadcrumbList for a work case study. */
export function workJsonLd(project: Project, description: string) {
  const pageUrl = `${SITE_URL}/work/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: project.name,
        description,
        author: PERSON,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: project.name, item: pageUrl },
        ],
      },
    ],
  };
}

/** Escapes "<" so user data can never close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
