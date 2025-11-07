import { motion } from "framer-motion";
import Hero from "./Hero";
import JadwalSholat from "./JadwalSholat";
import ModernKalender from "./Kalender";

const Home = () => {
    return (
        <section className="relative overflow-hidden py-16 min-h-screen">
            
            <div className="relative container mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-16">

                <motion.div
                    className="flex flex-col justify-center items-center text-center md:text-left mb-12  py-36"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Hero />
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="w-full flex justify-center">
                        <JadwalSholat />
                    </div>

                    <div className="w-full flex justify-center">
                        <ModernKalender />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
