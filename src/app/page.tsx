import Link from "next/link";
import Image from "next/image";
import { getStopsForRoute, routes, stops } from "@/src/data/hubina";

const stats = [
  { value: "10", label: "testových zastavení" },
  { value: "3", label: "navrhnuté okruhy" },
  { value: "17 km", label: "veľký okruh z podkladu" },
  { value: "QR", label: "priame stránky bodov" },
];

const heroImage = "/hubina-panorama.jpg";
const mapImage = "/hubina-map.webp";

const typeLabel = {
  pribeh: "Príbeh",
  vyhlad: "Výhľad",
  priroda: "Príroda",
  prakticke: "Praktické",
};

export default function Home() {
  const featuredRoute = routes[1];
  const featuredStops = getStopsForRoute(featuredRoute);

  return (
    <main className="min-h-screen overflow-hidden bg-[#06110d] text-white">
      <section className="relative isolate min-h-[92svh]">
        <div
          className="absolute inset-0 -z-10 bg-[#06110d] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,10,7,0.86)_0%,rgba(3,10,7,0.62)_42%,rgba(3,10,7,0.24)_100%),linear-gradient(180deg,rgba(3,10,7,0.08)_0%,rgba(6,17,13,0.46)_72%,#06110d_100%)]" />

        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
          <a href="#" className="text-sm font-semibold uppercase tracking-[0.18em] text-white/88">
            Hubina
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/72 sm:flex">
            <a className="transition hover:text-white" href="#okruhy">Okruhy</a>
            <a className="transition hover:text-white" href="#mapa">Mapa</a>
            <a className="transition hover:text-white" href="#zastavenia">Zastavenia</a>
          </nav>
        </header>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-20 lg:pt-14">
          <div>
            <p className="mb-7 inline-flex border-l-2 border-lime-300 pl-4 text-sm font-semibold uppercase tracking-[0.18em] text-lime-200">
              Virtuálny turistický chodník Hubina
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Hubina ako sieť okruhov
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Namiesto jednej dlhej trasy pripravujeme viac okruhov. Každé zastavenie bude
              mať vlastnú QR stránku, aby návštevník otvoril presne miesto, na ktorom stojí.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#okruhy"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-lime-300 px-7 text-base font-semibold text-[#07110d] shadow-[0_18px_52px_rgba(190,242,100,0.26)] transition hover:bg-lime-200"
              >
                Vybrať okruh
              </a>
              <a
                href="#zastavenia"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/8 px-7 text-base font-semibold text-white backdrop-blur transition hover:border-lime-300/45 hover:bg-white/12"
              >
                Pozrieť QR body
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur">
                  <p className="text-3xl font-semibold text-lime-200">{stat.value}</p>
                  <p className="mt-1 text-sm leading-5 text-white/62">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="mapa" className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="border border-white/12 bg-[#0b1a14]/88 p-4 shadow-2xl shadow-black/35 backdrop-blur">
              <div className="relative aspect-square overflow-hidden border border-lime-200/10 bg-[#102217]">
                <Image
                  src={mapImage}
                  alt="Turistická mapa okolia Hubiny"
                  fill
                  sizes="(min-width: 1024px) 46vw, (min-width: 640px) 560px, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#06110d]/10" />

                {featuredStops.map((stop) => (
                  <Link
                    key={stop.slug}
                    href={`/zastavenia/${stop.slug}`}
                    className="group absolute"
                    style={{
                      top: stop.mapPosition.top,
                      left: stop.mapPosition.left,
                      transform: `translate(calc(-50% + ${stop.markerOffset?.x ?? "0px"}), calc(-50% + ${stop.markerOffset?.y ?? "0px"}))`,
                    }}
                    aria-label={stop.name}
                  >
                    <span
                      className={`grid h-9 place-items-center rounded-full border-2 border-white bg-[#d61718] text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,0,0,0.42)] transition group-hover:scale-110 group-hover:bg-lime-300 group-hover:text-[#07110d] sm:h-10 ${
                        stop.markerLabel ? "min-w-16 px-3 text-xs" : "w-9 sm:w-10"
                      }`}
                    >
                      {stop.markerLabel ?? stop.order}
                    </span>
                    <span className="pointer-events-none absolute left-1/2 top-11 hidden w-44 -translate-x-1/2 border border-white/12 bg-[#07110d]/88 px-3 py-2 text-center text-xs font-semibold leading-4 text-white opacity-0 shadow-xl backdrop-blur transition group-hover:opacity-100 sm:block">
                      {stop.name}
                    </span>
                  </Link>
                ))}

              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="okruhy" className="border-y border-white/8 bg-[#08140f] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-300">Okruhy</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Krátke aj dlhšie možnosti trasy</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-white/62">
              Veľký okruh môže mať takmer 20 km, preto ho rozdelíme na menšie tematické časti.
              Návštevník si vyberie podľa času, náročnosti a nálady.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {routes.map((route) => (
              <article key={route.slug} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <p className="text-sm font-semibold text-lime-200">{route.subtitle}</p>
                <h3 className="mt-4 text-2xl font-semibold">{route.name}</h3>
                <p className="mt-4 min-h-24 text-sm leading-6 text-white/64">{route.description}</p>
                <div className="mt-6 grid grid-cols-3 gap-2 text-sm">
                  <span className="border border-white/10 px-3 py-2 text-white/68">{route.distance}</span>
                  <span className="border border-white/10 px-3 py-2 text-white/68">{route.duration}</span>
                  <span className="border border-white/10 px-3 py-2 text-white/68">{route.difficulty}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="zastavenia" className="bg-[#06110d] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-300">QR zastavenia</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Pracovné podstránky bodov</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-white/62">
              Každý bod má samostatnú URL pripravenú na QR kód. Texty sú zatiaľ pracovné a budeme ich nahrádzať reálnymi podkladmi.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {stops.map((stop) => (
              <Link
                key={stop.slug}
                href={`/zastavenia/${stop.slug}`}
                className="group rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-lime-300/35 hover:bg-white/[0.07]"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="text-sm font-semibold text-lime-200">{String(stop.order).padStart(2, "0")}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">{typeLabel[stop.type]}</span>
                </div>
                <h3 className="text-2xl font-semibold group-hover:text-lime-100">{stop.name}</h3>
                <p className="mt-4 text-sm leading-6 text-white/64">{stop.shortDescription}</p>
                <p className="mt-6 text-sm font-semibold text-lime-200">Otvoriť QR stránku</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-[#08140f] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-300">Ďalší krok</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Dopĺňanie bodov z terénu</h2>
            <p className="mt-5 text-base leading-8 text-white/66">
              Postupne môžeme pridať pramene, hostince, lavičky, parkovanie a ďalšie praktické body.
              Nie všetko musí mať veľký príbeh, ale na mape to návštevníkovi výrazne pomôže.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {["Príbeh", "Praktický bod", "Výhľad / príroda"].map((item, index) => (
              <div key={item} className="rounded-lg border border-lime-300/14 bg-lime-300/[0.055] p-6">
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-lg bg-lime-300 text-lg font-bold text-[#07110d]">{index + 1}</div>
                <h3 className="text-lg font-semibold">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Bod vieme zaradiť do jedného alebo viacerých okruhov a neskôr mu doplniť GPS, fotky a text.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 bg-[#050d09] px-6 py-10 text-sm text-white/56 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>Virtuálny turistický chodník Hubina</p>
          <p>Okruhy, QR zastavenia a praktické body v teréne.</p>
        </div>
      </footer>
    </main>
  );
}
