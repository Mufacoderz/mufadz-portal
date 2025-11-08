import { useDoa } from "../../api/doa"
import { Sparkles } from "lucide-react"
import DoaListCard from "../../components/Doa/DoaListCard"
import HeadingPage from "../../components/Heading"

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
            
            <HeadingPage title="Daftar Doa"/>
            <DoaListCard/>
            
        </section>
    )
}