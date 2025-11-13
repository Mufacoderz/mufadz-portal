import SurahContainer from "../../components/Quran/Surah/SurahContainer"
import HeadingPage from "../../components/Heading"

const QuranList = () => {
    return (
        <>
            <div className="py-10 w-[80%] mx-auto">
                <HeadingPage title="Baca Al-Quran" />
                <SurahContainer />
            </div>
        </>
    )
}

export default QuranList
