import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoute, getStop, stops } from "@/src/data/hubina";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const typeLabel = {
  pribeh: "Príbehové zastavenie",
  vyhlad: "Výhľadové zastavenie",
  priroda: "Prírodné zastavenie",
  prakticke: "Praktický bod",
};

export function generateStaticParams() {
  return stops.map((stop) => ({
    slug: stop.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const stop = getStop(slug);

  if (!stop) {
    return {
      title: "Zastavenie nenájdené | Hubina",
    };
  }

  return {
    title: `${stop.name} | Virtuálny chodník Hubina`,
    description: stop.shortDescription,
  };
}

export default async function StopPage({ params }: PageProps) {
  const { slug } = await params;
  const stop = getStop(slug);

  if (!stop) {
    notFound();
  }

  const route = getRoute(stop.routeSlug);
  const nextStop = stops.find((item) => item.order === stop.order + 1);
  const previousStop = stops.find((item) => item.order === stop.order - 1);

  return (
    <main className="min-h-screen bg-[#06110d] text-white">
      <section className="border-b border-white/8 bg-[#08140f] px-6 py-6 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <Link href="/#zastavenia" className="text-sm font-semibold text-lime-200 hover:text-lime-100">
            Späť na chodník
          </Link>
          <span className="text-sm text-white/54">QR zastavenie {String(stop.order).padStart(2, "0")}</span>
        </div>
      </section>

      <article className="px-6 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-300">
            {typeLabel[stop.type]}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {stop.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            {stop.shortDescription}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <p className="text-sm text-white/54">Okruh</p>
              <p className="mt-1 font-semibold text-lime-100">{route?.name ?? "Pracovný okruh"}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <p className="text-sm text-white/54">Stav obsahu</p>
              <p className="mt-1 font-semibold text-lime-100">Testovací text</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <p className="text-sm text-white/54">Použitie</p>
              <p className="mt-1 font-semibold text-lime-100">QR kód na mieste</p>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_17rem]">
            <div className="space-y-6 text-base leading-8 text-white/72">
              {stop.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-lime-300/16 bg-lime-300/[0.055] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-200">
                Poznámka ku QR
              </p>
              <p className="mt-4 text-sm leading-6 text-white/68">{stop.qrNote}</p>
            </aside>
          </div>

          <nav className="mt-14 grid gap-3 border-t border-white/8 pt-8 sm:grid-cols-2">
            {previousStop ? (
              <Link
                href={`/zastavenia/${previousStop.slug}`}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-4 transition hover:border-lime-300/35"
              >
                <span className="text-sm text-white/54">Predchádzajúce</span>
                <p className="mt-1 font-semibold text-lime-100">{previousStop.name}</p>
              </Link>
            ) : (
              <Link
                href="/#okruhy"
                className="rounded-lg border border-white/10 bg-white/[0.045] p-4 transition hover:border-lime-300/35"
              >
                <span className="text-sm text-white/54">Začiatok</span>
                <p className="mt-1 font-semibold text-lime-100">Vybrať okruh</p>
              </Link>
            )}

            {nextStop ? (
              <Link
                href={`/zastavenia/${nextStop.slug}`}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-4 text-right transition hover:border-lime-300/35"
              >
                <span className="text-sm text-white/54">Ďalšie</span>
                <p className="mt-1 font-semibold text-lime-100">{nextStop.name}</p>
              </Link>
            ) : (
              <Link
                href="/#zastavenia"
                className="rounded-lg border border-white/10 bg-white/[0.045] p-4 text-right transition hover:border-lime-300/35"
              >
                <span className="text-sm text-white/54">Koniec testu</span>
                <p className="mt-1 font-semibold text-lime-100">Všetky zastavenia</p>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </main>
  );
}
