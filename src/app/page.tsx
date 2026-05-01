const stats = [
  { value: "12", label: "zastavení" },
  { value: "3", label: "tematické okruhy" },
  { value: "2 h", label: "pokojná prechádzka" },
  { value: "QR", label: "obsah v mobile" },
];

const places = [
  {
    name: "Skalka",
    description: "Výhľad nad obcou, kde sa krajina otvára do zelených vrstiev Považského Inovca.",
    meta: "Panoráma",
  },
  {
    name: "Stará cesta",
    description: "Historická línia pohybu medzi domami, sadmi a poľnými okrajmi Hubiny.",
    meta: "Trasa",
  },
  {
    name: "Drevo na voze",
    description: "Spomienka na prácu, remeslo a každodenný rytmus staršej dediny.",
    meta: "Tradícia",
  },
  {
    name: "Kostol a centrum",
    description: "Prirodzené srdce obce s miestami, ktoré držia komunitu a príbehy pokope.",
    meta: "Obec",
  },
];

const routePoints = [
  { top: "18%", left: "20%", label: "Štart" },
  { top: "32%", left: "46%", label: "Výhľad" },
  { top: "48%", left: "68%", label: "Príbeh" },
  { top: "66%", left: "42%", label: "Oddych" },
  { top: "78%", left: "76%", label: "Cieľ" },
];

const steps = [
  "Naskenujte kód",
  "Otvorte príbeh",
  "Pokračujte trasou",
];

const heroImage = "/hubina-panorama.jpg";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#06110d] text-white">
      <section className="relative isolate min-h-[92svh]">
        <div
          className="absolute inset-0 -z-10 bg-[#06110d] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,10,7,0.84)_0%,rgba(3,10,7,0.58)_43%,rgba(3,10,7,0.18)_100%),linear-gradient(180deg,rgba(3,10,7,0.06)_0%,rgba(6,17,13,0.42)_72%,#06110d_100%)]" />

        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
          <a href="#" className="text-sm font-semibold uppercase tracking-[0.18em] text-white/88">
            Hubina
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/72 sm:flex">
            <a className="transition hover:text-white" href="#trasa">
              Trasa
            </a>
            <a className="transition hover:text-white" href="#miesta">
              Miesta
            </a>
            <a className="transition hover:text-white" href="#qr">
              QR chodník
            </a>
          </nav>
        </header>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-20 lg:pt-14">
          <div>
            <p className="mb-7 inline-flex border-l-2 border-lime-300 pl-4 text-sm font-semibold uppercase tracking-[0.18em] text-lime-200">
              Virtuálny turistický chodník Hubina
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Objavte Hubinu inak
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Digitálny sprievodca prepája prírodu, históriu a lokálne príbehy do pokojnej
              prechádzky, ktorú spustíte priamo v mobile.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#trasa"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-lime-300 px-7 text-base font-semibold text-[#07110d] shadow-[0_18px_52px_rgba(190,242,100,0.26)] transition hover:bg-lime-200"
              >
                Spustiť chodník
              </a>
              <a
                href="#miesta"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/8 px-7 text-base font-semibold text-white backdrop-blur transition hover:border-lime-300/45 hover:bg-white/12"
              >
                Pozrieť zastavenia
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-lime-200">{stat.value}</p>
                  <p className="mt-1 text-sm leading-5 text-white/62">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="trasa" className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="border border-white/12 bg-[#0b1a14]/88 p-4 shadow-2xl shadow-black/35 backdrop-blur">
              <div className="relative aspect-[4/5] overflow-hidden border border-lime-200/10 bg-[linear-gradient(145deg,rgba(15,36,27,0.96),rgba(8,19,15,0.98))] sm:aspect-[5/4] lg:aspect-[4/5]">
                <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:46px_46px]" />
                <div className="absolute left-[14%] top-[16%] h-[70%] w-[64%] rounded-[45%] border border-lime-300/20" />
                <div className="absolute left-[20%] top-[18%] h-[58%] w-[58%] rotate-12 rounded-[48%] border border-cyan-200/14" />
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M20 18 C32 22 36 28 46 32 C61 38 72 42 68 48 C62 58 49 56 42 66 C36 75 60 74 76 78"
                    fill="none"
                    stroke="rgba(190,242,100,0.72)"
                    strokeDasharray="2 3"
                    strokeLinecap="round"
                    strokeWidth="0.8"
                  />
                </svg>

                {routePoints.map((point, index) => (
                  <div
                    key={point.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: point.top, left: point.left }}
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-lime-200/50 bg-[#13261c] shadow-[0_0_32px_rgba(190,242,100,0.24)]">
                      <span className="h-3 w-3 rounded-full bg-lime-300" />
                    </div>
                    <span className="absolute left-7 top-7 text-xs font-semibold text-lime-100/86">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}

                <div className="absolute bottom-4 left-4 right-4 border border-white/10 bg-black/38 p-4 backdrop-blur-md">
                  <p className="text-sm font-medium text-lime-200">Náhľad trasy</p>
                  <p className="mt-1 text-2xl font-semibold">Hubina v 12 zastaveniach</p>
                  <p className="mt-2 text-sm leading-6 text-white/64">
                    Vizuálna mapa pripravovaného chodníka s bodmi pre QR obsah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="miesta" className="border-y border-white/8 bg-[#08140f] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-300">
                Miesta na trase
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Zastavenia s atmosférou obce
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-white/62">
              Každý bod je navrhnutý ako krátky digitálny príbeh, ktorý sa dá prečítať
              priamo počas prechádzky.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {places.map((place, index) => (
              <article
                key={place.name}
                className="group rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-lime-300/35 hover:bg-white/[0.07]"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="text-sm font-semibold text-lime-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                    {place.meta}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold">{place.name}</h3>
                <p className="mt-4 text-sm leading-6 text-white/64">{place.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="qr" className="bg-[#06110d] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-300">
              QR chodník
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Príbehy sa otvoria na mieste
            </h2>
            <p className="mt-5 text-base leading-8 text-white/66">
              Na vybraných miestach návštevník naskenuje QR kód a okamžite získava text,
              fotografie a kontext k danému zastaveniu. Chodník tak funguje bez ťažkých
              tabúľ a prirodzene dopĺňa krajinu.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-lg border border-lime-300/14 bg-lime-300/[0.055] p-6"
              >
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-lg bg-lime-300 text-lg font-bold text-[#07110d]">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{step}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Jednoduchý mobilný zážitok pripravený pre turistov, rodiny aj domácich.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 bg-[#050d09] px-6 py-10 text-sm text-white/56 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>Virtuálny turistický chodník Hubina</p>
          <p>Príroda, história a príbehy obce v mobile.</p>
        </div>
      </footer>
    </main>
  );
}
