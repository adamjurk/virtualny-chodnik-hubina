import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminEditor } from "@/src/components/AdminEditor";
import { stops } from "@/src/data/hubina";

const cookieName = "hubina_admin";
const adminPassword = process.env.ADMIN_PASSWORD ?? "hubina-admin";

async function login(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");
  if (password !== adminPassword) {
    redirect("/adminrozhranie?chyba=heslo");
  }

  const store = await cookies();
  store.set(cookieName, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/adminrozhranie",
    maxAge: 60 * 60 * 8,
  });
  redirect("/adminrozhranie");
}

async function logout() {
  "use server";

  const store = await cookies();
  store.delete(cookieName);
  redirect("/adminrozhranie");
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ chyba?: string }>;
}) {
  const store = await cookies();
  const params = await searchParams;
  const loggedIn = store.get(cookieName)?.value === "1";

  if (!loggedIn) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#06110d] px-6 text-white">
        <form action={login} className="w-full max-w-sm border border-white/12 bg-[#0b1a14] p-6 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">Admin rozhranie</p>
          <h1 className="mt-4 text-3xl font-semibold">Prihlásenie</h1>
          <label className="mt-6 block text-sm font-semibold text-white/72" htmlFor="password">
            Heslo
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-2 w-full border border-white/12 bg-[#06110d] px-3 py-3 text-white outline-none focus:border-lime-300"
            autoComplete="current-password"
          />
          {params?.chyba ? <p className="mt-3 text-sm font-semibold text-red-300">Nesprávne heslo.</p> : null}
          <button type="submit" className="mt-6 min-h-11 w-full bg-lime-300 px-4 font-semibold text-[#07110d]">
            Vstúpiť
          </button>
        </form>
      </main>
    );
  }

  return <AdminEditor initialStops={stops} onLogout={logout} />;
}
