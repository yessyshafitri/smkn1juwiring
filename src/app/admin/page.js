"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useAdminStatus,
  logout,
  useBerita,
  useBeritaTermuat,
  tambahBerita,
  ubahBerita,
  hapusBerita,
  isiDataAwal,
} from "@/lib/store";

const KATEGORI = [
  "Pengumuman",
  "Kegiatan",
  "Prestasi",
  "Akademik",
  "Olahraga",
  "Kemitraan",
  "SPMB",
];

const GAMBAR_TERSEDIA = [
  "/berita1.jpg",
  "/berita2.jpg",
  "/berita3.jpg",
  "/berita4.jpg",
  "/berita5.jpg",
  "/berita6.png",
  "/banner.jpg",
];

const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none";
const label = "mb-1 block text-sm font-medium text-slate-700";

function hariIni() {
  return new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const kosong = () => ({
  judul: "",
  tanggal: hariIni(),
  kategori: "Kegiatan",
  gambar: "/berita1.jpg",
  ringkasan: "",
  isi: "",
});

function buatSlug(teks) {
  return (
    teks
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "berita"
  );
}

function idUnik(judul, daftar) {
  const dasar = buatSlug(judul);
  let id = dasar;
  let n = 2;
  while (daftar.some((b) => b.id === id)) {
    id = `${dasar}-${n++}`;
  }
  return id;
}

function Dashboard() {
  const router = useRouter();
  const berita = useBerita();
  const termuat = useBeritaTermuat();
  const [form, setForm] = useState(kosong);
  const [editId, setEditId] = useState(null);
  const [pesan, setPesan] = useState("");
  const [menyimpan, setMenyimpan] = useState(false);

  const jumlahKategori = new Set(berita.map((b) => b.kategori)).size;

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function batal() {
    setEditId(null);
    setForm(kosong());
  }

  function mulaiEdit(b) {
    setPesan("");
    setEditId(b.id);
    setForm({
      judul: b.judul,
      tanggal: b.tanggal,
      kategori: b.kategori,
      gambar: b.gambar,
      ringkasan: b.ringkasan,
      isi: b.isi.join("\n\n"),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function simpan(e) {
    e.preventDefault();
    const isi = form.isi
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);

    setMenyimpan(true);
    try {
      if (editId) {
        await ubahBerita(editId, { ...form, isi });
        setPesan("Berita berhasil diperbarui.");
      } else {
        await tambahBerita({ id: idUnik(form.judul, berita), ...form, isi });
        setPesan("Berita berhasil ditambahkan.");
      }
      batal();
    } catch (err) {
      setPesan("Gagal menyimpan: " + err.message);
    } finally {
      setMenyimpan(false);
    }
  }

  async function hapus(b) {
    if (!confirm(`Hapus berita "${b.judul}"?`)) return;
    try {
      await hapusBerita(b.id);
      if (editId === b.id) batal();
      setPesan("Berita berhasil dihapus.");
    } catch (err) {
      setPesan("Gagal menghapus: " + err.message);
    }
  }

  async function isiAwal() {
    if (
      !confirm(
        "Isi database dengan 6 berita data awal? Berita dengan id yang sama akan ditimpa."
      )
    )
      return;
    try {
      await isiDataAwal();
      setPesan("Data awal berhasil diisi.");
    } catch (err) {
      setPesan("Gagal mengisi data: " + err.message);
    }
  }

  async function keluar() {
    await logout();
    router.push("/admin/login");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Dashboard Admin</h1>
          <p className="text-sm text-slate-500">
            Kelola berita sekolah. Data tersimpan di Supabase.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/berita"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Lihat Website
          </Link>
          <button
            onClick={keluar}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-blue-700">{berita.length}</p>
          <p className="text-sm text-slate-500">Total Berita</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-blue-700">{jumlahKategori}</p>
          <p className="text-sm text-slate-500">Kategori</p>
        </div>
      </section>

      {pesan && (
        <p className="rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
          {pesan}
        </p>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">
          {editId ? "Edit Berita" : "Tambah Berita"}
        </h2>

        <form onSubmit={simpan} className="mt-4 space-y-4">
          <div>
            <label className={label}>Judul</label>
            <input
              name="judul"
              className={input}
              value={form.judul}
              onChange={ubah}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className={label}>Tanggal</label>
              <input
                name="tanggal"
                className={input}
                value={form.tanggal}
                onChange={ubah}
                required
              />
            </div>
            <div>
              <label className={label}>Kategori</label>
              <select
                name="kategori"
                className={input}
                value={form.kategori}
                onChange={ubah}
              >
                {KATEGORI.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Gambar (file di folder public)</label>
              <input
                name="gambar"
                className={input}
                value={form.gambar}
                onChange={ubah}
                list="daftar-gambar"
                required
              />
              <datalist id="daftar-gambar">
                {GAMBAR_TERSEDIA.map((g) => (
                  <option key={g} value={g} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <label className={label}>Ringkasan</label>
            <textarea
              name="ringkasan"
              rows={2}
              className={input}
              value={form.ringkasan}
              onChange={ubah}
              required
            />
          </div>

          <div>
            <label className={label}>
              Isi berita (pisahkan paragraf dengan baris kosong)
            </label>
            <textarea
              name="isi"
              rows={6}
              className={input}
              value={form.isi}
              onChange={ubah}
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={menyimpan}
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {menyimpan
                ? "Menyimpan..."
                : editId
                ? "Simpan Perubahan"
                : "Tambah Berita"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={batal}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Daftar Berita</h2>
          <button
            onClick={isiAwal}
            className="text-sm font-semibold text-slate-500 hover:text-blue-600 hover:underline"
          >
            Isi data awal
          </button>
        </div>

        {!termuat ? (
          <p className="text-slate-500">Memuat berita...</p>
        ) : berita.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            Belum ada berita. Klik &quot;Isi data awal&quot; atau tambahkan
            berita lewat form di atas.
          </p>
        ) : (
          <ul className="space-y-3">
            {berita.map((b) => (
              <li
                key={b.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-800">{b.judul}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {b.tanggal} · {b.kategori}
                  </p>
                </div>
                <div className="flex gap-2 text-sm font-semibold">
                  <Link
                    href={`/berita/${b.id}`}
                    className="rounded-lg border border-slate-300 px-3 py-1 text-slate-700 transition hover:bg-slate-100"
                  >
                    Lihat
                  </Link>
                  <button
                    onClick={() => mulaiEdit(b)}
                    className="rounded-lg bg-amber-500 px-3 py-1 text-white transition hover:bg-amber-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => hapus(b)}
                    className="rounded-lg bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const status = useAdminStatus();

  useEffect(() => {
    if (status === "keluar") router.replace("/admin/login");
  }, [status, router]);

  if (status !== "masuk") {
    return <p className="px-6 py-16 text-center text-slate-500">Memuat...</p>;
  }

  return <Dashboard />;
}