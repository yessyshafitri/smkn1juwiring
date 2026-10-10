import Link from "next/link";
import Image from "next/image";
import { sekolah } from "@/data/sekolah";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <Image
        src={sekolah.banner}
        alt={`Foto ${sekolah.nama}`}
        fill
        priority
        unoptimized
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-blue-900/70" />

      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <Image
          src={sekolah.logo}
          alt={`Logo ${sekolah.nama}`}
          width={96}
          height={96}
          unoptimized
          className="mx-auto"
        />
        <p className="mt-4 text-sm uppercase tracking-widest text-blue-200">
          Selamat Datang di
        </p>
        <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
          {sekolah.nama}
        </h1>
        <p className="mt-3 text-xl italic text-blue-100">{sekolah.slogan}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/about"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Tentang Kami
          </Link>
          <Link
            href="/berita"
            className="rounded-lg border border-white px-5 py-3 font-semibold transition hover:bg-white/10"
          >
            Lihat Berita
          </Link>
        </div>
      </div>
    </section>
  );
}