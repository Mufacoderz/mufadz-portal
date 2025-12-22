import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RegistForm = () => {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/auth/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nama: "debug",
                    email: "debug@mail.com",
                    password: "123456",
                }),
            });

            const text = await res.text();
            console.log("RAW REGISTER RESPONSE >>>", text);

            const data = JSON.parse(text);
            alert(data.message);
        } catch (err) {
            console.error("FETCH ERROR:", err);
            alert("Server error / response bukan JSON");
        }
    };

    return (
        <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 tracking-wide">
                Daftar Akun Baru
            </h2>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleRegister}>
                <div>
                    <label className="block mb-2 text-sm sm:text-base font-medium">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        placeholder="Nama lengkap"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="w-full p-3 sm:p-3.5 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm sm:text-base font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 sm:p-3.5 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm sm:text-base font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 sm:p-3.5 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-sky-400 text-white font-semibold px-5 py-3 rounded-lg"
                >
                    Daftar
                </motion.button>

                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-3 border border-blue-400/60 text-blue-700 font-medium px-5 py-3 rounded-lg text-center"
                >
                    <Link to="/">Lanjut sebagai Guest</Link>
                </motion.div>
            </form>
        </div>
    );
};

export default RegistForm;
