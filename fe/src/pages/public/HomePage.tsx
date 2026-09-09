import MainHero from '../../components/public/Home/Home'
import Footer from '../../components/public/Footer'
import SEO from '../../components/public/SEO'

const Homepages = () => {
    return (
        <div>
            <SEO
                title="Beranda"
                description="Mufadz — Asisten Islami digital. Baca Al-Quran, doa harian, kalkulator zakat, zikir, dan tanya jawab seputar Islam dengan AI."
                path="/"
            />
            <MainHero/>
            <Footer/>
        </div>
    )
}

export default Homepages
