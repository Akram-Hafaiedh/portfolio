'use client';
import { FaBriefcase, FaDownload } from 'react-icons/fa';
import { getProfessionalData } from '@/lib/professionalData';
import { useLanguage } from '@/app/context/LanguageContext';

// Color mapping for each experience
const experienceColors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500"
];

export default function UnifiedExperiencePage() {
    const { language } = useLanguage();
    const data = getProfessionalData(language);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `/resume/${language}/resume.pdf`;
        link.download = `Akram_Hafaiedh_Resume_${language.toUpperCase()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative bg-slate-950 overflow-hidden min-h-screen">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />
            <div className="fixed top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
            <div className="fixed top-1/2 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="fixed bottom-10 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6 animate-fade-in-up">
                            <FaBriefcase className="text-xs" />
                            {data.experienceSection.badge}
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            {data.experienceSection.title}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {data.experienceSection.subtitle}
                        </p>
                    </div>
                </div>

                {/* Skills Summary Section */}
                <div className="px-4 sm:px-6 lg:px-8 pb-20 border-b border-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Technical Expertise</h2>
                            <p className="text-slate-400">Core technologies and frameworks I work with</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    title: "Frontend",
                                    color: "from-blue-500 to-cyan-500",
                                    skills: ["React", "Vue.js", "Next.js", "Nuxt.js", "Angular", "TypeScript", "TailwindCSS"]
                                },
                                {
                                    title: "Backend",
                                    color: "from-green-500 to-emerald-500",
                                    skills: ["Laravel", "Node.js", "Express.js", "Django", "REST API", "GraphQL"]
                                },
                                {
                                    title: "Database",
                                    color: "from-purple-500 to-pink-500",
                                    skills: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis"]
                                },
                                {
                                    title: "Tools & Others",
                                    color: "from-orange-500 to-red-500",
                                    skills: ["Git", "Docker", "Vercel", "AWS", "Ionic", "Livewire"]
                                }
                            ].map((category, index) => (
                                <div
                                    key={index}
                                    className="group relative animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />
                                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl hover:border-purple-500/50 transition-all h-full">
                                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            <span className="text-white text-2xl font-bold">{category.title.charAt(0)}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-4">{category.title}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {category.skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 text-slate-300 rounded-lg text-xs hover:border-purple-500/50 hover:text-white transition-all"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Experience Timeline */}
                <div className="px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-5xl mx-auto">
                        {/* Timeline */}
                        <div className="relative">
                            {/* Center Line */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />

                            {/* Experience Cards */}
                            <div className="space-y-12">
                                {data.experiences.map((exp, index) => {
                                    const color = experienceColors[index % experienceColors.length];
                                    return (
                                        <div
                                            key={exp.id}
                                            className={`relative animate-fade-in-up ${index % 2 === 0
                                                ? 'md:pr-[calc(50%+2rem)] md:text-right'
                                                : 'md:pl-[calc(50%+2rem)] md:text-left'
                                                }`}
                                            style={{ animationDelay: `${index * 150}ms` }}
                                        >
                                            {/* Timeline Dot */}
                                            <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2">
                                                <div className="relative">
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full animate-ping opacity-75`} />
                                                    <div className={`relative w-4 h-4 bg-gradient-to-r ${color} rounded-full border-4 border-slate-950`} />
                                                </div>
                                            </div>

                                            {/* Card */}
                                            <div className="group relative">
                                                <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                                                <div className="relative bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                                                    {/* Header */}
                                                    <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                                        <div className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                            <FaBriefcase className="text-white text-2xl" />
                                                        </div>
                                                        <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                                                            <div className={`text-sm font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}>
                                                                {exp.period}
                                                            </div>
                                                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                                                {exp.title}
                                                            </h3>
                                                            <p className="text-purple-400 font-semibold text-sm mb-2">
                                                                {exp.company} • {exp.location}
                                                            </p>
                                                            <span className={`inline-block px-3 py-1 bg-gradient-to-r ${color} bg-opacity-10 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-300`}>
                                                                {exp.type}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <p className={`text-slate-300 leading-relaxed mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                                                        {exp.description}
                                                    </p>

                                                    {/* Achievements */}
                                                    <div className={`mb-6 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                                                        <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">{data.keyAchievements}</h4>
                                                        <ul className="space-y-2">
                                                            {exp.achievements.map((achievement, i) => (
                                                                <li key={i} className={`flex items-start gap-2 ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                                                                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${color} mt-1`}>•</span>
                                                                    <span className="text-slate-300 text-sm">{achievement}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Skills */}
                                                    <div className={index % 2 === 0 ? 'md:flex md:justify-end' : ''}>
                                                        <div className="flex flex-wrap gap-2">
                                                            {exp.skills.map((skill, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-300 rounded-lg text-xs font-medium hover:scale-105 transition-transform"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats & Download Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/50">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">{data.professionalSummary.title}</h2>
                            <p className="text-slate-400">{data.professionalSummary.subtitle}</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                            {[
                                { label: data.professionalSummary.stats.yearsLabel, value: "4+", color: "from-blue-600 to-cyan-600", icon: "📅" },
                                { label: data.professionalSummary.stats.companiesLabel, value: data.experiences.length.toString(), color: "from-purple-600 to-pink-600", icon: "🏢" },
                                { label: data.professionalSummary.stats.technologiesLabel, value: "20+", color: "from-green-600 to-emerald-600", icon: "⚡" }
                            ].map((stat, index) => (
                                <div key={index} className="group relative">
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl text-center group-hover:scale-105 transition-transform">
                                        <div className="text-4xl mb-3">{stat.icon}</div>
                                        <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                                        <div className="text-sm text-slate-400">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Download Resume Button */}
                        <div className="text-center">
                            <button
                                onClick={handleDownload}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-2xl hover:scale-105"
                            >
                                <FaDownload className="text-xl" />
                                <span className="text-lg">{data.downloadBtn}</span>
                            </button>
                            <p className="text-slate-500 text-sm mt-4">{data.professionalSummary.downloadDescription}</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/50">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            {data.cta.badge}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {data.cta.title}
                        </h2>
                        <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto">
                            {data.cta.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
                            >
                                {data.cta.getInTouch}
                            </a>
                            <a
                                href="/projects"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 border-2 border-slate-700 hover:border-purple-500 text-white rounded-xl font-bold transition-all hover:scale-105"
                            >
                                {data.cta.viewWork}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Styles */}
            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
} 