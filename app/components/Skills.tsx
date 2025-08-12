import {
    SiReact, SiNodedotjs, SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiDocker, SiGit,
    SiVuedotjs, SiLaravel, SiDjango, SiPhp, SiPython, SiNextdotjs, SiAngular, SiTailwindcss,
    SiBootstrap, SiMysql, SiRedis, SiAmazon, SiVercel, SiGithub, SiFigma, SiAdobexd,
    SiJira, SiTrello, SiSlack, SiWordpress, SiShopify, SiStripe, SiPaypal, SiFirebase,
    SiGraphql, SiWebpack, SiBabel, SiEslint, SiJest, SiCypress, SiSelenium
} from "react-icons/si";
import { FaMobile, FaDatabase, FaServer, FaCloud, FaTools, FaCode } from "react-icons/fa";

export default function Skills() {
    const skillCategories = [
        {
            title: "Frontend Development",
            icon: <FaCode className="w-6 h-6" />,
            skills: [
                { name: "React", icon: <SiReact />, color: "text-blue-500" },
                { name: "Vue.js", icon: <SiVuedotjs />, color: "text-green-500" },
                { name: "Angular", icon: <SiAngular />, color: "text-red-500" },
                { name: "Next.js", icon: <SiNextdotjs />, color: "text-black dark:text-white" },
                { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-500" },
                { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-600" },
                { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-500" },
                { name: "Bootstrap", icon: <SiBootstrap />, color: "text-purple-500" },
            ]
        },
        {
            title: "Backend Development",
            icon: <FaServer className="w-6 h-6" />,
            skills: [
                { name: "Node.js", icon: <SiNodedotjs />, color: "text-green-600" },
                { name: "Laravel", icon: <SiLaravel />, color: "text-red-600" },
                { name: "Django", icon: <SiDjango />, color: "text-green-700" },
                { name: "PHP", icon: <SiPhp />, color: "text-purple-600" },
                { name: "Python", icon: <SiPython />, color: "text-blue-600" },
                { name: "Express.js", icon: <SiNodedotjs />, color: "text-gray-600" },
                { name: "GraphQL", icon: <SiGraphql />, color: "text-pink-600" },
                { name: "REST API", icon: <FaCode />, color: "text-blue-500" },
            ]
        },
        {
            title: "Databases & Storage",
            icon: <FaDatabase className="w-6 h-6" />,
            skills: [
                { name: "MySQL", icon: <SiMysql />, color: "text-blue-600" },
                { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-700" },
                { name: "MongoDB", icon: <SiMongodb />, color: "text-green-600" },
                { name: "Redis", icon: <SiRedis />, color: "text-red-600" },
                { name: "Firebase", icon: <SiFirebase />, color: "text-orange-500" },
                { name: "AWS S3", icon: <SiAmazon />, color: "text-yellow-600" },
            ]
        },
        {
            title: "Mobile Development",
            icon: <FaMobile className="w-6 h-6" />,
            skills: [
                { name: "React Native", icon: <SiReact />, color: "text-blue-500" },
                { name: "Mobile Apps", icon: <FaMobile />, color: "text-purple-500" },
                { name: "PWA", icon: <FaCode />, color: "text-blue-600" },
            ]
        },
        {
            title: "DevOps & Tools",
            icon: <FaTools className="w-6 h-6" />,
            skills: [
                { name: "Git", icon: <SiGit />, color: "text-orange-600" },
                { name: "Docker", icon: <SiDocker />, color: "text-blue-600" },
                { name: "AWS", icon: <SiAmazon />, color: "text-yellow-600" },
                { name: "Vercel", icon: <SiVercel />, color: "text-black dark:text-white" },
                { name: "GitHub", icon: <SiGithub />, color: "text-black dark:text-white" },
                { name: "Webpack", icon: <SiWebpack />, color: "text-blue-600" },
                { name: "Babel", icon: <SiBabel />, color: "text-yellow-600" },
                { name: "ESLint", icon: <SiEslint />, color: "text-purple-600" },
            ]
        },
        {
            title: "Testing & Quality",
            icon: <FaCode className="w-6 h-6" />,
            skills: [
                { name: "Jest", icon: <SiJest />, color: "text-red-600" },
                { name: "Cypress", icon: <SiCypress />, color: "text-green-600" },
                { name: "Selenium", icon: <SiSelenium />, color: "text-green-700" },
                { name: "Unit Testing", icon: <FaCode />, color: "text-blue-500" },
                { name: "E2E Testing", icon: <FaCode />, color: "text-purple-500" },
            ]
        },
        {
            title: "Design & UI/UX",
            icon: <FaCode className="w-6 h-6" />,
            skills: [
                { name: "Figma", icon: <SiFigma />, color: "text-purple-600" },
                { name: "Adobe XD", icon: <SiAdobexd />, color: "text-pink-600" },
                { name: "UI/UX Design", icon: <FaCode />, color: "text-blue-500" },
                { name: "Responsive Design", icon: <FaCode />, color: "text-green-500" },
            ]
        },
        {
            title: "Project Management",
            icon: <FaTools className="w-6 h-6" />,
            skills: [
                { name: "Agile", icon: <FaCode />, color: "text-blue-500" },
                { name: "Scrum", icon: <FaCode />, color: "text-green-500" },
                { name: "Jira", icon: <SiJira />, color: "text-blue-600" },
                { name: "Trello", icon: <SiTrello />, color: "text-blue-500" },
                { name: "Slack", icon: <SiSlack />, color: "text-purple-500" },
            ]
        },
        {
            title: "E-commerce & CMS",
            icon: <FaCode className="w-6 h-6" />,
            skills: [
                { name: "WordPress", icon: <SiWordpress />, color: "text-blue-600" },
                { name: "Shopify", icon: <SiShopify />, color: "text-green-600" },
                { name: "Stripe", icon: <SiStripe />, color: "text-purple-600" },
                { name: "PayPal", icon: <SiPaypal />, color: "text-blue-600" },
            ]
        }
    ];

    return (
        <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">
                    Skills & Technologies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <div
                            key={categoryIndex}
                            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg hover:shadow-lg transition-all duration-300 animate-slide-up group"
                            style={{ animationDelay: `${categoryIndex * 100}ms` }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {category.icon}
                                </div>
                                <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                                    {category.title}
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {category.skills.map((skill, skillIndex) => (
                                    <div
                                        key={skillIndex}
                                        className="flex items-center gap-2 p-2 rounded-md hover:bg-white dark:hover:bg-slate-700 transition-colors group/skill"
                                    >
                                        <div className={`${skill.color} group-hover/skill:scale-110 transition-transform duration-200 animate-float`}>
                                            {skill.icon}
                                        </div>
                                        <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
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
