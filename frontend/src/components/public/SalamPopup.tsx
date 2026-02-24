import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const SalamPopup = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 1000);
        const hideTimer = setTimeout(() => setShow(false), 6000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="
                        bg-white dark:bg-gray-900 
                        border border-gray-200 dark:border-gray-700 
                        rounded-2xl shadow-2xl 
                        px-6 py-5 w-[90%] max-w-[400px]
                        text-center relative
            "
                    >
                        <button
                            onClick={() => setShow(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                        >
                            <X size={20} />
                        </button>

                        <h2
                            className="text-2xl sm:text-3xl text-gray-800 dark:text-gray-100"
                        >
                            Assalamu’alaikum!
                        </h2>
                        <p
                            className="text-base sm:text-lg mt-2 text-gray-600 dark:text-gray-300"
                        >
                            Selamat datang di <strong>Mufadz Portal</strong>
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SalamPopup;
