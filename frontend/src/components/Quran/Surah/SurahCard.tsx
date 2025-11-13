import { Link } from "react-router-dom";
import type { Surah } from "../../../types/surah";
import Number from "../Number";

type SurahCardProps = {
    surah: Surah;
};

function SurahCard({ surah }: SurahCardProps) {
    return (
        <Link to={`/surah/${surah.nomor}`}>
            <div className="bg-dark p-4 rounded-lg flex justify-between gap-3">
                <div className="flex text-left gap-3">
                    <Number nomor={surah.nomor} />
                    <div className="text-light">
                        <p className="font-bold text-base">{surah.namaLatin}</p>
                        <p className="text-subtle">{surah.arti}</p>
                        <p className="text-subtle">{surah.tempatTurun} • {surah.jumlahAyat}</p>
                    </div>
                </div>
                <p className="font-bold text-xl text-arab-blue">{surah.nama}</p>
            </div>
        </Link>
    );
}

export default SurahCard;
