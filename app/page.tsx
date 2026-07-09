import type { Metadata } from "next";
import Header from "./components/Header";
import AetherFlowHero from "./components/AetherFlowHero";
import ProjectCarousel from "./components/ProjectCarousel";
import Services from "./components/Services";
import Process from "./components/Process";
import ContactCta from "./components/ContactCta";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://karimkhalifeh.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Karim Khalifeh",
    jobTitle: "Full-Stack Web Developer",
    url: "https://karimkhalifeh.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beirut",
      addressCountry: "Lebanon",
    },
    sameAs: [
      "https://github.com/Khalifeh11",
      "https://www.linkedin.com/in/karimkhalifeh/",
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <AetherFlowHero />
        <ProjectCarousel />
        <Services />
        <Process />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
