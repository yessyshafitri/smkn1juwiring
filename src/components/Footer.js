import Link from "next/link";
import { sekolah } from "@/data/sekolah";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-white">{sekolah.nama}</h3>
          <p className="mt-2 text-sm">{sekolah.slogan}</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Kontak</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>{sekolah.alamat}</li>
            <li>{sekolah.telepon}</li>
            <li>{sekolah.email}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Menu</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/berita" className="hover:text-white">Berita</Link></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {sekolah.nama}. Hak cipta dilindungi.
      </p>
    </footer>
  );
}