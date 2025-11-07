import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const hijriMonthNames = [
    "Muharram", "Safar", "Rabi'ul Awal", "Rabi'ul Akhir",
    "Jumada al-Awwal", "Jumada al-Akhirah", "Rajab", "Sya'ban",
    "Ramadhan", "Syawal", "Dzulqa'dah", "Dzulhijjah"
];

function gregorianToHijri(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const jd = Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
        Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) -
        Math.floor((3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) / 4) +
        day - 32075;

    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) +
        (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
    const l3 = l2 - ((Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50))) -
        ((Math.floor(j / 16)) * (Math.floor((15238 * j) / 43))) + 29;
    const m = Math.floor((24 * l3) / 709);
    const d = l3 - Math.floor((709 * m) / 24);
    const y = 30 * n + j - 30;

    return { day: d, month: m, year: y };
}

const KalenderModern = () => {
    const [activeCalendar, setActiveCalendar] = useState<"masehi" | "hijriah">("masehi");
    const [monthOffset, setMonthOffset] = useState(0);

    const masehiDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const hijriDays = ["Ahad", "Itsn", "Tsul", "Arb", "Kham", "Jum", "Sab"];

    const todayGregorian = new Date();
    const todayDate = todayGregorian.getDate();
    const year = todayGregorian.getFullYear();
    const month = todayGregorian.getMonth() + monthOffset;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const masehiDates = Array(firstDay).fill(null).concat([...Array(daysInMonth).keys()].map(i => i + 1));

    const hijriToday = gregorianToHijri(todayGregorian);
    const hijriMonthIndex = ((hijriToday.month - 1 + monthOffset) % 12 + 12) % 12;
    const hijriMonthName = hijriMonthNames[hijriMonthIndex];
    const hijriYear = hijriToday.year + Math.floor((hijriToday.month - 1 + monthOffset) / 12);
    const hijriDay = hijriToday.day;
    const hijriLengthOfMonth = 30;
    const hijriDates = Array.from({ length: hijriLengthOfMonth }, (_, i) => i + 1);

    return (
        <div className="w-full max-w-full mx-auto bg-gradient-to-b from-blue-50 to-white rounded-3xl p-4 sm:p-6 hover:shadow-md border border-blue-100 flex flex-col gap-4 box-border">
            {/* Toggle */}
            <div className="relative w-full max-w-xs h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center p-1 shadow-inner mx-auto border border-blue-100">
                <motion.div
                    layout
                    className="absolute top-1 bottom-1 w-1/2 rounded-full bg-blue-500 shadow-md"
                    animate={{ x: activeCalendar === "masehi" ? 0 : "100%" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <div className="relative z-10 flex w-full text-sm font-medium text-center">
                    <button
                        className={`flex-1 transition ${activeCalendar === "masehi" ? "text-white" : "text-gray-600 hover:text-blue-600"}`}
                        onClick={() => setActiveCalendar("masehi")}
                    >Masehi</button>
                    <button
                        className={`flex-1 transition ${activeCalendar === "hijriah" ? "text-white" : "text-gray-600 hover:text-blue-600"}`}
                        onClick={() => setActiveCalendar("hijriah")}
                    >Hijriah</button>
                </div>
            </div>

            {/* Header navigasi */}
            <div className="flex items-center justify-between px-2 text-gray-700">
                <button
                    className="p-2 rounded-lg hover:bg-blue-100/50 transition"
                    onClick={() => setMonthOffset(prev => prev - 1)}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <p className="font-semibold text-base tracking-wide text-center w-full">
                    {activeCalendar === "masehi"
                        ? new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })
                        : `${hijriMonthName} ${hijriYear} H`}
                </p>
                <button
                    className="p-2 rounded-lg hover:bg-blue-100/50 transition"
                    onClick={() => setMonthOffset(prev => prev + 1)}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCalendar + monthOffset}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-7 gap-1 sm:gap-2 text-sm text-center"
                >
                    {(activeCalendar === "masehi" ? masehiDays : hijriDays).map(d => (
                        <div key={d} className="text-gray-500 font-semibold py-1">{d}</div>
                    ))}

                    {(activeCalendar === "masehi" ? masehiDates : hijriDates).map((dateValue, i) => {
                        if (dateValue === null) return <div key={i}></div>;
                        const isToday = activeCalendar === "masehi"
                            ? (dateValue === todayDate && monthOffset === 0)
                            : (dateValue === hijriDay && monthOffset === 0);
                        return (
                            <div
                                key={i}
                                className={`p-2 rounded-xl transition cursor-pointer border text-gray-700 font-medium ${isToday
                                    ? "bg-blue-500 text-white shadow-md border-blue-300"
                                    : "hover:bg-blue-50 border-transparent"
                                    }`}
                            >
                                {dateValue}
                            </div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default KalenderModern;
