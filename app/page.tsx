'use client';

import Contact from "./components/Contact";
import ExperienceHighlights from "./components/home/ExperienceHighlights";
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import ScrollProgress from "./components/ScrollProgress";
import CTA from "./components/CTA";
import { useLanguage } from "./context/LanguageContext";
import { homeContent as enHome } from "@/lib/data/en/home";
import { homeContent as frHome } from "@/lib/data/fr/home";
import { commonContent as enCommon } from "@/lib/data/en/common";
import { commonContent as frCommon } from "@/lib/data/fr/common";
import ProjectsHighlights from "./components/home/ProjectsHighlights";

export default function Home() {
  const { language } = useLanguage();
  const content = language === 'fr' ? frHome : enHome;
  const common = language === 'fr' ? frCommon : enCommon;

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden min-h-screen">
      {/* Animated Background Grid - Light Mode */}
      <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

      {/* Animated Background Grid - Dark Mode */}
      <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

      {/* Floating Gradient Orbs - Light Mode */}
      <div className="block dark:hidden fixed top-10 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
      <div className="block dark:hidden fixed top-1/2 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="block dark:hidden fixed bottom-10 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Floating Gradient Orbs - Dark Mode */}
      <div className="hidden dark:block fixed top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="hidden dark:block fixed top-1/2 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="hidden dark:block fixed bottom-10 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Additional Subtle Orbs */}
      <div className="block dark:hidden fixed top-1/4 right-1/4 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }} />
      <div className="hidden dark:block fixed top-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }} />

      <ScrollProgress sections={['Home', 'About', 'Experience', 'Projects', 'Contact']} />

      {/* Content with relative positioning */}
      <div className="relative z-10">
        <Hero />
        <About />
        <ExperienceHighlights />
        <ProjectsHighlights />
        <Contact />

        {/* Final CTA before footer */}
        <CTA
          title={content.cta.title}
          description={content.cta.description}
          buttons={[]}
        />
      </div>
    </div>
  );
}