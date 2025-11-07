import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const KalenderModern = () => {
    const [activeCalendar, setActiveCalendar] = useState("masehi");

    const masehiDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const hijriDays = ["Ahad", "Itsn", "Tsul", "Arb", "Kham", "Jum", "Sab"];
    const masehiDates = [...Array(30)];
    const hijriDates = [...Array(29)];

    return (
        <div className="w-full max-w-md mx-auto bg-gradient-to-b from-blue-50 to-white rounded-3xl p-6 shadow-lg border border-blue-100 flex flex-col gap-6">

            {/* Toggle Switch Baru */}
            <div className="relative w-64 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center p-1 shadow-inner mx-auto border border-blue-100">
                {/* Indicator (animasi geser) */}
                <motion.div
                    layout
                    className="absolute top-1 bottom-1 w-1/2 rounded-full bg-blue-500 shadow-md"
                    animate={{
                        x: activeCalendar === "masehi" ? 0 : "100%",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />

                {/* Tombol Label */}
                <div className="relative z-10 flex w-full text-sm font-medium text-center">
                    <button
                        className={`flex-1 transition ${activeCalendar === "masehi"
                                ? "text-white"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                        onClick={() => setActiveCalendar("masehi")}
                    >
                        Masehi
                    </button>
                    <button
                        className={`flex-1 transition ${activeCalendar === "hijriah"
                                ? "text-white"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                        onClick={() => setActiveCalendar("hijriah")}
                    >
                        Hijriah
                    </button>
                </div>
            </div>

            {/* Header Navigasi */}
            <div className="flex items-center justify-between px-2 text-gray-700">
                <button className="p-2 rounded-lg hover:bg-blue-100/50 transition">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <p className="font-semibold text-base tracking-wide">
                    {activeCalendar === "masehi" ? "November 2025" : "Jumada al-Akhirah 1447 H"}
                </p>
                <button className="p-2 rounded-lg hover:bg-blue-100/50 transition">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Kalender */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCalendar}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-7 gap-2 text-sm text-center"
                >
                    {(activeCalendar === "masehi" ? masehiDays : hijriDays).map((d) => (
                        <div key={d} className="text-gray-500 font-semibold py-1">
                            {d}
                        </div>
                    ))}

                    {(activeCalendar === "masehi" ? masehiDates : hijriDates).map((_, i) => {
                        const today = 7; // Dummy tanggal hari ini
                        const isToday = i + 1 === today;
                        return (
                            <div
                                key={i}
                                className={`p-2 rounded-xl transition cursor-pointer border text-gray-700 font-medium ${isToday
                                        ? "bg-blue-500 text-white shadow-md border-blue-300"
                                        : "hover:bg-blue-50 border-transparent"
                                    }`}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default KalenderModern;
