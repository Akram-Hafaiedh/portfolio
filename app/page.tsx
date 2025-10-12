import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SkillsHighlights from "./components/SkillsHighlights";
import ExperienceHighlights from "./components/ExperienceHighlights";
import ProjectsHighlights from "./components/ProjectsHighlights";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />

      <Hero />
      <About />
      <ExperienceHighlights />
      <SkillsHighlights />
      <ProjectsHighlights />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
