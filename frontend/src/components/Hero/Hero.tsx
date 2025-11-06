import { motion } from "framer-motion";
import JadwalSholat from "./JadwalSholat";

const Hero = () => {
    return (
        <section className="relative overflow-hidden  py-16">
            
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300/40 rounded-full blur-3xl opacity-60"></div>

            <div className="relative container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-16">
                {/* Text Section */}
                <motion.div
                    className="flex flex-col justify-center md:w-1/2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-snug mb-3">
                        Assalamu’alaikum
                    </h1>
                    <p className="text-2xl font-semibold text-gray-700 mb-3">
                        Selamat datang di{" "}
                        <span className="text-blue-600">Mufadz App</span>
                    </p>
                    <p className="text-gray-500 max-w-md leading-relaxed mb-6">
                        Aplikasi pendukung kehidupan Muslim modern — dengan jadwal sholat,
                        arah kiblat, dan fitur Islami lainnya dalam satu tempat.
                    </p>

                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition">
                            Mulai Sekarang
                        </button>
                        <button className="px-5 py-2.5 bg-white border border-blue-100 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition">
                            Pelajari Lebih Lanjut
                        </button>
                    </div>
                </motion.div>

                {/* Jadwal Sholat Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="md:w-1/2 w-full flex justify-center"
                >
                    <JadwalSholat />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
