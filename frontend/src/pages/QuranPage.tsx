import HeadingPage from "../components/Heading";

export default function BacaQuran() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen mt-10">

            <HeadingPage title="Baca Al-Qur'an"/>

            <p className="text-gray-500">halaman Sementara versi embedded </p>
            <div className="w-full max-w-5xl h-[80vh] rounded-xl overflow-hidden shadow-lg border border-blue-100">
                <iframe
                    src="https://quran-react-js-rmie.vercel.app/"
                    title="Quran Reader"
                    className="w-full h-full border-none"
                    allowFullScreen
                ></iframe>
            </div>

            <p className="mt-3 text-sm text-gray-500">
                Sumber: <a href="https://quran-react-js-rmie.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Quran React JS</a>
            </p>
        </div>
    );
}
