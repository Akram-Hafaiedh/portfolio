import { skillsHighlights } from "@/lib/skills";
import Link from "next/link";
import { FaArrowRight, FaCode, FaCreativeCommonsSamplingPlus, FaDatabase, FaServer } from "react-icons/fa6";
interface IconMap {
    [key: string]: typeof FaCode;
}

const iconMap: IconMap = {
    FaCode: FaCode,
    FaServer: FaServer,
    FaDatabase: FaDatabase,
    FaCreativeCommonsSamplingPlus: FaCreativeCommonsSamplingPlus,
};


export default function SkillsHighlights() {

    return (
        <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">
                    Technical Skills
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {skillsHighlights.map((category, index) => {
                        const IconComponent = iconMap[category.icon];
                        return (
                            <div key={index} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg hover:shadow-lg transition-all duration-300 animate-slide-up group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-blue-600 dark:text-blue-400 text-xl">
                                        <IconComponent />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        {category.title}
                                    </h3>
                                </div>
                                <div className="space-y-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex} className="text-slate-600 dark:text-slate-300 text-sm">
                                            • {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center mt-8">
                    <Link
                        href="/skills"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                        View all skills and technologies
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}