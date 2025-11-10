
import DoaListCard from "../../components/Doa/DoaListCard"
import HeadingPage from "../../components/Heading"
import Footer from "../../components/Footer"

export default function DoaList() {
    

    return (
        <>
            <section className=" px-5 py-10 dark:bg-gray-900 h-full">

                <div className="max-w-3xl mx-auto">
                    <HeadingPage title="Daftar Doa" />
                    <DoaListCard />
                </div>

            </section>
            <Footer />
        </>
    )
}