import DetailSurahContainer from "../../components/Quran/DetailSurah/DetailSurahContainer"
import QuranPrevButton from "../../components/Quran/QuranPrevButton"

function DetailSurahPage() {
    return (
        <>
            <div className="dark:bg-gray-900">
                <div className="py-10 sm:w-[80%] mx-auto">
                    <div className="ml-6">
                        <QuranPrevButton />
                    </div>
                    <DetailSurahContainer />
                </div>
            </div>
        </>
    )
}

export default DetailSurahPage