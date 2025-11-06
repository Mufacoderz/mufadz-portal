import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Home, BookOpen, User, Menu, X } from "lucide-react";
import logo from "../assets/logohero.webp";

const Navbar = () => {
    const location = useLocation();
    const activePath = location.pathname;
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: "Forum Chat", path: "/chat", icon: <MessageCircle size={18} /> },
        { name: "Home", path: "/", icon: <Home size={18} /> },
        { name: "Baca Quran", path: "/quran", icon: <BookOpen size={18} /> },
        { name: "Profile", path: "/profile", icon: <User size={18} /> },
    ];

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm relative z-50">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <img
                    src={logo}
                    alt="logo"
                    className="w-12 rounded-2xl transition-transform duration-300 hover:-translate-y-1 hover:rotate-3 hover:shadow-md cursor-pointer"
                />
                <span className="font-semibold cursor-pointer text-blue-600 text-lg">
                    Mufadz App
                </span>
            </div>

            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden focus:outline-none text-gray-700">
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <ul
                className={`flex flex-col md:flex-row md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out 
                    ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible md:visible md:opacity-100"}`}
                >
                {navItems.map((item) => {
                    const isActive = activePath === item.path;
                    return (
                        <li key={item.name} className="md:my-0 my-1">
                            <Link
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center space-x-1 cursor-pointer p-3 rounded-lg transition-all duration-200 font-semibold
                                    ${isActive
                                        ? "bg-blue-50 text-blue-600 hover:-translate-y-[2px] hover:shadow-sm hover:bg-blue-100"
                                        : "text-gray-600 hover:bg-blue-50 hover:-translate-y-[2px] hover:shadow-sm"
                                    }`}
                            >
                                {item.icon}
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;
