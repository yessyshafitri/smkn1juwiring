"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { supabase } from "@/lib/supabase";
import { daftarBerita } from "@/data/sekolah";

// ---------- Berita (Supabase) ----------

let cache = null; // null = belum dimuat
const pendengar = new Set();

function subscribe(fn) {
  pendengar.add(fn);
  return () => pendengar.delete(fn);
}

function umumkan() {
  pendengar.forEach((fn) => fn());
}

async function muat() {
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .order("dibuat", { ascending: false });

  // Kalau database gagal atau masih kosong, pakai data awal dari sekolah.js
  cache = error || !data || data.length === 0 ? daftarBerita : data;
  umumkan();
}

export function useBerita() {
  const data = useSyncExternalStore(subscribe, () => cache, () => null);

  useEffect(() => {
    if (cache === null) muat();
  }, []);

  return data ?? [];
}

export function useBeritaTermuat() {
  return useSyncExternalStore(subscribe, () => cache !== null, () => false);
}

export async function tambahBerita(item) {
  const { error } = await supabase.from("berita").insert(item);
  if (error) throw error;
  await muat();
}

export async function ubahBerita(id, isian) {
  const { error } = await supabase.from("berita").update(isian).eq("id", id);
  if (error) throw error;
  await muat();
}

export async function hapusBerita(id) {
  const { error } = await supabase.from("berita").delete().eq("id", id);
  if (error) throw error;
  await muat();
}

// Mengisi tabel dengan 6 berita dari sekolah.js
export async function isiDataAwal() {
  const baris = daftarBerita.map((b, i) => ({
    ...b,
    dibuat: new Date(Date.now() - i * 1000).toISOString(),
  }));
  const { error } = await supabase.from("berita").upsert(baris);
  if (error) throw error;
  await muat();
}

// ---------- Login (Supabase Auth) ----------

// Mengembalikan null kalau berhasil, atau teks pesan error kalau gagal
export async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error ? error.message : null;
}

export async function logout() {
  await supabase.auth.signOut();
}

// Mengembalikan "memuat" | "masuk" | "keluar"
export function useAdminStatus() {
  const [status, setStatus] = useState("memuat");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? "masuk" : "keluar");
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "masuk" : "keluar");
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return status;
}

export function useSiap() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}