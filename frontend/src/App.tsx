import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatGlobal from "./pages/ChatPage";
import QuranList from "./pages/QuranPage/QuranList";
import DetailSurahPage from "./pages/QuranPage/DetailSurah";
import Profile from "./pages/ProfilePage";
import Homepages from "./pages/HomePage";
import DoaList from "./pages/DoaPage/DoaList";
import DoaDetail from "./pages/DoaPage/DoaDetail";
import Panduan from "./pages/PanduanPage";
import DarkModeToggle from "./components/DarkModeToggle";
import ChatBot from "./pages/ChatBot";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/Dashboard"

function AppContent() {
  const location = useLocation();

  const hideSidebarRoutes = ["/login", "/register", "/admin"];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!hideSidebar && <Sidebar />}
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

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
