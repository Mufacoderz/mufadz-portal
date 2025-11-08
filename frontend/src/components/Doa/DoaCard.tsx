interface DoaCardProps {
    judul: string
    arab: string
    latin: string
    terjemah: string
}

export default function DoaCard({ judul, arab, latin, terjemah }: DoaCardProps) {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-blue-100">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">{judul}</h1>

            <div className="text-right mb-6">
                <p className="mt-2 text-2xl leading-relaxed text-right" style={{ fontFamily: "'Amiri', serif" }}>
                    {arab}
                </p>
            </div>

            <p className="text-center italic text-gray-500 mb-4 text-lg">{latin}</p>

            <p className="text-gray-800 text-base leading-relaxed">{terjemah}</p>
        </div>
    )
}
