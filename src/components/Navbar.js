"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sekolah } from "@/data/sekolah";

const menu = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/berita", label: "Berita" },
];

export default function Navbar() {
  const pathname = usePathname();

  const aktif = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-3 sm:flex-row">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={sekolah.logo}
            alt={`Logo ${sekolah.nama}`}
            width={40}
            height={40}
            unoptimized
          />
          <span className="text-lg font-bold text-blue-700">
            {sekolah.nama}
          </span>
        </Link>
        <div className="flex gap-1 text-sm font-medium">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 transition ${
                aktif(item.href)
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-blue-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}