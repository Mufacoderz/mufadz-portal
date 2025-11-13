import DetailSurahContainer from "../../components/Quran/DetailSurah/DetailSurahContainer"
import QuranPrevButton from "../../components/Quran/QuranPrevButton"

function DetailSurahPage() {
    return (
        <>
            <div className="py-10 w-[80%] mx-auto">
                <QuranPrevButton />
                <DetailSurahContainer />
            </div>
        </>
    )
}

export default DetailSurahPage