import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

export default function TanyaFadzAIButton() {
    return (
        <div className="px-6 mt-3">
            <button
                className="
                relative overflow-hidden rounded-full 
                bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600
                text-white dark:text-gray-800 font-semibold px-5 py-2.5
                shadow-lg shadow-blue-300/40 dark:shadow-blue-700/40
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-blue-400/50
                focus:outline-none
                w-fit group
                "
            >

                <Link to={"/chatbot"}>
                    <span className="relative z-10 flex items-center gap-2">
                    Tanya Fadz AI
                    <Bot w-5 h-5/>
                </span>
                </Link>

            </button>
        </div>
    );
}
