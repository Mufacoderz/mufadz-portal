import { useState } from "react"
import { Moon, Sun } from "lucide-react"

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false)

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark")
            setDarkMode(false)
        } else {
            document.documentElement.classList.add("dark")
            setDarkMode(true)
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className={`
        fixed top-4 right-4 z-50
        flex items-center justify-center
        w-10 h-10 rounded-full
        shadow-md border transition-all duration-300
        ${darkMode
                    ? "bg-gray-900 border-gray-700 hover:bg-yellow-900"
                    : "bg-white border-gray-200 hover:bg-blue-50"
                }
        `}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {darkMode ? (
                <Sun size={22} className="text-yellow-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
                <Moon size={22} className="text-blue-500 transition-transform duration-300 hover:rotate-45" />
            )}
        </button>
    )
}

export default DarkModeToggle
