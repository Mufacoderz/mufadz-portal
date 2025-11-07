const Hero = () => {
    return (
        <div className="space-y-5 w-full max-w-full box-border">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-snug text-gray-800">
                <span className="block text-gray-700">Assalamu’alaikum,</span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                    Selamat Datang di Mufadz App
                </span>
            </h1>

            <p className="text-gray-500 text-lg sm:text-xl max-w-full leading-relaxed mx-auto lg:mx-0">
                Aplikasi pendukung kehidupan Muslim modern — dengan jadwal sholat,
                arah kiblat, dan fitur Islami lainnya dalam satu tempat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start flex-wrap">
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
                    Mulai Sekarang
                </button>
                <button className="px-6 py-3 bg-white border border-blue-200 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all">
                    Pelajari Lebih Lanjut
                </button>
            </div>
        </div>
    )
}

export default Hero
