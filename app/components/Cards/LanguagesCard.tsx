

import { FaGlobe } from "react-icons/fa";

export default function LanguagesCard() {

    const languages = [
        { lang: 'Arabic', level: 'Native', width: '100%' },
        { lang: 'French', level: 'Native', width: '100%' },
        { lang: 'English', level: 'Intermediate', width: '70%' },
        { lang: 'Spanish', level: 'Basic', width: '30%' }
    ];
    return (
        // Languages
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
                <FaGlobe className="text-purple-400 text-2xl" />
                <h3 className="text-xl font-semibold text-white">Languages</h3>
            </div>
            <div className="space-y-3">
                {languages.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">{item.lang}</span>
                            <span className="text-slate-500">{item.level}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                                style={{ width: item.width }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
