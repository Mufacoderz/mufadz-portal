import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl text-white"
            >
                <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
                    Masuk ke <span className="text-blue-200">Mufadz</span>
                </h2>

                <form className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-200"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
                    >
                        Masuk
                    </motion.button>
                </form>

                <div className="mt-6 text-center text-sm">
                    Belum punya akun?{" "}
                    <Link to="/register" className="text-blue-200 hover:underline">
                        Daftar
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
