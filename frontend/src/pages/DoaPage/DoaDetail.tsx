import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import DoaPrevButton from "../../components/Doa/DoaPrevButton"
import DoaCard from "../../components/Doa/DoaCard"

interface Doa {
    id: number
    judul: string
    arab: string
    latin: string
    terjemah: string
}

export default function DoaDetail() {
    const { id } = useParams<{ id: string }>()
    const [doa, setDoa] = useState<Doa | null>(null)

    useEffect(() => {
        if (!id) return
        axios
            .get(`https://open-api.my.id/api/doa/${id}`)
            .then(res => setDoa(res.data))
            .catch(console.error)
    }, [id])

    if (!doa) return <p className="text-center mt-10 text-blue-500 animate-pulse">Loading...</p>

    return (
        <div className="max-w-3xl mx-auto mt-10 px-5">
            <DoaPrevButton />

            <DoaCard
                judul={doa.judul}
                arab={doa.arab}
                latin={doa.latin}
                terjemah={doa.terjemah}
            />
        </div>
    )
}
