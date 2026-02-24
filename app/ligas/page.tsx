import Navbar from "@/components/layout/Navbar"
import Link from "next/link"
import LeagueFilter from "@/components/ui/filter"

export const dynamic = "force-dynamic"
export const revalidate = 0

type PageProps = {
  searchParams: Promise<{ league?: string }>
}

export default async function LigaPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const leagueId = sp.league ?? "71"
  
  const res = await fetch(
    `http://localhost:3000/api/football/standings?league=${leagueId}&season=2024`,
    { cache: "no-store" }
  )

  const data = await res.json()

  const league = data?.response?.[0]?.league
  const leagueName = league?.name ?? "Liga"
  const leagueLogo = league?.logo
  const season = league?.season ?? "2024"

  const standings =
    data?.response?.[0]?.league?.standings?.[0] ?? []

  return (
    <main className="bg-[#0B0F14] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-white">Ligas</h1>

        {/* 🔥 FILTRO REUTILIZÁVEL */}
        <LeagueFilter
          options={[
            { id: "71", name: "Série A" },
            { id: "72", name: "Série B" },
            { id: "39", name: "Premier League" },
          ]}
        />

        {/* Cabeçalho da Liga */}
        <div className="flex items-center gap-3 p-3">
          {leagueLogo && (
            <img src={leagueLogo} alt={leagueName} className="h-10 w-10" />
          )}
          <h2 className="text-2xl font-bold text-white">
            {leagueName} ({season})
          </h2>
        </div>

        {/* Tabela */}
        <div className="overflow-hidden rounded-xl border border-zinc-700">
          <table className="w-full text-sm">
            <thead className="bg-[#39FF14] text-black">
              <tr>
                <th className="p-3 text-left">Pos</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-center">PJ</th>
                <th className="p-3 text-center">V</th>
                <th className="p-3 text-center">E</th>
                <th className="p-3 text-center">D</th>
                <th className="p-3 text-center">SG</th>
                <th className="p-3 text-center">Pts</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {standings.map((row: any) => (
                <tr
                  key={row.team.id}
                  className="border-t border-zinc-700 hover:bg-zinc-800 transition"
                >
                  <td className="p-3">{row.rank}</td>

                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={row.team.logo}
                      alt={row.team.name}
                      className="h-5 w-5"
                    />
                    <Link href={`/dashboard/${row.team.id}?league=${leagueId}&season=2024`}>
                      {row.team.name}
                    </Link>
                  </td>

                  <td className="p-3 text-center">{row.all.played}</td>
                  <td className="p-3 text-center">{row.all.win}</td>
                  <td className="p-3 text-center">{row.all.draw}</td>
                  <td className="p-3 text-center">{row.all.lose}</td>
                  <td className="p-3 text-center">{row.goalsDiff}</td>
                  <td className="p-3 text-center font-bold">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}