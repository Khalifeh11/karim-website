import Header from "./components/Header";
import AetherFlowHero from "./components/AetherFlowHero";
import ProjectCarousel from "./components/ProjectCarousel";
import SelectedWork from "./components/SelectedWork";
import ContactCta from "./components/ContactCta";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <AetherFlowHero />
        <ProjectCarousel />
        <SelectedWork />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
