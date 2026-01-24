import { FaGraduationCap } from "react-icons/fa";

export default function EducationCard() {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
                <FaGraduationCap className="text-blue-400 text-2xl" />
                <h3 className="text-xl font-semibold text-white">Education</h3>
            </div>
            <div className="space-y-4">
                <div className="pl-4 border-l-2 border-blue-500/30 group-hover:border-blue-500/60 transition-colors">
                    <h4 className="font-medium text-white">Master's Degree</h4>
                    <p className="text-slate-400 text-sm">Biomedical Instrumentation</p>
                    <p className="text-slate-500 text-xs mt-1">2016 - 2018</p>
                </div>
                <div className="pl-4 border-l-2 border-blue-500/30 group-hover:border-blue-500/60 transition-colors">
                    <h4 className="font-medium text-white">Bachelor's Degree</h4>
                    <p className="text-slate-400 text-sm">Biomedical Engineering</p>
                    <p className="text-slate-500 text-xs mt-1">2013 - 2016</p>
                </div>
            </div>
        </div>
    );
}