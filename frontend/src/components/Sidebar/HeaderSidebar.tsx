import Profil from '../../assets/ProfilKosong.webp'
import Logo from '../../assets/logo.webp'
import { Link } from 'react-router-dom'

const HeaderSidebar = () => {
    return (
        <>
            <div className="flex items-center gap-3 p-3 border-b dark:border-gray-600 justify-center">
                <img

                    src={Logo}
                    alt="logo"
                    className="w-11 rounded-full transition-transform duration-300 hover:-translate-y-1 hover:rotate-3 border dark:border-gray-600"
                />

            </div>

            <div className="border-b dark:border-gray-600 py-2 px-1">
                <div className="group flex items-center gap-3 p-2 transition bg-gray-100 hover:bg-green-50 dark:bg-gray-800 dark:hover:bg-green-950 rounded-md">
                    <img
                        src={Profil}
                        alt="profil"
                        className="ml-3 w-8 rounded-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="greeting flex flex-col">
                        <h2 className="font-semibold text-sm text-gray-600 dark:text-gray-300 cursor-pointer ">
                            <Link to={"/login"} className='hover:text-green-500 dark:hover:text-green-500'>Masuk</Link>
                            /
                            <Link to={"/register"} className='hover:text-green-500 dark:hover:text-green-500'>Daftar</Link>
                        </h2>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HeaderSidebar
