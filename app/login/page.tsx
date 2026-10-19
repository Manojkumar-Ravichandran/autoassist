"use client";

import { FormEvent, useState } from "react";
import { CarFront, LoaderCircle } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: form.get("username"), password: form.get("password") }) });
      if (!response.ok) throw new Error("Username or password is incorrect.");
      window.location.href = "/";
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to sign in."); setBusy(false); }
  }
  return <main className="grid min-h-screen place-items-center bg-slate-950 px-4"><div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"><div className="mb-8 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white"><CarFront /></div><div><h1 className="text-xl font-bold">AutoAssist</h1><p className="text-sm text-slate-500">Administrator sign in</p></div></div><form onSubmit={submit} className="space-y-5"><label className="block text-sm font-medium">Username<input name="username" autoComplete="username" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-blue-500" /></label><label className="block text-sm font-medium">Password<input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-blue-500" /></label>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}<button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-60">{busy && <LoaderCircle size={18} className="animate-spin" />}Sign in</button></form><p className="mt-6 text-xs text-slate-400">Administrator access only. <a className="text-blue-600" href="/download">Get the mobile app</a></p></div></main>;
}
