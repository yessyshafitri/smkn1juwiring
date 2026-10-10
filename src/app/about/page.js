import { sekolah } from "@/data/sekolah";

export const metadata = { title: "About | SMK Negeri 1 Juwiring" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <header>
        <h1 className="text-3xl font-bold text-blue-700">
          Tentang {sekolah.nama}
        </h1>
        {sekolah.tahunBerdiri && (
          <p className="mt-2 text-slate-600">
            Berdiri sejak {sekolah.tahunBerdiri}
          </p>
        )}
      </header>

      <section>
        <h2 className="text-xl font-bold">Profil Sekolah</h2>
        <p className="mt-2 leading-relaxed text-slate-600">{sekolah.profil}</p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Sejarah</h2>
        <p className="mt-2 leading-relaxed text-slate-600">{sekolah.sejarah}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-700">Visi</h2>
          <p className="mt-2 text-slate-600">{sekolah.visi}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-700">Misi</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-600">
            {sekolah.misi.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Kompetensi Keahlian</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {sekolah.kompetensiKeahlian.map((k) => (
            <span
              key={k}
              className="rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white"
            >
              {k}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Program Unggulan</h2>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {sekolah.programUnggulan.map((p) => (
            <li
              key={p}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
            >
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold">Fasilitas</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {sekolah.fasilitas.map((f) => (
            <div
              key={f}
              className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-black shadow-sm"
            >
              {f}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Prestasi</h2>
        <ul className="mt-3 space-y-2">
          {sekolah.prestasi.map((p) => (
            <li
              key={p}
              className="rounded-lg border-l-4 border-blue-600 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
            >
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold">Ekstrakurikuler</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {sekolah.ekstrakurikuler.map((e) => (
            <span
              key={e}
              className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700"
            >
              {e}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-slate-900 p-6 text-slate-200">
        <h2 className="text-xl font-bold text-white">Alamat dan Kontak</h2>
        <ul className="mt-3 space-y-1 text-sm">
          <li>Alamat: {sekolah.alamat}</li>
          <li>Telepon: {sekolah.telepon}</li>
          <li>Email: {sekolah.email}</li>
          <li>Jam layanan: {sekolah.jamOperasional}</li>
        </ul>
      </section>
    </div>
  );
}