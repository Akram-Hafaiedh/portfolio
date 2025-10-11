import {
    SiReact, SiNodedotjs, SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiDocker, SiGit,
    SiVuedotjs, SiLaravel, SiDjango, SiPhp, SiPython, SiNextdotjs, SiAngular, SiTailwindcss,
    SiBootstrap, SiMysql, SiRedis, SiAmazon, SiVercel, SiGithub, SiFigma, SiAdobexd,
    SiJira, SiTrello, SiSlack, SiWordpress, SiShopify, SiStripe, SiPaypal, SiFirebase,
    SiGraphql, SiWebpack, SiBabel, SiEslint, SiJest, SiCypress, SiSelenium,
    SiFlutter,
    SiIonic
} from "react-icons/si";
import { FaMobile, FaDatabase, FaServer, FaCloud, FaTools, FaCode } from "react-icons/fa";
import { skillsData } from "@/lib/skills";

interface IconMap {
    [key: string]: typeof FaCode;
}

const iconMap: IconMap = {
    FaCode: FaCode,
    FaServer: FaServer,
    FaDatabase: FaDatabase,
    FaMobile: FaMobile,
    FaCloud: FaCloud,
    FaTools: FaTools,
    SiReact: SiReact,
    SiVuedotjs: SiVuedotjs,
    SiAngular: SiAngular,
    SiNextdotjs: SiNextdotjs,
    SiJavascript: SiJavascript,
    SiTypescript: SiTypescript,
    SiTailwindcss: SiTailwindcss,
    SiBootstrap: SiBootstrap,
    SiNodedotjs: SiNodedotjs,
    SiLaravel: SiLaravel,
    SiDjango: SiDjango,
    SiPhp: SiPhp,
    SiPython: SiPython,
    SiGraphql: SiGraphql,
    SiMysql: SiMysql,
    SiPostgresql: SiPostgresql,
    SiMongodb: SiMongodb,
    SiRedis: SiRedis,
    SiFirebase: SiFirebase,
    SiIonic: SiIonic,
    SiFlutter: SiFlutter,
    SiGit: SiGit,
    SiDocker: SiDocker,
    SiAmazon: SiAmazon,
    SiVercel: SiVercel,
    SiGithub: SiGithub,
    SiWebpack: SiWebpack,
    SiBabel: SiBabel,
    SiEslint: SiEslint,
    SiJest: SiJest,
    SiCypress: SiCypress,
    SiSelenium: SiSelenium,
    SiFigma: SiFigma,
    SiAdobexd: SiAdobexd,
    SiJira: SiJira,
    SiTrello: SiTrello,
    SiSlack: SiSlack,
    SiWordpress: SiWordpress,
    SiShopify: SiShopify,
    SiStripe: SiStripe,
    SiPaypal: SiPaypal,

};

export default function AllSkills() {
    const skillCategories = skillsData;

    return (
        <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">
                    Skills & Technologies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, categoryIndex) => {
                        const IconComponent = iconMap[category.icon];
                        return (
                            <div
                                key={categoryIndex}
                                className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg hover:shadow-lg transition-all duration-300 animate-slide-up group"
                                style={{ animationDelay: `${categoryIndex * 100}ms` }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        <IconComponent />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {category.skills.map((skill, skillIndex) => {
                                        const SkillIcon = iconMap[skill.icon] || FaCode;
                                        return (
                                            <div
                                                key={skillIndex}
                                                className="flex items-center gap-2 p-2 rounded-md hover:bg-white dark:hover:bg-slate-700 transition-colors group/skill"
                                            >
                                                <div className={`${skill.color} group-hover/skill:scale-110 transition-transform duration-200 animate-float`}>
                                                    <SkillIcon />
                                                </div>
                                                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Additional Skills Summary */}
                <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-lg animate-fade-in">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
                        Additional Expertise
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">🚀</div>
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Performance Optimization</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">🔒</div>
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Security Best Practices</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">📱</div>
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Mobile-First Design</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">⚡</div>
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">API Development</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
