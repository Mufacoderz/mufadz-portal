import { BrowserRouter, useLocation, Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "./hooks/useUser";

import Sidebar from "./components/public/Sidebar/Sidebar";
import SidebarAdmin from "./components/admin/SidebarAdmin/Sidebar";
import DarkModeToggle from "./components/public/DarkModeToggle";

import ChatGlobal from "./pages/public/ChatPage";
import QuranList from "./pages/public/QuranPage/QuranList";
import DetailSurahPage from "./pages/public/QuranPage/DetailSurah";
import Profile from "./pages/public/ProfilePage";
import Homepages from "./pages/public/HomePage";
import DoaList from "./pages/public/DoaPage/DoaList";
import DoaDetail from "./pages/public/DoaPage/DoaDetail";
import Panduan from "./pages/public/PanduanPage";
import ChatBot from "./pages/public/ChatBot";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import AdminDashboard from "./pages/admin/Dashboard";

function AppContent() {
    const location = useLocation();

    // ✅ Ambil dari context — otomatis update setelah login tanpa perlu decode manual
    const { user, isLoggedIn, loading } = useUser();
    const role = user?.role ?? "";

    const hideSidebarRoutes = ["/login", "/register"];
    const hideSidebar = hideSidebarRoutes.includes(location.pathname);

    // Tunggu context selesai fetch — cegah sidebar flash ke sidebar yang salah
    if (loading && !hideSidebar) {
        return (
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center">
                <svg className="w-7 h-7 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {!hideSidebar && (role === "admin" ? <SidebarAdmin /> : <Sidebar />)}
            <DarkModeToggle />
            <main className={`flex-1 transition-all duration-300 ${hideSidebar ? "ml-0" : "ml-0 md:ml-64"}`}>
                <Routes>
                    {/* PUBLIC */}
                    <Route path="/" element={<Homepages />} />
                    <Route path="/quran" element={<QuranList />} />
                    <Route path="/surah/:surahId" element={<DetailSurahPage />} />
                    <Route path="/doa" element={<DoaList />} />
                    <Route path="/doa/:id" element={<DoaDetail />} />
                    <Route path="/panduan" element={<Panduan />} />
                    <Route path="/chatbot" element={<ChatBot />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* USER PROTECTED */}
                    <Route path="/chat" element={
                        isLoggedIn ? <ChatGlobal /> : <Navigate to="/login" replace />
                    } />
                    <Route path="/profile" element={
                        isLoggedIn ? <Profile /> : <Navigate to="/login" replace />
                    } />

                    {/* ADMIN PROTECTED */}
                    <Route path="/admin/dashboard" element={
                        !isLoggedIn ? <Navigate to="/login" replace />
                        : role === "admin" ? <AdminDashboard />
                        : <Navigate to="/" replace />
                    } />
                </Routes>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}