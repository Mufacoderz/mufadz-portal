
import Footer from "../components/Footer"
import PanduanHeading from "../components/Panduan/PanduanHeading"
import PanduanList from "../components/Panduan/PanduanList"
import PanduanSupport from "../components/Panduan/PanduanSupport"

export default function Panduan() {


    return (
        <>
            <div className="w-full dark:bg-gray-900">
                <div className="max-w-6xl mx-auto px-5 py-10 ">
                <PanduanHeading/>
                <PanduanList/>
                <PanduanSupport/>
            </div>
            </div>
            <Footer/>
        </>
    )
}
