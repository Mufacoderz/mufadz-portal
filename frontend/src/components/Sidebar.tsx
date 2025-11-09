import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { MessageCircle, Home, BookOpen, User, LogOut, Menu, X, Heart, UserCircle, HelpCircle } from "lucide-react"

import HeaderSidebar from "./HeaderSidebar"

const Sidebar = () => {
    const [open, setOpen] = useState(false)
    const location = useLocation()
    const activePath = location.pathname

    const navItems = [
        { name: "Home", path: "/", icon: <Home size={20} /> },
        { name: "Forum Chat", path: "/chat", icon: <MessageCircle size={20} /> },
        { name: "Baca Quran", path: "/quran", icon: <BookOpen size={20} /> },
        { name: "Daftar Do'a", path: "/doa", icon: <Heart size={20} /> },
        { name: "Profile", path: "/profile", icon: <User size={20} /> },
        { name: "Panduan", path: "/panduan", icon: <HelpCircle size={20} /> },
    ]

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className={`md:hidden fixed top-4 z-50 dark:text-white bg-white dark:bg-gray-900 p-2 rounded-lg border-none  transition-all duration-300 
                    ${open ? "left-[236px]" : "left-[-5px]"}
                    ${open ? 'hover:bg-white' : 'hover:bg-blue-50'}`}
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            <aside
                className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900  shadow-lg border-r dark:border-gray-600 z-40 transform transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-60 md:w-64`}
            >

                <HeaderSidebar />

                <ul className="mt-6 space-y-1 px-3">
                    {navItems.map((item) => {
                        const isActive = activePath === item.path
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:translate-x-1 
                                        ${isActive
                                            ? "bg-blue-50 text-blue-600 shadow-sm border-l-4 border-blue-500 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-400"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                <div className="absolute bottom-5 left-0 w-full px-3">
                    <button
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    >
                        <LogOut size={20} />
                        <span>Keluar</span>
                    </button>
                    <a
                        href="https://github.com/Mufacoderz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                        <UserCircle size={20} />
                        <span>By Muhammad Fadil</span>
                    </a>
                </div>
            </aside>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
                ></div>
            )}
        </>
    )
}

export default Sidebar
