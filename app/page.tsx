export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-3xl text-center">
        <p className="mb-4 text-lime-300 uppercase tracking-[0.35em]">
          Virtuálny turistický chodník
        </p>

        <h1 className="text-6xl font-bold tracking-tight">
          Hubina
        </h1>

        <p className="mt-6 text-xl text-white/70">
          Moderný digitálny sprievodca po miestach, ktoré majú príbeh.
        </p>

        <button className="mt-8 rounded-full bg-lime-300 px-8 py-4 font-semibold text-black">
          Spustiť chodník
        </button>
      </div>
    </main>
  );
}