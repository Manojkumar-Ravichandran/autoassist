"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, CarFront, Download, Smartphone } from "lucide-react";

export default function DownloadPage() {
  const [apkReady, setApkReady] = useState(false);
  const [installable, setInstallable] = useState(false);
  useEffect(() => {
    fetch("/downloads/AutoAssist.apk", { method: "HEAD" }).then(r => setApkReady(r.ok)).catch(() => setApkReady(false));
    setInstallable(/Android/i.test(navigator.userAgent));
  }, []);
  return <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-12"><section className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl sm:p-9"><div className="mb-7 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white"><CarFront/></div><div><h1 className="text-xl font-bold">AutoAssist Mobile</h1><p className="text-sm text-slate-500">Vehicle service guide</p></div></div><h2 className="text-2xl font-bold">Get the mobile app</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Search vehicle records and read saved service details offline. Connect once to sync the latest master data.</p>
    {apkReady ? <a href="/downloads/AutoAssist.apk" download className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"><Download size={18}/> Download Android APK</a> : <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="font-semibold text-amber-900">Android APK is not published yet</p><p className="mt-1 text-sm leading-relaxed text-amber-800">Build a signed APK in Android Studio, then publish it as <code className="rounded bg-amber-100 px-1">public/downloads/AutoAssist.apk</code> and redeploy this site.</p></div>}
    {installable && <div className="mt-4 rounded-xl bg-slate-50 p-4"><p className="flex items-center gap-2 font-semibold"><Smartphone size={18}/> Install without an APK</p><p className="mt-1 text-sm text-slate-600">In Chrome, open the vehicle guide and choose <b>Install app</b> from the browser menu.</p><a href="/mobile" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">Open mobile guide <ArrowDownToLine size={16}/></a></div>}
    <p className="mt-6 text-xs leading-relaxed text-slate-400">For APK updates, publish the newly signed APK at the same download address. The app connects to this AutoAssist server for syncs; previously synced vehicle information remains on the device for offline lookup.</p></section></main>;
}
