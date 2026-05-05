"use client";

import { useEffect, useMemo, useState } from "react";
import type { Stop, StopType } from "@/src/data/hubina";

type Props = {
  initialStops: Stop[];
  onLogout: () => Promise<void>;
};

const storageKey = "hubina-admin-stops-v1";
const stopTypes: StopType[] = ["pribeh", "vyhlad", "priroda", "prakticke"];

export function AdminEditor({ initialStops, onLogout }: Props) {
  const [stops, setStops] = useState<Stop[]>(initialStops);
  const [selectedSlug, setSelectedSlug] = useState(initialStops[0]?.slug ?? "");
  const [saved, setSaved] = useState(false);
  const selected = useMemo(() => stops.find((stop) => stop.slug === selectedSlug) ?? stops[0], [selectedSlug, stops]);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Stop[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        queueMicrotask(() => {
          setStops(parsed);
          setSelectedSlug(parsed[0].slug);
        });
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  function updateSelected(update: Partial<Stop>) {
    setSaved(false);
    setStops((current) => current.map((stop) => (stop.slug === selected.slug ? { ...stop, ...update } : stop)));
  }

  function saveDraft() {
    window.localStorage.setItem(storageKey, JSON.stringify(stops, null, 2));
    setSaved(true);
  }

  function resetDraft() {
    window.localStorage.removeItem(storageKey);
    setStops(initialStops);
    setSelectedSlug(initialStops[0]?.slug ?? "");
    setSaved(false);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(stops, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hubina-body-zaujmu.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function importJson(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Stop[];
        if (!Array.isArray(parsed) || parsed.length === 0) return;
        setStops(parsed);
        setSelectedSlug(parsed[0].slug);
        setSaved(false);
      } catch {
        setSaved(false);
      }
    };
    reader.readAsText(file);
  }

  if (!selected) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#06110d] text-white">
      <header className="border-b border-white/10 bg-[#08140f] px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">Admin rozhranie</p>
            <h1 className="mt-2 text-3xl font-semibold">Body záujmu</h1>
          </div>
          <form action={onLogout}>
            <button className="border border-white/12 px-4 py-2 text-sm font-semibold text-white/72 hover:border-lime-300 hover:text-lime-200">
              Odhlásiť
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[320px_1fr]">
        <aside className="border border-white/10 bg-white/[0.04] p-3">
          <div className="grid gap-2">
            {stops
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((stop) => (
                <button
                  key={stop.slug}
                  className={`border px-3 py-3 text-left text-sm transition ${
                    stop.slug === selected.slug
                      ? "border-lime-300 bg-lime-300 text-[#07110d]"
                      : "border-white/10 bg-[#07110d]/40 text-white/76 hover:border-white/24"
                  }`}
                  onClick={() => setSelectedSlug(stop.slug)}
                >
                  <span className="block font-semibold">{stop.name}</span>
                  <span className="mt-1 block text-xs opacity-70">{stop.slug}</span>
                </button>
              ))}
          </div>
        </aside>

        <section className="border border-white/10 bg-white/[0.04] p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Názov">
              <input value={selected.name} onChange={(event) => updateSelected({ name: event.target.value })} className="input" />
            </Field>
            <Field label="Typ">
              <select value={selected.type} onChange={(event) => updateSelected({ type: event.target.value as StopType })} className="input">
                {stopTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Poradie">
              <input
                type="number"
                value={selected.order}
                onChange={(event) => updateSelected({ order: Number(event.target.value) || selected.order })}
                className="input"
              />
            </Field>
            <Field label="Slug">
              <input value={selected.slug} disabled className="input opacity-60" />
            </Field>
          </div>

          <Field label="Krátky popis">
            <textarea value={selected.shortDescription} onChange={(event) => updateSelected({ shortDescription: event.target.value })} className="input min-h-24" />
          </Field>

          <Field label="Texty príbehu, každý odsek na nový riadok">
            <textarea value={selected.story.join("\n")} onChange={(event) => updateSelected({ story: event.target.value.split("\n") })} className="input min-h-52" />
          </Field>

          <Field label="QR poznámka">
            <textarea value={selected.qrNote} onChange={(event) => updateSelected({ qrNote: event.target.value })} className="input min-h-24" />
          </Field>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={saveDraft} className="min-h-11 bg-lime-300 px-5 font-semibold text-[#07110d]">
              Uložiť pracovnú verziu
            </button>
            <button onClick={exportJson} className="min-h-11 border border-white/12 px-5 font-semibold text-white/76 hover:border-lime-300">
              Exportovať JSON
            </button>
            <label className="grid min-h-11 cursor-pointer place-items-center border border-white/12 px-5 font-semibold text-white/76 hover:border-lime-300">
              Importovať JSON
              <input type="file" accept="application/json" className="hidden" onChange={(event) => importJson(event.target.files?.[0])} />
            </label>
            <button onClick={resetDraft} className="min-h-11 border border-red-300/30 px-5 font-semibold text-red-200 hover:border-red-300">
              Zahodiť pracovnú verziu
            </button>
          </div>

          {saved ? <p className="mt-4 text-sm font-semibold text-lime-200">Pracovná verzia je uložená v tomto prehliadači.</p> : null}
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/50">
            Táto verzia zatiaľ ukladá rozpracované zmeny do tvojho prehliadača. Exportovaný JSON je pripravený na neskoršie napojenie na databázu alebo CMS, aby sa úpravy publikovali pre všetkých návštevníkov.
          </p>
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mt-4 block">
      <span className="mb-2 block text-sm font-semibold text-white/68">{label}</span>
      {children}
    </label>
  );
}
