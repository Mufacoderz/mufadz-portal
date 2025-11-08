import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import ChatGlobal from "./pages/ChatPage"
import BacaQuran from "./pages/QuranPage"
import Profile from "./pages/ProfilePage"
import Homepages from "./pages/HomePage"
import DoaList from "./pages/DoaPage/DoaList"
import DoaDetail from "./pages/DoaPage/DoaDetail"
import Panduan from "./pages/PanduanPage"
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-64 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Homepages />} />
            <Route path="/chat" element={<ChatGlobal />} />
            <Route path="/quran" element={<BacaQuran />} />
            <Route path="/doa" element={<DoaList />} />
            <Route path="/doa/:id" element={<DoaDetail />} />   
            <Route path="/profile" element={<Profile />} />
            <Route path="/panduan" element={<Panduan />} />
          </Routes>
        <Footer/>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
