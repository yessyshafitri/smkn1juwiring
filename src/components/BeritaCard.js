import Link from "next/link";
import Image from "next/image";

export default function BeritaCard({ berita }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-44 w-full bg-slate-200">
        <Image
          src={berita.gambar}
          alt={berita.judul}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {berita.kategori}
        </span>
        <h3 className="mt-3 text-lg font-bold text-slate-800">{berita.judul}</h3>
        <p className="mt-1 text-xs text-slate-500">{berita.tanggal}</p>
        <p className="mt-3 flex-1 text-sm text-slate-600">{berita.ringkasan}</p>
        <Link
          href={`/berita/${berita.id}`}
          className="mt-4 w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Baca Selengkapnya
        </Link>
      </div>
    </article>
  );
}