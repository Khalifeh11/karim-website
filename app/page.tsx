import Preloader from "./components/editorial/Preloader";
import EditorialMasthead from "./components/editorial/EditorialMasthead";
import EditorialHero from "./components/editorial/EditorialHero";
import WorkIndex from "./components/editorial/WorkIndex";
import EditorialAbout from "./components/editorial/EditorialAbout";
import EditorialContact from "./components/editorial/EditorialContact";
import EditorialFooter from "./components/editorial/EditorialFooter";

export default function Home() {
  return (
    <div className="dir-editorial">
      <Preloader />
      <EditorialMasthead />
      <main>
        <EditorialHero />
        <WorkIndex />
        <EditorialAbout />
        <EditorialContact />
      </main>
      <EditorialFooter />
    </div>
  );
}
