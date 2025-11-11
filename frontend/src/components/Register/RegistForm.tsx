import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const RegistForm = () => {
    return (
        <>
            <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 tracking-wide">
                    Daftar Akun Baru
                </h2>
                <form className="space-y-4 sm:space-y-5">
                    <div>
                        <label className="block mb-2 text-sm sm:text-base font-medium">Nama Lengkap</label>
                        <input
                            type="text"
                            placeholder="Nama lengkap"
                            className="w-full p-3 sm:p-3.5 rounded-lg bg-white/20 border border-white/30 dark:border-gray-700/20 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-700 dark:placeholder-gray-200 text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm sm:text-base font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="w-full p-3 sm:p-3.5 rounded-lg bg-white/20 border border-white/30 dark:border-gray-700/20 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-700 dark:placeholder-gray-200 text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm sm:text-base font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            className="w-full p-3 sm:p-3.5 rounded-lg bg-white/20 border border-white/30 dark:border-gray-700/20 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-600 dark:placeholder-gray-200 text-sm sm:text-base"
                        />
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full  relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-500 to-sky-400 dark:from-sky-400 dark:via-blue-500 dark:to-indigo-600 text-white dark:text-gray-800 font-semibold px-5 py-2.5 sm:py-3 shadow-lg shadow-blue-300/40 dark:shadow-blue-700/40 transition-all duration-300 ease-out hover:scale-105 hover:shadow-blue-400/50 focus:outline-none rounded-lg text-sm sm:text-base flex justify-center"
                    >
                        <span >Daftar</span>
                        <span>
                            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shine_2.5s_infinite]" />
                        </span>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full relative mt-3 border border-blue-400/60 text-blue-700 dark:text-blue-300 font-medium px-5 py-2.5 sm:py-3 rounded-lg backdrop-blur-sm hover:bg-blue-500/10 dark:hover:bg-blue-300/10 hover:text-blue-900 dark:hover:text-blue-100 transition-all duration-300 text-sm sm:text-base flex justify-center"
                    >
                        <Link to={"/"}>Lanjut Sebagai Guest</Link>
                    </motion.div>
                </form>
            </div>
        </>
    )
}

export default RegistForm
