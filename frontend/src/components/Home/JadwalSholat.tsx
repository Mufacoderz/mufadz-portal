import { useEffect, useState } from "react"
import { Sun, Sunrise, Sunset, Moon } from "lucide-react"
import { getPrayerTimes } from "../../api/aladhan"
import { useLocation } from "../../hooks/useLocation"

interface Prayer {
    name: string
    time: string
    icon: React.ReactNode
}

const JadwalSholat: React.FC = () => {
    const { coords, error } = useLocation()
    const [times, setTimes] = useState<any | null>(null)

    useEffect(() => {
        if (coords) {
            getPrayerTimes(coords.lat, coords.lon).then(setTimes)
        }
    }, [coords]);

    if (error) return <p className="text-red-500 text-center">{error}</p>
    if (!times) return <p className="text-gray-500 text-center">Tunggu sebentar ya kakakk...</p>

    const prayers: Prayer[] = [
        { name: "Subuh", time: times.Fajr, icon: <Sunrise size={20} /> },
        { name: "Zuhur", time: times.Dhuhr, icon: <Sun size={20} /> },
        { name: "Ashar", time: times.Asr, icon: <Sun size={20} /> },
        { name: "Maghrib", time: times.Maghrib, icon: <Sunset size={20} /> },
        { name: "Isya", time: times.Isha, icon: <Moon size={20} /> },
    ];

    return (
        <div className="p-6 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-sm border border-blue-100 w-full mx-auto hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Jadwal Sholat Hari Ini
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prayers.map((p) => (
                    <div
                        key={p.name}
                        className="flex justify-between items-center bg-white rounded-xl shadow-sm px-4 py-3 border border-gray-100 hover:shadow-md hover:-translate-y-1 cursor-pointer transition"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-500">{p.icon}</div>
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

export default JadwalSholat
