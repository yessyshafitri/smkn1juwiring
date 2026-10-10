import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("public", { recursive: true });

const warna = ["#1d4ed8", "#7c3aed", "#059669", "#ea580c", "#db2777", "#0891b2"];

warna.forEach((w, i) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${w}"/><stop offset="1" stop-color="#0f172a"/>
</linearGradient></defs>
<rect width="100%" height="100%" fill="url(#g)"/>
<text x="50%" y="50%" fill="white" font-family="Arial" font-size="56" text-anchor="middle" dominant-baseline="middle">Foto Berita ${i + 1}</text>
</svg>`;
  writeFileSync(`public/berita${i + 1}.svg`, svg);
});

console.log("Selesai: 6 gambar berita dibuat di public/");