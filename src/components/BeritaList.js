"use client";

import BeritaCard from "@/components/BeritaCard";
import { useBerita, useBeritaTermuat } from "@/lib/store";

export default function BeritaList({ limit, kolom = "md:grid-cols-3" }) {
  const semua = useBerita();
  const termuat = useBeritaTermuat();
  const tampil = limit ? semua.slice(0, limit) : semua;

  if (!termuat) {
    return <p className="text-slate-500">Memuat berita...</p>;
  }

  if (tampil.length === 0) {
    return <p className="text-slate-500">Belum ada berita.</p>;
  }

  return (
    <div className={`grid gap-5 ${kolom}`}>
      {tampil.map((b) => (
        <BeritaCard key={b.id} berita={b} />
      ))}
    </div>
  );
}