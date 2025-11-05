import { useState } from "react";
import { MessageCircle, Home, BookOpen, User } from "lucide-react";
import logo from '../assets/logo.webp'

const Navbar = () => {
    const [active, setActive] = useState("Home");

    const navItems = [
        { name: "Chat Global", icon: <MessageCircle size={18} /> },
        { name: "Home", icon: <Home size={18} /> },
        { name: "Baca Quran", icon: <BookOpen size={18} /> },
        { name: "Profile", icon: <User size={18} /> },
    ];

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
            {/* Logo */}
            <div className="flex items-center space-x-1">
                <img src={logo} alt="logo" className="w-12" />
                <span className="font-semibold text-blue-600 text-lg ">Mufadz App</span>
            </div>

            {/* Menu */}
            <ul className="flex items-center space-x-6">
                {navItems.map((item) => (
                    <li
                        key={item.name}
                        onClick={() => setActive(item.name)}
                        className={`flex items-center space-x-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200
                            ${active === item.name
                                ? "bg-blue-50 text-blue-600 hover:-translate-y-[2px] hover:shadow-sm hover:bg-blue-100"
                                : "text-gray-600 hover:bg-blue-50 hover:-translate-y-[2px] hover:shadow-sm"
                            }`}
                    >
                        {item.icon}
                        <span className="text-sm">{item.name}</span>
                    </li>

                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
