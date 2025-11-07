import { useDoa } from "../api/doa"
import { Sparkles } from "lucide-react"

export default function DoaList() {
    const { doaList, loading, error } = useDoa()

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-blue-500 text-lg animate-pulse flex items-center gap-2">
                    <Sparkles className="animate-spin-slow" /> Memuat do'a...
                </p>
            </div>
        )

    if (error)
        return (
            <p className="text-center mt-10 text-red-500 font-medium">
                Terjadi kesalahan: {error}
            </p>
        )

    if (!doaList || doaList.length === 0)
        return (
            <p className="text-center mt-10 text-gray-500 italic">
                Tidak ada do'a tersedia.
            </p>
        )

    return (
        <section className="max-w-5xl mx-auto px-5 mt-10">
            <header className="flex flex-col items-center mb-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
                    Kumpulan Do'a Harian
                </h2>
            </header>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {doaList.map((doa) => (
                    <div
                        key={doa.id}
                        className="group bg-white/80 backdrop-blur-sm border border-blue-100 hover:border-blue-400 
                        rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer
                        hover:-translate-y-1 flex flex-col items-start"
                    >
                        <div className="flex items-center justify-between w-full mb-2">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold shadow-sm">
                                    {doa.id}
                                </div>
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors flex-1">
                                    {doa.judul}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-3 text-sm text-gray-500 italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Klik untuk melihat detail
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}