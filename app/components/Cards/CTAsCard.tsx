import { FaCalendar, FaRocket } from "react-icons/fa";

export default function CTAsCard() {
    return (
        <>
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-2 border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/60 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                    <FaRocket className="text-blue-400 text-xl" />
                    <h3 className="text-lg font-semibold text-white">My Resume</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                    Download my complete resume with detailed experience and skills.
                </p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 transform duration-200 shadow-lg hover:shadow-xl">
                    View Full Resume →
                </button>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border-2 border-green-500/30 rounded-2xl p-6 hover:border-green-500/60 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                    <FaCalendar className="text-green-400 text-xl" />
                    <h3 className="text-lg font-semibold text-white">Let's Talk</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                    Schedule a free 30-minute call to discuss opportunities.
                </p>
                <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 transform duration-200 shadow-lg hover:shadow-xl">
                    Schedule a Call →
                </button>
            </div>
        </>
    );
}