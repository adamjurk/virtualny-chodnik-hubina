const stats = [
  { value: "12", label: "bodov" },
  { value: "3", label: "trasy" },
  { value: "2 h", label: "prechádzka" },
  { value: "QR", label: "miesta" },
];

const places = [
  {
    name: "Skalka",
    description: "Výhľad nad obcou, kde sa krajina otvára do tichých zelených vrstiev.",
    meta: "Panoráma",
  },
  {
    name: "Stará cesta",
    description: "Historická línia pohybu medzi domami, sadmi a poľnými okrajmi.",
    meta: "Príbeh trasy",
  },
  {
    name: "Drevo na voze",
    description: "Spomienka na prácu, remeslo a každodenný rytmus staršej Hubiny.",
    meta: "Tradícia",
  },
  {
    name: "Kostol a centrum obce",
    description: "Prirodzené srdce Hubiny s miestami, ktoré držia komunitu pokope.",
    meta: "Centrum",
  },
];

const routePoints = [
  { top: "18%", left: "20%" },
  { top: "32%", left: "46%" },
  { top: "48%", left: "68%" },
  { top: "66%", left: "42%" },
  { top: "78%", left: "76%" },
];

const heroImage = "/hubina-panorama.jpg";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#06110d] text-white">
      <section className="relative isolate">
        <div
          className="absolute inset-0 -z-10 bg-[#06110d] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,10,7,0.94)_0%,rgba(3,10,7,0.82)_38%,rgba(3,10,7,0.46)_100%),linear-gradient(180deg,rgba(3,10,7,0.28)_0%,rgba(6,17,13,0.72)_70%,#06110d_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.22),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(20,184,166,0.12),transparent_28%)]" />

        <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 py-10 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10">
          <div className="pt-10 lg:pt-0">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-lime-300/20 bg-white/5 px-4 py-2 text-sm font-medium text-lime-200 shadow-2xl shadow-lime-950/30 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_24px_rgba(190,242,100,0.9)]" />
              Virtuálny turistický chodník Hubina
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Objavte Hubinu inak
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              Moderný digitálny sprievodca prepája prírodu, históriu a lokálne príbehy
              do pokojnej prechádzky, ktorú spustíte priamo v mobile.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#body"
                className="inline-flex items-center justify-center rounded-full bg-lime-300 px-7 py-4 text-base font-semibold text-[#07110d] shadow-[0_18px_60px_rgba(190,242,100,0.28)] transition hover:bg-lime-200"
              >
                Spustiť chodník
              </a>
              <a
                href="#mapa"
                className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/6 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:border-lime-300/45 hover:bg-white/10"
              >
                Zobraziť mapu
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-lime-200">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/58">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="mapa" className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-lime-300/10 blur-3xl" />
            <div className="rounded-[2rem] border border-white/12 bg-[#0b1a14]/80 p-4 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-lime-200/10 bg-[linear-gradient(145deg,rgba(15,36,27,0.96),rgba(8,19,15,0.98))] sm:aspect-[5/4] lg:aspect-[4/5]">
                <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:46px_46px]" />
                <div className="absolute left-[14%] top-[16%] h-[70%] w-[64%] rounded-[45%] border border-lime-300/20" />
                <div className="absolute left-[20%] top-[18%] h-[58%] w-[58%] rotate-12 rounded-[48%] border border-emerald-300/12" />
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
                    key={`${point.top}-${point.left}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: point.top, left: point.left }}
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-lime-200/50 bg-[#13261c] shadow-[0_0_32px_rgba(190,242,100,0.28)]">
                      <span className="h-3 w-3 rounded-full bg-lime-300" />
                    </div>
                    <span className="absolute left-7 top-7 text-xs font-semibold text-lime-100/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/36 p-4 backdrop-blur-md">
                  <p className="text-sm font-medium text-lime-200">Náhľad trasy</p>
                  <p className="mt-1 text-2xl font-semibold">Hubina v 12 zastaveniach</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    Vizuálna mapa pripravovaného chodníka s bodmi pre QR obsah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="body" className="border-y border-white/8 bg-[#08140f] px-6 py-20 sm:px-8 lg:px-10">
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
            <p className="max-w-xl text-base leading-7 text-white/58">
              Každý bod je navrhnutý ako krátky digitálny príbeh, ktorý sa dá prečítať
              priamo počas prechádzky.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {places.map((place, index) => (
              <article
                key={place.name}
                className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-lime-300/35 hover:bg-white/[0.07]"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="text-sm font-semibold text-lime-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">
                    {place.meta}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold">{place.name}</h3>
                <p className="mt-4 text-sm leading-6 text-white/60">{place.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#06110d] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-300">
              QR chodník
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Príbehy sa otvoria na mieste
            </h2>
            <p className="mt-5 text-base leading-8 text-white/62">
              Na vybraných miestach návštevník naskenuje QR kód a okamžite získava
              text, fotografie a kontext k danému zastaveniu. Chodník tak funguje bez
              ťažkých tabúľ a prirodzene dopĺňa krajinu.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {["Naskenujte kód", "Otvorte príbeh", "Pokračujte trasou"].map((step, index) => (
              <div
                key={step}
                className="rounded-3xl border border-lime-300/14 bg-lime-300/[0.055] p-6"
              >
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-lime-300 text-lg font-bold text-[#07110d]">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{step}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Jednoduchý mobilný zážitok pripravený pre turistov, rodiny aj domácich.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
