import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, BookOpen, Heart, MessageCircle, Settings, LogOut } from "lucide-react";
import { jwtDecode } from "jwt-decode";

import HeaderSidebarAdmin from "./HeaderSidebar";
import SidebarToggle from "./SidebarToggle";

const SidebarAdmin = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const activePath = location.pathname;

    // cek login admin dari token
    let isAdmin = false;
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded: { role?: string } = jwtDecode(token);
            isAdmin = decoded.role === "admin";
        } catch (err) {
            console.error("Token invalid", err);
            isAdmin = false;
        }
    }

    const navItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={20} /> },
        { name: "Baca Quran", path: "/admin/quran", icon: <BookOpen size={20} /> },
        { name: "Manajemen User", path: "/admin/manajemenUser", icon: <Users size={20} /> },
        { name: "Manajemen Doa", path: "/admin/manajemenDoa", icon: <Heart size={20} /> },
        { name: "Forum", path: "/admin/forum", icon: <MessageCircle size={20} /> },
        { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
    ];

    const handleLogout = () => {
        if (!confirm("Yakin mau keluar?")) return;
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    return (
        <>
            <SidebarToggle open={open} setOpen={setOpen} />

            <aside
                className={`fixed top-0 left-0 h-full bg-white dark:bg-bgDark shadow-lg border-r dark:border-gray-600 z-40 transform transition-transform duration-300 ease-in-out
                ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-60 md:w-64`}
            >
                <HeaderSidebarAdmin />

                <ul className="mt-6 space-y-1 px-3">
                    {navItems.map((item) => {
                        const isActive = activePath === item.path;
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200
                                    ${isActive
                                        ? "bg-blue-50 text-textLight shadow-sm border-l-4 border-textLight dark:bg-blue-950 dark:text-textDark dark:border-textDark"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                                    } hover:translate-x-1`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="absolute bottom-5 left-0 w-full px-3 space-y-1">
                    {isAdmin && (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg 
                            text-gray-500 hover:bg-red-50 dark:hover:bg-red-950 
                            hover:text-red-600 dark:hover:text-red-300 
                            transition-all duration-200"
                        >
                            <LogOut size={20} />
                            <span>Keluar</span>
                        </button>
                    )}
                </div>
            </aside>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
                />
            )}
        </>
    );
};

export default SidebarAdmin;