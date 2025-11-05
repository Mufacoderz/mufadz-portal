
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#edf5ff] via-[#d8ecff] to-[#b8d9f9] text-gray-800 font-sans flex flex-col">

      <Navbar/>
      <Hero/>
      <Footer/>
      
    </div>
  );
}
