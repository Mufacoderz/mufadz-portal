import type { Ayat } from "../../../types/surah";
import Number from "../Number";

type AyatCardProps = {
  ayat: Ayat;
};

function AyatCard({ ayat }: AyatCardProps) {
  return (
    <div className="bg-dark p-4 rounded-lg text-light text-left flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <Number nomor={ayat.nomorAyat} />
        <p className="font-bold text-2xl text-right w-full">{ayat.teksArab}</p>
      </div>
      <p className="font-sm text-light">{ayat.teksLatin}</p>
      <p className="font-sm text-subtle ">{ayat.teksIndonesia}</p>
    </div>
  );
}

export default AyatCard;
