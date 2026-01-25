export const aboutPageContent = {
    hero: {
        badge: "My Story",
        titlePrefix: "From Biomedical to",
        titleHighlight: "Full-Stack Development",
        description: "A journey driven by passion, curiosity, and a love for building solutions that make a difference"
    },
    stats: [
        { iconName: "FaGraduationCap", label: "Master's Degree", value: "Biomedical", color: "blue" },
        { iconName: "FaCode", label: "Projects Completed", value: "50+", color: "green" }, // Value handled dynamically ideally, but hardcoding provided value format in list is okay if consistent
        { iconName: "FaGlobe", label: "Languages", value: "4", color: "purple" },
        { iconName: "FaMapMarkerAlt", label: "Location", value: "Tunisia", color: "orange" }
    ],
    timeline: {
        title: "My Development Journey",
        subtitle: "How I became a full-stack developer",
        items: [
            {
                year: "2018",
                title: "The Spark",
                subtitle: "Master's in Biomedical Engineering",
                description: "During my 'Medical Informatics' course with Miss Hanen Boussi, I built a hospital dashboard project with SQL authentication. That moment when I saw code create real-world solutions was my 'click' moment.",
                iconName: "FaLightbulb",
                color: "from-yellow-500 to-orange-500"
            },
            {
                year: "2019",
                title: "Foundation",
                subtitle: "Laravel & Blade",
                description: "Started my web development journey with Laravel and Blade, learning the fundamentals of backend development and database management.",
                iconName: "FaCode",
                color: "from-red-500 to-pink-500"
            },
            {
                year: "2020",
                title: "Evolution",
                subtitle: "Livewire, Inertia & Vue.js",
                description: "Advanced to Livewire and Inertia, then combined Vue.js with Laravel to build more dynamic, interactive applications.",
                iconName: "FaRocket",
                color: "from-green-500 to-emerald-500"
            },
            {
                year: "2021-2022",
                title: "MEAN Stack Mastery",
                subtitle: "MongoDB, Express, Angular & Node.js",
                description: "Completed a comprehensive MEAN stack course, mastering MongoDB, Express.js, Angular, and Node.js. Built a restaurant website as my final project. Then explored MERN stack by diving into React, discovering its differences and strengths.",
                iconName: "FaGlobe",
                color: "from-blue-500 to-cyan-500"
            },
            {
                year: "2022-2023",
                title: "Python & Django",
                subtitle: "Backend Expansion",
                description: "Learned Django framework and SQLite databases, expanding my backend expertise beyond JavaScript and PHP into the Python ecosystem.",
                iconName: "FaCode",
                color: "from-green-600 to-teal-500"
            },
            {
                year: "2023",
                title: "Full-Time Position",
                subtitle: "Transition to Company Work",
                description: "Transitioned from freelance work to a full-time position, applying all my experience in a team environment. Discovered Next.js (which was relatively new) and Flutter, making note to explore these technologies further.",
                iconName: "FaBriefcase",
                color: "from-purple-500 to-indigo-500"
            },
            {
                year: "2024",
                title: "Side Projects & Nuxt.js",
                subtitle: "Vue.js & Laravel at Work",
                description: "While working professionally with Vue.js and Laravel, I dedicated weekends to learning Nuxt.js, discovering its power for server-side rendering and really enjoying the framework.",
                iconName: "FaRocket",
                color: "from-emerald-500 to-green-500"
            },
            {
                year: "Early 2025",
                title: "Mobile Development",
                subtitle: "Ionic Framework",
                description: "Company decided to expand with a mobile app using a unified codebase. Learned Ionic to create cross-platform mobile applications from our existing web repository, enabling seamless web-to-mobile deployment.",
                iconName: "FaMobile",
                color: "from-blue-600 to-purple-600"
            },
            {
                year: "Mid 2025",
                title: "Industry Pivot",
                subtitle: "Learning Next.js",
                description: "After being laid off, I strategically chose to master Next.js - a widely-adopted industry standard. Leveraging my React foundation, I quickly adapted to this powerful framework used by top companies worldwide.",
                iconName: "FaChartLine",
                color: "from-orange-500 to-red-500"
            },
            {
                year: "2025-Present",
                title: "Full-Stack Expertise",
                subtitle: "Ready for New Opportunities",
                description: "Now equipped with a diverse tech stack spanning Laravel, Vue, React, Next.js, Node.js, Django, and Ionic. Ready to bring this expertise to exciting new projects and contribute to innovative teams.",
                iconName: "FaHeart",
                color: "from-pink-500 to-rose-500"
            }
        ]
    },
    approach: {
        title: "My Approach",
        subtitle: "What drives my development philosophy",
        items: [
            {
                title: "Clean Code",
                description: "I believe in writing maintainable, well-documented code that other developers can easily understand and build upon.",
                iconName: "FaCode",
                color: "from-blue-500 to-cyan-500"
            },
            {
                title: "User-Centric",
                description: "Every line of code I write is focused on creating intuitive experiences that solve real problems for real people.",
                iconName: "FaHeart",
                color: "from-pink-500 to-rose-500"
            },
            {
                title: "Continuous Learning",
                description: "Technology evolves rapidly, and I stay current with the latest trends and best practices in web development.",
                iconName: "FaLightbulb",
                color: "from-yellow-500 to-orange-500"
            }
        ]
    },
    personal: {
        title: "Beyond the Code",
        subtitle: "The person behind the developer",
        education: {
            title: "Education",
            items: [
                {
                    degree: "Master's Degree",
                    field: "Biomedical Engineering",
                    school: "ISTMT, Tunis • 2016-2018"
                },
                {
                    degree: "Bachelor's Degree",
                    field: "Biomedical Engineering",
                    school: "ISTMT, Tunis • 2013-2016"
                }
            ]
        },
        languages: {
            title: "Languages",
            items: [
                { lang: "Arabic", level: "Native", width: "100%" },
                { lang: "French", level: "Native", width: "100%" },
                { lang: "English", level: "Fluent", width: "85%" },
                { lang: "Spanish", level: "Basic", width: "40%" }
            ]
        },
        interests: {
            title: "Beyond Code",
            items: [
                { iconName: "FaFutbol", text: "Football", color: "text-green-400" },
                { iconName: "FaDumbbell", text: "Weight Lifting", color: "text-red-400" },
                { iconName: "FaMusic", text: "Music", color: "text-purple-400" },
                { iconName: "FaCode", text: "Technology", color: "text-blue-400" }
            ]
        }
    },
    quote: {
        text: "\"Building digital experiences that inspire and empower\"",
        sub: "Let's create something amazing together",
        emojis: [
            { emoji: '⚡', label: 'Fast' },
            { emoji: '✨', label: 'Creative' },
            { emoji: '🎯', label: 'Focused' },
            { emoji: '🔥', label: 'Passionate' },
            { emoji: '💡', label: 'Innovative' }
        ]
    },
    cta: {
        title: "Let's Work Together",
        description: "Interested in collaborating or want to learn more about my experience?",
        resume: "View My Resume",
        schedule: "Schedule a Call"
    }
};
