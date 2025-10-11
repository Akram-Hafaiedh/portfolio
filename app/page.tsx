import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SkillsHighlights from "./components/SkillsHighlights";
import ExperienceHighlights from "./components/ExperienceHighlights";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />

      <Hero />
      <About />
      <ExperienceHighlights />
      <SkillsHighlights />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
