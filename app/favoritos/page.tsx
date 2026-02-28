import Navbar from "@/components/layout/Navbar"
import TeamsGrid from "./teams-grid"
import { LEAGUES } from "@/lib/leagues"

export default async function FavoritosPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

  const res = await fetch(`${baseUrl}/api/football/teams-by-league`, {
    cache: "no-store",
  })

  const data = await res.json()

  return (
    <main className="bg-[#0B0F14] min-h-screen text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-zinc-100">Favoritos</h1>
        <p className="mt-1 text-[#9CA3AF]">
          Aqui você pode selecionar seus clubes favoritos.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        {LEAGUES.map((league) => {
          const teams = (data?.[league.key] ?? []).map((x: any) => x.team)

          return (
            <section key={league.key}>
              <h2 className="text-xl font-semibold mb-4 text-[#39FF14]">
                {league.label} 2024
              </h2>

              <TeamsGrid teams={teams} />
            </section>
          )
        })}
      </div>
    </main>
  )
}