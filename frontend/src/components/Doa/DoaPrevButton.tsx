import { useNavigate } from "react-router-dom"


const DoaPrevButton = () => {
        const navigate = useNavigate()
    return (
        <button
                onClick={() => navigate("/doa")}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
            >
                ← Kembali ke Daftar Do'a
            </button>
    )
}

export default DoaPrevButton
