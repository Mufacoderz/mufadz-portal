import type { Surah } from "../../../types/surah";
import ChevronRight from "../../../assets/ChevronRightIcon.svg"
type DetailSurahInfoProps = {
  surah: Surah;
};

function DetailSurahInfo({ surah }: DetailSurahInfoProps) {
  return (
    <div className="bg-[url('/src/assets/AyatCard.jpg')] relative  bg-cover bg-no-repeat py-5 px-4 rounded-2xl text-light text-left">
      <div className="mb-8 flex flex-col gap-2">
        <p className="font-bold text-2xl">{surah.namaLatin} </p>
        <p className="font-light text-sm">{surah.arti}</p>
        <hr className="opacity-10" />
        <p className="font-semibold text-sm">
          {surah.tempatTurun} • {surah.jumlahAyat} Ayat
        </p>
      </div>
      <div className="flex items-center justify-between bg-accent-light-purple px-3 py-1 absolute bottom-0 left-0 w-full rounded-b-2xl">
        <p>Tentang surah {surah.namaLatin}</p>
        <img src={ChevronRight} alt="Chevron Right" />
      </div>
    </div>
  );
}

export default DetailSurahInfo;
