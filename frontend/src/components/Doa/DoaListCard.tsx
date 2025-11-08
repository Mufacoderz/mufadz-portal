import { Link } from "react-router-dom"
import { useDoa } from "../../api/doa"


const DoaListCard = () => {
    const { doaList} = useDoa()

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {doaList.map((doa)=>(
                    <Link key={doa.id} to={`/doa/${doa.id}`}>
                        <div
                        key={doa.id}
                        className="group bg-white/80 backdrop-blur-sm border border-blue-100 hover:border-blue-400 
                        rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer
                        hover:-translate-y-1 flex flex-col items-start"
                    >
                        <div className="flex items-center justify-between w-full ">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold shadow-sm">
                                    {doa.id}
                                </div>
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors flex-1">
                                    {doa.judul}
                                </h3>
                            </div>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
    )
}

export default DoaListCard
