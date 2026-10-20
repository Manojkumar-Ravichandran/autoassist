"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CarFront, Cloud, CloudOff, Search, Settings2, Wrench } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";

declare global {
  interface Window { __AUTOASSIST_API_BASE__?: string }
}

const CACHE = "autoassist-vehicle-cache-v1";
const title = (key: string) => key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());
function value(v: unknown) { return String(v || "").trim() || "Not specified"; }

export default function MobileApp() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [online, setOnline] = useState(true);
  const [syncedAt, setSyncedAt] = useState("");
  const [syncError, setSyncError] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setOnline(navigator.onLine);
    const cached = localStorage.getItem(CACHE);
    if (cached) { try { const parsed = JSON.parse(cached); setVehicles(parsed.vehicles || []); setSyncedAt(parsed.syncedAt || ""); } catch { localStorage.removeItem(CACHE); } }
    setReady(true);
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update); window.addEventListener("offline", update);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); };
  }, []);
  useEffect(() => {
    if (!online) return;
    let cancelled = false;
    const controller = new AbortController();
    setSyncing(true);
    setSyncError("");
    const base = (window.__AUTOASSIST_API_BASE__ || "").replace(/\/$/, "");
    fetch(`${base}/api/mobile/vehicles`, { signal: controller.signal, cache: "no-store" })
      .then(async response => {
        const json = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(json.message || `Server returned HTTP ${response.status}`);
        if (!Array.isArray(json.data)) throw new Error("The server returned an unexpected vehicle-data response");
        return json;
      })
      .then(json => {
        if (cancelled) return;
        const stamp = json.syncedAt || new Date().toISOString();
        setVehicles(json.data);
        setSyncedAt(stamp);
        localStorage.setItem(CACHE, JSON.stringify({ vehicles: json.data, syncedAt: stamp }));
      })
      .catch(error => {
        if (!cancelled && error.name !== "AbortError") setSyncError(error.message || "Could not connect to the AutoAssist server");
      })
      .finally(() => { if (!cancelled) setSyncing(false); });
    return () => { cancelled = true; controller.abort(); };
  }, [online, retryCount]);
  const results = useMemo(() => { const q = query.trim().toLowerCase(); if (!q) return []; return vehicles.filter(v => [v.brand, v.model, v.variant, v.engineCode, v.fuelType, v.productionYear].join(" ").toLowerCase().includes(q)).slice(0, 30); }, [vehicles, query]);
  if (!ready) return <main className="min-h-screen bg-slate-950" />;
  return <main className="min-h-screen bg-[#f4f6fa] text-slate-900">
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 pb-4 pt-[max(env(safe-area-inset-top),1rem)] backdrop-blur"><div className="mx-auto max-w-xl"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"><CarFront size={22}/></div><div><h1 className="font-bold">AutoAssist</h1><p className="text-xs text-slate-500">Vehicle service guide</p></div></div><span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${online ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{online ? <Cloud size={14}/> : <CloudOff size={14}/>} {online ? "Online" : "Offline"}</span></div>
    {!selected && <label className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"><Search size={20} className="shrink-0 text-slate-400"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search make, model, engine…" className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"/><span className="text-xs text-slate-400">{vehicles.length}</span></label>}</div></header>
    <div className="mx-auto max-w-xl px-4 pb-10 pt-5">
      {!selected && syncError && <div role="alert" className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"><p className="font-semibold">Could not sync cloud vehicle data</p><p className="mt-1 break-words">{syncError}</p><button onClick={() => setRetryCount(value => value + 1)} className="mt-3 rounded-lg bg-rose-700 px-3 py-2 font-semibold text-white">Retry sync</button>{vehicles.length > 0 && <p className="mt-2 text-xs">Showing {vehicles.length} previously synced records saved on this device.</p>}</div>}
      {!selected && syncing && <p className="mb-3 text-center text-xs text-slate-500">Syncing vehicle data from cloud…</p>}
      {selected ? <><button onClick={() => setSelected(null)} className="mb-4 flex items-center gap-2 py-2 text-sm font-semibold text-blue-700"><ArrowLeft size={18}/> Back to search</button><section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white"><div className="flex items-start justify-between"><div><p className="text-xs font-medium uppercase tracking-wider text-slate-300">{selected.brand} · {selected.productionYear || "Year n/a"}</p><h2 className="mt-1 text-2xl font-bold leading-tight">{selected.model}</h2><p className="mt-1 text-slate-300">{selected.variant || "Standard variant"}</p></div><CarFront size={32} className="text-blue-300"/></div><div className="mt-4 flex flex-wrap gap-2">{[selected.engineCode, selected.engineCapacity, selected.fuelType, selected.transmission].filter(Boolean).map((x,i)=><span key={i} className="rounded-lg bg-white/10 px-2.5 py-1.5 text-xs">{x}</span>)}</div></div>
      <section className="border-b border-slate-100 p-4"><h3 className="mb-3 flex items-center gap-2 font-bold"><Settings2 size={18} className="text-blue-600"/> Technical specifications</h3><Grid data={selected.technicalSpecifications}/></section>
      <section className="border-b border-slate-100 p-4"><h3 className="mb-3 flex items-center gap-2 font-bold"><Wrench size={18} className="text-blue-600"/> Filters & parts</h3><Grid data={selected.filtersAndParts}/></section>
      <section className="border-b border-slate-100 p-4"><h3 className="mb-3 font-bold">Periodic maintenance schedule</h3>{selected.pmsSchedule?.length ? <div className="space-y-3">{selected.pmsSchedule.map(p => <article key={p.interval} className="rounded-xl bg-slate-50 p-3"><h4 className="font-semibold text-blue-800">{p.interval.toLocaleString()} km service</h4>{p.serviceItems?.length ? <ul className="mt-2 space-y-2">{p.serviceItems.map((item,i)=><li key={item._id||i} className="border-t border-slate-200 pt-2"><div className="flex justify-between gap-2 text-sm font-medium"><span>{item.serviceName}</span><span className="shrink-0 text-xs text-slate-500">{item.replacementRequired === "yes" ? "Replace" : "Inspect"}</span></div>{item.notes && <p className="mt-1 whitespace-pre-wrap text-xs text-slate-600">{item.notes}</p>}</li>)}</ul> : <p className="mt-1 text-sm text-slate-500">No service items configured.</p>}</article>)}</div> : <p className="text-sm text-slate-500">No schedule available.</p>}</section>
      <section className="p-4"><h3 className="mb-3 font-bold">Workshop notes</h3><div className="space-y-3">{Object.entries(selected.additionalNotes || {}).map(([k,v]) => <div key={k}><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title(k)}</p><p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{value(v)}</p></div>)}</div></section></section></> : <>
        {!query.trim() ? <div className="py-12 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue-600"><Search size={27}/></div><h2 className="mt-4 text-lg font-bold">Find a vehicle</h2><p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500">Enter the make, model, variant or engine code to view its complete service information.</p><p className="mt-6 text-xs text-slate-400">{vehicles.length} vehicle records available on this device</p></div> : <><p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{results.length} matching {results.length === 1 ? "vehicle" : "vehicles"}</p>{results.length ? <div className="space-y-2">{results.map(v=><button key={v._id} onClick={()=>setSelected(v)} className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm active:scale-[.99]"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500"><CarFront/></div><div className="min-w-0 flex-1"><p className="truncate font-bold">{v.brand} {v.model}</p><p className="mt-1 truncate text-sm text-slate-500">{[v.variant, v.productionYear, v.engineCode].filter(Boolean).join(" · ")}</p><p className="mt-1 text-xs text-slate-400">{[v.fuelType, v.transmission].filter(Boolean).join(" · ")}</p></div><span className="text-xl text-slate-300">›</span></button>)}</div> : <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500">No matching vehicle. Try a make, model or engine code.</div>}</>}
      </>}
      <p className="mt-8 text-center text-[11px] text-slate-400">{syncedAt ? `Last synced ${new Date(syncedAt).toLocaleString()}` : "Vehicle data syncs when connected"}</p>
    </div></main>;
}

function Grid({data}: {data: Record<string,string>}) { return <div className="grid grid-cols-2 gap-2">{Object.entries(data || {}).map(([k,v])=><div key={k} className="rounded-xl bg-slate-50 p-3"><p className="text-[11px] leading-snug text-slate-500">{title(k)}</p><p className="mt-1 whitespace-pre-wrap break-words text-sm font-semibold leading-snug">{value(v)}</p></div>)}</div>; }
