import { useEffect, useState } from "react"
import { Sun, Sunrise, Sunset, Moon, Sparkles } from "lucide-react"
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
    }, [coords])

    if (error)
        return <p className="text-red-500 dark:text-red-400 text-center">{error}</p>
    if (!times)
        return (
            <p className="text-blue-500 dark:text-blue-300 text-center flex items-center justify-center gap-2">
                <Sparkles className="animate-spin-slow" /> Memuat jadwal sholat...
            </p>
        )

    const prayers: Prayer[] = [
        { name: "Subuh", time: times.Fajr, icon: <Sunrise size={20} /> },
        { name: "Zuhur", time: times.Dhuhr, icon: <Sun size={20} /> },
        { name: "Ashar", time: times.Asr, icon: <Sun size={20} /> },
        { name: "Maghrib", time: times.Maghrib, icon: <Sunset size={20} /> },
        { name: "Isya", time: times.Isha, icon: <Moon size={20} /> },
    ]

    return (
        <div
            className="
                p-6 rounded-2xl shadow-sm border w-full max-w-full hover:shadow-md box-border
                bg-gradient-to-b from-blue-50 to-white border-blue-100
                dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 dark:border-gray-800
                transition-all duration-500
            "
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Jadwal Sholat Hari Ini
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 w-full max-w-full">
                {prayers.map((p) => (
                    <div
                        key={p.name}
                        className="
                            flex justify-between items-center rounded-xl px-4 py-3 border shadow-sm
                            bg-white border-gray-100 text-gray-800
                            hover:shadow-md hover:-translate-y-1 cursor-pointer transition
                            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
                            w-full max-w-full box-border
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    p-2 rounded-lg 
                                    bg-blue-50 text-blue-500 
                                    dark:bg-gray-700 dark:text-blue-400
                                "
                            >
                                {p.icon}
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    {p.name}
                                </h3>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    Waktu lokal
                                </p>
                            </div>
                        </div>
                        <span className="text-blue-600 dark:text-blue-300 font-semibold">
                            {p.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JadwalSholat
