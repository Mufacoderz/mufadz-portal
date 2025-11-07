import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import ChatGlobal from "./pages/ChatPage"
import BacaQuran from "./pages/QuranPage"
import Profile from "./pages/ProfilePage"
import Homepages from "./pages/HomePage"
import DoaList from "./pages/DoaPage"

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Konten utama */}
        <main className="flex-1 ml-0 md:ml-64 p-6 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Homepages />} />
            <Route path="/chat" element={<ChatGlobal />} />
            <Route path="/quran" element={<BacaQuran />} />
            <Route path="/doa" element={<DoaList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
