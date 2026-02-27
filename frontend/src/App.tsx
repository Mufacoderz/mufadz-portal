// App.tsx
import { BrowserRouter, useLocation, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

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

interface DecodedToken {
  id?: number;
  email?: string;
  role?: string;
  exp?: number;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  if (token.split(".").length !== 3) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (requiredRole && decoded?.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Token decode error:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const location = useLocation();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setRole("");
      return;
    }

    if (token.split(".").length !== 3) {
      localStorage.removeItem("token");
      setRole("");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setRole(decoded?.role ?? "");
    } catch (error) {
      console.error("JWT decode gagal:", error);
      localStorage.removeItem("token");
      setRole("");
    }
  }, []);

  const hideSidebarRoutes = ["/login", "/register"];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!hideSidebar && (role === "admin" ? <SidebarAdmin /> : <Sidebar />)}

      <DarkModeToggle />

      <main
        className={`flex-1 transition-all duration-300 ${
          hideSidebar ? "ml-0" : "ml-0 md:ml-64"
        }`}
      >
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
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatGlobal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ADMIN PROTECTED */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
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