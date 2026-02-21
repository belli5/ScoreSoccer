import Navbar from "@/components/layout/Navbar"
import TeamsGrid from "./teams-grid"

export default async function FavoritosPage() {
  const res = await fetch(
    "http://localhost:3000/api/football/teams-by-league",
    { cache: "no-store" }
  )

  const data = await res.json()

  const serieA = (data?.serieA ?? []).map((x: any) => x.team)
  const serieB = (data?.serieB ?? []).map((x: any) => x.team)
  const premier = (data?.premier ?? []).map((x: any) => x.team)

  return (
    <main className="bg-[#0B0F14] min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-zinc-100">Favoritos</h1>
            <p className="mt-1 text-[#9CA3AF]">Aqui você pode selecionar seus clubes favoritos.</p>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
            
            {/* 🔥 Série A */}
            <section>
                <h2 className="text-xl font-semibold mb-4 text-[#39FF14]">
                    Série A 2024
                </h2>
                <TeamsGrid teams={serieA} />
                </section>

                {/* 🔥 Série B */}
                <section>
                <h2 className="text-xl font-semibold mb-4 text-[#39FF14]">
                    Série B 2024
                </h2>
                <TeamsGrid teams={serieB} />
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-[#39FF14]">
                    Premier League 2024
                </h2>
                <TeamsGrid teams={premier} />
            </section>
        </div>
    </main>
  )
}