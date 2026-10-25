"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login, useAdminStatus } from "@/lib/store";

const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none";

export default function LoginPage() {
  const router = useRouter();
  const status = useAdminStatus();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [proses, setProses] = useState(false);

  useEffect(() => {
    if (status === "masuk") router.replace("/admin");
  }, [status, router]);

  async function kirim(e) {
    e.preventDefault();
    setProses(true);
    setError("");
    const pesanError = await login(email, password);
    setProses(false);
    if (!pesanError) {
      router.push("/admin");
    } else {
      setError(pesanError);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-700">Login Admin</h1>
        <p className="mt-1 text-sm text-slate-500">
          Masuk untuk mengelola data website.
        </p>

        <form onSubmit={kirim} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className={input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className={input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={proses}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {proses ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}