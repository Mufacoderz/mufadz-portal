import { motion } from "framer-motion";
import MorphingShape2 from "../components/Blob2";
import RegistForm from "../components/Register/RegistForm";
import RegistFooter from "../components/Register/RegistFooter";

export default function Register() {
    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
            <MorphingShape2/>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="sm:w-full max-w-md  bg-white/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20 p-8 rounded-2xl shadow-2xl text-gray-700 dark:text-gray-300"
            >

                <RegistForm/>
                <RegistFooter/>
                
            </motion.div>
        </div>
    );
}
