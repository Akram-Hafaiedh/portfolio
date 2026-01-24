import { FaMicrochip, FaFutbol, FaDumbbell, FaMusic } from "react-icons/fa";
export default function InterestsCard() {
    const interests = [
        { icon: FaFutbol, label: 'Football', color: 'from-blue-500 to-cyan-500' },
        { icon: FaDumbbell, label: 'Fitness', color: 'from-green-500 to-emerald-500' },
        { icon: FaMusic, label: 'Music', color: 'from-purple-500 to-pink-500' },
        { icon: FaMicrochip, label: 'Tech', color: 'from-orange-500 to-red-500' }
    ];
    return (

        < div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300" >
            <div className="flex items-center gap-3 mb-4">
                <FaMicrochip className="text-orange-400 text-2xl" />
                <h3 className="text-xl font-semibold text-white">Interests</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {interests.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg hover:scale-105 transition-transform">
                        <item.icon className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} />
                        <span className="text-slate-300 text-sm">{item.label}</span>
                    </div>
                ))}
            </div>
        </div >
    );
}
