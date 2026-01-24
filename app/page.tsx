import Contact from "./components/Contact";
import ExperienceHighlights from "./components/ExperienceHighlights";
import ProjectsHighlights from "./components/ProjectsHighlights";
import ScrollProgress from "./components/ScrollProgress";
import HeroAboutSection from "./components/Sections/HeroAboutSection";

export default function Home() {
  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Unified Animated background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />
      
      {/* Unified Floating Gradient Orbs */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="fixed top-1/2 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="fixed bottom-10 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
      


      <ScrollProgress />

      
      {/* Content with relative positioning */}
      <div className="relative z-10">
        <HeroAboutSection />
        <ExperienceHighlights />
        <ProjectsHighlights />  
        <Contact />
      </div>
    </div>
  );
}