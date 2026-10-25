import BeritaList from "@/components/BeritaList";

export const metadata = { title: "Berita | SMK Negeri 1 Juwiring" };

export default function BeritaPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-blue-700">Berita Sekolah</h1>
      <p className="mt-2 text-slate-600">
        Informasi, pengumuman, dan kegiatan terbaru.
      </p>
      <div className="mt-8">
        <BeritaList kolom="md:grid-cols-2" />
      </div>
    </div>
  );
}