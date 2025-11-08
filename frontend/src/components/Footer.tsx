import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="bg-blue-700 text-white py-3">
            <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
                
                <div className="text-sm font-semibold">Mufadz App</div>

                <div className="flex gap-3 text-sm">
                    <a href="#" className="hover:text-gray-200 transition"><FaFacebookF /></a>
                    <a href="#" className="hover:text-gray-200 transition"><FaTwitter /></a>
                    <a href="#" className="hover:text-gray-200 transition"><FaInstagram /></a>
                    <a href="#" className="hover:text-gray-200 transition"><FaGithub /></a>
                </div>

                <div className="text-xs text-gray-200">&copy; {new Date().getFullYear()} Mufadz App</div>

            </div>
        </footer>
    )
}
