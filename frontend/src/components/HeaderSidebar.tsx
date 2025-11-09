import Profil from '../assets/ProfilKosong.webp'
import Logo from '../assets/logo.webp'

const HeaderSidebar = () => {
    return (
        <>
            <div className="flex items-center gap-3 p-3 border-b dark:border-gray-600 justify-center">
                <img
                    src={Logo}
                    alt="profil"
                    className="w-11 rounded-full transition-transform duration-300 hover:-translate-y-1 hover:rotate-3 border dark:border-gray-600"
                />
            </div>

            <div className=" border-b dark:border-gray-600  py-2 px-1">
                <div className='flex items-center gap-3 p-2 transition bg-gray-100 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-900  rounded-md'>
                    <img
                    src={Profil}
                    alt="profil"
                    className="w-8 rounded-full transition-transform duration-300 hover:scale-110"
                />
                <div className="greeting flex flex-col  ">
                    <h2 className='font-semibold text-sm text-gray-600 dark:text-gray-300 cursor-pointer '>Selamat Datang</h2>
                    <h1 className='font-bold text-gray-700  dark:text-gray-300 cursor-pointer'>Fulan bin Wulan</h1>
                </div>
                </div>
            </div>
        </>
    )
}

export default HeaderSidebar
