import { BookOpen, MessageCircle, Calendar, User, Sun, Feather } from "lucide-react"
import { useNavigate } from "react-router-dom"
import HeadingPage from "../components/Heading"

export default function Panduan() {
    const navigate = useNavigate()

    const pages = [
        {
            title: "Doa Harian",
            desc: "Akses kumpulan doa harian lengkap dengan teks Arab, Latin, dan terjemahannya.",
            icon: <Feather className="w-6 h-6 text-red-500" />,
            path: "/doa",
            type: "page",
        },
        {
            title: "Baca Quran",
            desc: "Membaca Al-Qur'an digital dengan tampilan yang nyaman dan navigasi mudah.",
            icon: <BookOpen className="w-6 h-6 text-green-500" />,
            path: "/quran",
            type: "page",
        },
        {
            title: "Forum Chat",
            desc: "Berinteraksi dengan pengguna lain untuk berdiskusi atau bertanya.",
            icon: <MessageCircle className="w-6 h-6 text-purple-500" />,
            path: "/chat",
            type: "page",
        },
        {
            title: "Profil",
            desc: "Kelola profil Anda, pengaturan aplikasi, dan preferensi pribadi.",
            icon: <User className="w-6 h-6 text-pink-500" />,
            path: "/profile",
            type: "page",
        },
    ]

    const homeSections = [
        {
            title: "Jadwal Sholat",
            desc: "Cek waktu sholat harian di lokasi Anda dengan akurat.",
            icon: <Sun className="w-6 h-6 text-yellow-500" />,
            id: "JadwalSholat",
        },
        {
            title: "Kalender",
            desc: "Lihat kalender Hijriah dan Masehi untuk jadwal ibadah dan kegiatan penting.",
            icon: <Calendar className="w-6 h-6 text-orange-500" />,
            id: "Kalender",
        },
    ]

    const scrollToSection = (id: string) => {
        navigate("/")
        setTimeout(() => {
            const el = document.getElementById(id)
            if (el) el.scrollIntoView({ behavior: "smooth" })
        }, 50)
    }

    return (
        <div className="max-w-6xl mx-auto px-5 mt-10">
            <HeadingPage title="Panduan Mufadz App"/>
            
            {/* Hero Section */}
            <div className="text-center mb-12">
                <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                    Pelajari cara menggunakan fitur-fitur utama aplikasi Mufadz App agar pengalaman ibadah dan belajar lebih nyaman.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                {homeSections.map((feature) => (
                    <button
                        key={feature.title}
                        onClick={() => scrollToSection(feature.id)}
                        className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 text-left"
                    >
                        <div className="flex items-center justify-start gap-3">
                            {feature.icon}
                            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600">{feature.desc}</p>
                        <span className="mt-auto text-blue-500 font-medium group-hover:underline">Buka →</span>
                    </button>
                ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {pages.map((feature) => (
                    <button
                        key={feature.title}
                        onClick={() => navigate(feature.path)}
                        className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 text-left"
                    >
                        <div className="flex items-center justify-start gap-3">
                            {feature.icon}
                            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600">{feature.desc}</p>
                        <span className="mt-auto text-blue-500 font-medium group-hover:underline">Buka →</span>
                    </button>
                ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-16 text-center">
                <p className="text-gray-700 mb-4">
                    Masih bingung? Hubungi tim support kami untuk bantuan lebih lanjut.
                </p>
                <a
                    href="https://github.com/Mufacoderz"
                    className="inline-block px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Hubungi Support
                </a>
            </div>
        </div>
    )
}
