import { useLocation } from "react-router-dom";
import Sidebar from "./components/public/Sidebar/Sidebar";
import SidebarAdmin from "./components/admin/Sidebar/Sidebar";
import DarkModeToggle from "./components/public/DarkModeToggle";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// pages
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
import ProtectedRoute from "./components/public/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // cek apakah admin login
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);
  }, [location.pathname]);

  // routes yang tidak perlu sidebar
  const hideSidebarRoutes = ["/login", "/register"];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {!hideSidebar && (isAdmin ? <SidebarAdmin /> : <Sidebar />)}

      <DarkModeToggle />

      <main
        className={`flex-1 transition-all duration-300 ${
          hideSidebar ? "ml-0" : "ml-0 md:ml-64"
        }`}
      >
        <Routes>
          <Route path="/" element={<Homepages />} />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatGlobal />
              </ProtectedRoute>
            }
          />

          <Route path="/quran" element={<QuranList />} />
          <Route path="/surah/:surahId" element={<DetailSurahPage />} />
          <Route path="/doa" element={<DoaList />} />
          <Route path="/doa/:id" element={<DoaDetail />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 🔐 ADMIN ROUTE */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/panduan" element={<Panduan />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default AppContent;