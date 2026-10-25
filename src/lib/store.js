"use client";

import { useMemo, useSyncExternalStore } from "react";
import { daftarBerita } from "@/data/sekolah";

// Akun demo. Siapa pun bisa membaca ini, jadi hanya untuk latihan.
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

const BERITA_KEY = "smkn1-berita";
const AUTH_KEY = "smkn1-admin";
const EVENT = "smkn1-store-berubah";

function subscribe(callback) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function beritikan() {
  window.dispatchEvent(new Event(EVENT));
}

// ---------- Berita ----------

export function simpanBerita(daftar) {
  try {
    localStorage.setItem(BERITA_KEY, JSON.stringify(daftar));
  } catch {}
  beritikan();
}

export function resetBerita() {
  try {
    localStorage.removeItem(BERITA_KEY);
  } catch {}
  beritikan();
}

const ambilMentah = () => {
  try {
    return localStorage.getItem(BERITA_KEY);
  } catch {
    return null;
  }
};

export function useBerita() {
  const mentah = useSyncExternalStore(subscribe, ambilMentah, () => null);

  return useMemo(() => {
    if (mentah) {
      try {
        return JSON.parse(mentah);
      } catch {}
    }
    return daftarBerita;
  }, [mentah]);
}

// ---------- Login ----------

export function login(username, password) {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    try {
      localStorage.setItem(AUTH_KEY, "1");
    } catch {}
    beritikan();
    return true;
  }
  return false;
}

export function logout() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {}
  beritikan();
}

const ambilStatus = () => {
  try {
    return localStorage.getItem(AUTH_KEY) === "1" ? "masuk" : "keluar";
  } catch {
    return "keluar";
  }
};

// Mengembalikan "memuat" | "masuk" | "keluar"
export function useAdminStatus() {
  return useSyncExternalStore(subscribe, ambilStatus, () => "memuat");
}

// false di server dan saat hidrasi, true setelah halaman siap di browser
export function useSiap() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}