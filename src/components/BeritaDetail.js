"use client";

import Link from "next/link";
import Image from "next/image";
import { useBerita, useSiap } from "@/lib/store";

export default function BeritaDetail({ id }) {
  const semua = useBerita();
  const siap = useSiap();

  if (!siap) {
    return <p className="px-6 py-16 text-center text-slate-500">Memuat...</p>;
  }

  const berita = semua.find((b) => b.id === id);

  if (!berita) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-800">
          Berita tidak ditemukan
        </h1>
        <Link
          href="/berita"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <span className="block w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
        {berita.kategori}
      </span>
      <h1 className="mt-3 text-3xl font-bold">{berita.judul}</h1>
      <p className="mt-2 text-sm text-slate-500">{berita.tanggal}</p>

      <div className="relative mt-6 h-64 w-full overflow-hidden rounded-xl bg-slate-200 md:h-96">
        <Image
          src={berita.gambar}
          alt={berita.judul}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="mt-8 space-y-4 leading-relaxed text-slate-700">
        {berita.isi.map((paragraf, i) => (
          <p key={i}>{paragraf}</p>
        ))}
      </div>

      <Link
        href="/berita"
        className="mt-10 inline-block rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
      >
        Kembali ke Berita
      </Link>
    </article>
  );
}