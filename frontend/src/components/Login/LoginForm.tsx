import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5050/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        alert("Login Berhasil!");

        if (data.user.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/");
        }
    } else {
        alert(data.message);
    }
};


    return (
        <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 tracking-wide">
                Masuk ke Akun
            </h2>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleLogin}>
                <div>
                    <label className="block mb-2 text-sm sm:text-base font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 sm:p-3.5 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm sm:text-base font-medium">Password</label>
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
                    Masuk
                </motion.button>
            </form>
        </div>
    );
};

export default LoginForm;
