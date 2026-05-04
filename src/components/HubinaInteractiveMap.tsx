"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { PointerEvent, WheelEvent } from "react";
import type { Stop } from "@/src/data/hubina";

type Props = { apiKey: string; fallbackImage: string; stops: Stop[] };
type XY = { x: number; y: number };

const tileSize = 256;
const minZoom = 11;
const maxZoom = 15;
const startZoom = 13;
const startCenter = { lat: 48.6047, lon: 17.9256 };
const coords: Record<string, { lat: number; lon: number }> = {
  kostol: { lat: 48.61935689306381, lon: 17.881502126111847 },
  "krizova-cesta-kaplnka": { lat: 48.61979013348252, lon: 17.882127773706177 },
  skalka: { lat: 48.62356829181431, lon: 17.895208297886587 },
  "stary-kamenolom": { lat: 48.62600766451637, lon: 17.893442761853734 },
  grnica: { lat: 48.624812, lon: 17.916775 },
  "gonove-lazy": { lat: 48.620187, lon: 17.936702 },
  "rozhladna-marhat": { lat: 48.594683, lon: 17.970633 },
  "dolnosokolske-jaskyne": { lat: 48.595365, lon: 17.938949 },
  "pamatnik-vlada-plulika": { lat: 48.593992, lon: 17.940113 },
  "visiace-skaly": { lat: 48.582392, lon: 17.94681 },
};

function project(lat: number, lon: number, zoom: number): XY {
  const s = Math.sin((lat * Math.PI) / 180);
  const scale = tileSize * 2 ** zoom;
  return {
    x: ((lon + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * scale,
  };
}

function unproject(x: number, y: number, zoom: number) {
  const scale = tileSize * 2 ** zoom;
  const lon = (x / scale) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * y) / scale;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return { lat, lon };
}

function px(value?: string) {
  return value?.endsWith("px") ? Number(value.replace("px", "")) || 0 : 0;
}

export function HubinaInteractiveMap({ apiKey, fallbackImage, stops }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; start: XY; center: XY } | null>(null);
  const [zoom, setZoom] = useState(startZoom);
  const [center, setCenter] = useState(startCenter);
  const [size, setSize] = useState({ width: 560, height: 560 });
  const live = apiKey.trim().length > 0;
  const centerPoint = project(center.lat, center.lon, zoom);

  const route = stops
    .map((stop) => coords[stop.slug])
    .filter(Boolean)
    .map((point, index) => {
      const p = project(point.lat, point.lon, zoom);
      const x = p.x - centerPoint.x + size.width / 2;
      const y = p.y - centerPoint.y + size.height / 2;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const tiles = useMemo(() => {
    if (!live) return [];
    const minX = Math.floor((centerPoint.x - size.width / 2) / tileSize) - 1;
    const maxX = Math.floor((centerPoint.x + size.width / 2) / tileSize) + 1;
    const minY = Math.floor((centerPoint.y - size.height / 2) / tileSize) - 1;
    const maxY = Math.floor((centerPoint.y + size.height / 2) / tileSize) + 1;
    const maxTile = 2 ** zoom;
    const result = [];
    for (let x = minX; x <= maxX; x += 1) {
      for (let y = minY; y <= maxY; y += 1) {
        if (y >= 0 && y < maxTile) {
          const wx = ((x % maxTile) + maxTile) % maxTile;
          result.push({
            key: `${zoom}-${x}-${y}`,
            left: x * tileSize - centerPoint.x + size.width / 2,
            top: y * tileSize - centerPoint.y + size.height / 2,
            src: `https://api.mapy.com/v1/maptiles/outdoor/256/${zoom}/${wx}/${y}?apikey=${apiKey}`,
          });
        }
      }
    }
    return result;
  }, [apiKey, centerPoint.x, centerPoint.y, live, size.height, size.width, zoom]);

  function setBoxSize() {
    const rect = box.current?.getBoundingClientRect();
    if (rect) setSize({ width: rect.width, height: rect.height });
  }

  function changeZoom(next: number) {
    setZoom(Math.min(maxZoom, Math.max(minZoom, next)));
  }

  function onDown(event: PointerEvent<HTMLDivElement>) {
    if (!live) return;
    setBoxSize();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id: event.pointerId, start: { x: event.clientX, y: event.clientY }, center: centerPoint };
  }

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    setCenter(
      unproject(
        drag.current.center.x - (event.clientX - drag.current.start.x),
        drag.current.center.y - (event.clientY - drag.current.start.y),
        zoom,
      ),
    );
  }

  function onWheel(event: WheelEvent<HTMLDivElement>) {
    if (!live) return;
    event.preventDefault();
    setBoxSize();
    changeZoom(zoom + (event.deltaY < 0 ? 1 : -1));
  }

  return (
    <div
      ref={box}
      className="relative aspect-square overflow-hidden border border-lime-200/10 bg-[#102217] touch-none"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
      onWheel={onWheel}
    >
      {live ? (
        <>
          {tiles.map((tile) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={tile.key} src={tile.src} alt="" className="absolute h-64 w-64 select-none" draggable={false} style={{ left: tile.left, top: tile.top }} />
          ))}
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            <path d={route} fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            <path d={route} fill="none" stroke="#1754f0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14 10" />
          </svg>
          <div className="absolute left-3 top-3 flex overflow-hidden rounded-lg border border-white/14 bg-[#07110d]/86 shadow-xl backdrop-blur">
            <button type="button" className="grid h-10 w-10 place-items-center text-lg font-semibold" onClick={() => changeZoom(zoom + 1)}>+</button>
            <button type="button" className="grid h-10 w-10 place-items-center border-l border-white/12 text-xl font-semibold" onClick={() => changeZoom(zoom - 1)}>-</button>
            <button type="button" className="border-l border-white/12 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-lime-200" onClick={() => { setCenter(startCenter); setZoom(startZoom); }}>Trasa</button>
          </div>
          <p className="absolute bottom-2 right-2 bg-[#07110d]/78 px-2 py-1 text-[10px] text-white/70">(c) Mapy.com (c) OpenStreetMap</p>
        </>
      ) : (
        <>
          <Image src={fallbackImage} alt="Turisticka mapa okolia Hubiny" fill sizes="(min-width: 1024px) 46vw, (min-width: 640px) 560px, 92vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#06110d]/10" />
        </>
      )}

      {stops.map((stop) => {
        const c = coords[stop.slug] ?? startCenter;
        const p = project(c.lat, c.lon, zoom);
        const left = live ? p.x - centerPoint.x + size.width / 2 + px(stop.markerOffset?.x) : stop.mapPosition.left;
        const top = live ? p.y - centerPoint.y + size.height / 2 + px(stop.markerOffset?.y) : stop.mapPosition.top;
        return (
          <Link key={stop.slug} href={`/zastavenia/${stop.slug}`} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }} aria-label={stop.name}>
            <span className={`grid h-9 place-items-center rounded-full border-2 border-white bg-[#d61718] text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,0,0,0.42)] transition group-hover:scale-110 group-hover:bg-lime-300 group-hover:text-[#07110d] sm:h-10 ${stop.markerLabel ? "min-w-16 px-3 text-xs" : "w-9 sm:w-10"}`}>
              {stop.markerLabel ?? stop.order}
            </span>
            <span className="pointer-events-none absolute left-1/2 top-11 hidden w-44 -translate-x-1/2 border border-white/12 bg-[#07110d]/88 px-3 py-2 text-center text-xs font-semibold leading-4 text-white opacity-0 shadow-xl backdrop-blur transition group-hover:opacity-100 sm:block">
              {stop.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
