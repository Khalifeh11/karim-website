import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectCarousel from "./components/ProjectCarousel";
import SelectedWork from "./components/SelectedWork";
import ContactCta from "./components/ContactCta";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectCarousel />
        <SelectedWork />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
