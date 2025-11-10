const Hero = () => {
    return (
        <div className="space-y-5 w-full  box-border mt-10 sm:mt-0">

            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-snug text-gray-800 text-center md:text-left w-full md:w-[70%]">
                <span className=" bg-blue-600 dark:bg-blue-300  bg-clip-text text-transparent">
                    Mufadz Portal
                </span>
                <span className="block text-gray-700 dark:text-gray-100">Media Islami Untuk Generasi Masa Kini</span>
                
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-full leading-relaxed mx-auto lg:mx-0">
                Aplikasi pendukung kehidupan Muslim modern — dengan jadwal sholat,
                arah kiblat, dan fitur Islami lainnya dalam satu tempat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start flex-wrap mx-auto sm:m-0 w-[70%] sm:w-full">
                <button className="px-6 py-3 bg-blue-600 dark:bg-blue-300 text-white dark:text-gray-800 font-semibold rounded-xl shadow-md hover:bg-blue-700 dark:hover:bg-blue-200 hover:shadow-lg transition-all">
                    Mulai Sekarang
                </button>
                <a href="/panduan" className=" px-6 py-3 bg-transparent
                dark:border-blue-300 border-2 border-blue-600  text-blue-600 dark:text-blue-300 dark:hover:text-gray-800 font-semibold rounded-xl hover:bg-blue-600  hover:text-white dark:hover:bg-blue-300 transition-all">
                    Pelajari Lebih Lanjut
                </a>
            </div>
        </div>
    )
}

export default Hero
