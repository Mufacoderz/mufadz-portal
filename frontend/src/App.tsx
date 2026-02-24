import { useLocation, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

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
// import AdminUsers from "./pages/admin/Users";
// import AdminContent from "./pages/admin/Content";

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  exp: number;
}

// ProtectedRoute Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (requiredRole && decoded.role !== requiredRole) return <Navigate to="/" />;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function AppContent() {
  const location = useLocation();
  const [role, setRole] = useState<string>("");

  // cngambil role dri tokennya
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setRole(decoded.role);
      } catch {
        setRole("");
        localStorage.removeItem("token");
      }
    } else {
      setRole("");
    }
  }, [location.pathname]);

  // route yg tidak perlu ada sidebar
  const hideSidebarRoutes = ["/login", "/register"];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
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
          {/* <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/content"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminContent />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </main>
    </div>
  );
}

export default AppContent;