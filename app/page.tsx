import Contact from "./components/Contact";
import ExperienceHighlights from "./components/ExperienceHighlights";
import ProjectsHighlights from "./components/ProjectsHighlights";
import HeroAboutSection from "./components/Sections/HeroAboutSection";

export default function Home() {
  return (
    <div>
      <HeroAboutSection />
      <ExperienceHighlights />
      <ProjectsHighlights />  
      <Contact />
    </div>
  );
}
