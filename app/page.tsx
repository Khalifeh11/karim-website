import type { Metadata } from "next";
import Header from "./components/Header";
import AetherFlowHero from "./components/AetherFlowHero";
import ProjectCarousel from "./components/ProjectCarousel";
import Services from "./components/Services";
import Process from "./components/Process";
import ContactCta from "./components/ContactCta";
import Footer from "./components/Footer";
import { JsonLd, PERSON } from "./lib/jsonld";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://karimkhalifeh.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: PERSON,
};

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
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
