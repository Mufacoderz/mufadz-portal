import { Sun, Sunrise, Sunset, Moon } from "lucide-react";

interface Prayer {
    name: string;
    time: string;
    icon: React.ReactNode;
}

const JadwalSholat: React.FC = () => {
    const prayers: Prayer[] = [
        { name: "Subuh", time: "04:35", icon: <Sunrise size={20} /> },
        { name: "Zuhur", time: "12:01", icon: <Sun size={20} /> },
        { name: "Ashar", time: "15:22", icon: <Sun size={20} /> },
        { name: "Maghrib", time: "17:48", icon: <Sunset size={20} /> },
        { name: "Isya", time: "19:00", icon: <Moon size={20} /> },
    ];

    return (
        <div className="p-6 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-sm border border-blue-100 w-full max-w-md mx-auto hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Jadwal Sholat Hari Ini
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 ">
                {prayers.map((p) => (
                    <div
                        key={p.name}
                        className="flex justify-between items-center bg-white rounded-xl shadow-sm px-4 py-3 border border-gray-100 hover:shadow-md hover:-translate-y-1 cursor-pointer transition"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                                {p.icon}
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700">{p.name}</h3>
                                <p className="text-xs text-gray-400">Waktu lokal</p>
                            </div>
                        </div>
                        <span className="text-blue-600 font-semibold">{p.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JadwalSholat;
