import Link from "next/link";
import Hero from "@/components/Hero";
import BeritaList from "@/components/BeritaList";
import { sekolah } from "@/data/sekolah";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto -mt-8 max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-white p-6 shadow-md md:grid-cols-4">
          {sekolah.statistik.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-blue-700">{s.nilai}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pt-14 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-700">
            Sambutan Kepala Sekolah
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
            {sekolah.sambutan.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-800">
            {sekolah.kepalaSekolah}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-700">
            Tentang {sekolah.namaSingkat}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {sekolah.profil}
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Selengkapnya
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Berita Terbaru</h2>
          <Link
            href="/berita"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Semua berita →
          </Link>
        </div>
        <BeritaList limit={3} />
      </section>
    </>
  );
}