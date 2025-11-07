import { motion } from "framer-motion";
import Hero from "./Hero";
import JadwalSholat from "./JadwalSholat";
import ModernKalender from "./Kalender";

const Home = () => {
    return (
        <section className="relative overflow-hidden py-16 bg-gradient-to-b from-white to-blue-50">
            {/* Background blob */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl opacity-50"></div>

            <div className="relative container mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-16">
                {/* HERO SECTION */}
                <motion.div
                    className="flex flex-col justify-center items-center text-center md:text-left"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Hero />
                </motion.div>

                {/* CONTENT SECTION: Jadwal Sholat + Kalender */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Jadwal Sholat */}
                    <div className="w-full flex justify-center">
                        <JadwalSholat />
                    </div>

                    {/* Kalender */}
                    <div className="w-full flex justify-center">
                        <ModernKalender />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
