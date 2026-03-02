import Navbar from "@/components/layout/Navbar"
import Link from "next/link"
import LeagueFilter from "@/components/ui/filter"
import { LEAGUES } from "@/lib/leagues"

export const dynamic = "force-dynamic"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

type PageProps = {
  searchParams: Promise<{ league?: string }>
}

export default async function LigaPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const leagueId = sp.league ?? LEAGUES[0].id
  const season = "2024"

  const res = await fetch(
    `${baseUrl}/api/football/standings?league=${leagueId}&season=${season}`,
    { next: { revalidate: 600 } }
  )
  const data = await res.json()

  const league = data?.response?.[0]?.league
  const leagueName = league?.name ?? "Liga"
  const leagueLogo = league?.logo

  const standings = data?.response?.[0]?.league?.standings?.[0] ?? []

  return (
    <main className="bg-[#0B0F14] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-white">Ligas</h1>

        <LeagueFilter options={LEAGUES.map((l) => ({ id: l.id, name: l.label }))} />

        {/* Cabeçalho da Liga */}
        <div className="flex items-center gap-3 p-3">
          {leagueLogo && <img src={leagueLogo} alt={leagueName} className="h-10 w-10" />}
          <h2 className="text-2xl font-bold text-white">
            {leagueName} ({season})
          </h2>
        </div>

        {/* Tabela */}
        <div className="rounded-xl border border-zinc-700 overflow-hidden">
          <div className="w-full overflow-x-auto md:overflow-visible">
            <table className="w-full text-sm md:min-w-0">
              <thead className="bg-[#39FF14] text-black">
                <tr>
                  <th className="p-3 text-left whitespace-nowrap">Pos</th>
                  <th className="p-3 text-left whitespace-nowrap">Time</th>

                  {/* ✅ Mobile: só SG e Pts */}
                  <th className="p-3 text-center whitespace-nowrap md:hidden">SG</th>
                  <th className="p-3 text-center whitespace-nowrap md:hidden">Pts</th>

                  {/* ✅ Desktop: tabela completa */}
                  <th className="hidden md:table-cell p-3 text-center whitespace-nowrap">PJ</th>
                  <th className="hidden md:table-cell p-3 text-center whitespace-nowrap">V</th>
                  <th className="hidden md:table-cell p-3 text-center whitespace-nowrap">E</th>
                  <th className="hidden md:table-cell p-3 text-center whitespace-nowrap">D</th>
                  <th className="hidden md:table-cell p-3 text-center whitespace-nowrap">SG</th>
                  <th className="hidden md:table-cell p-3 text-center whitespace-nowrap">Pts</th>
                </tr>
              </thead>

              <tbody className="text-white">
                {standings.map((row: any) => (
                  <tr
                    key={row.team.id}
                    className="border-t border-zinc-700 hover:bg-zinc-800 transition"
                  >
                    <td className="p-3 whitespace-nowrap">{row.rank}</td>

                    {/* Time (sempre) */}
                    <td className="p-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={row.team.logo}
                          alt={row.team.name}
                          className="h-5 w-5 shrink-0"
                        />
                        <Link
                          href={`/dashboard/${row.team.id}?league=${leagueId}&season=${season}`}
                          className="min-w-0 truncate hover:underline underline-offset-4"
                          title={row.team.name}
                        >
                          {row.team.name}
                        </Link>
                      </div>
                    </td>

                    {/* ✅ Mobile: SG e Pts na “tabela” */}
                    <td className="p-3 text-center whitespace-nowrap md:hidden">
                      {row.goalsDiff}
                    </td>
                    <td className="p-3 text-center font-bold whitespace-nowrap md:hidden">
                      {row.points}
                    </td>

                    {/* ✅ Desktop: tabela completa */}
                    <td className="hidden md:table-cell p-3 text-center whitespace-nowrap">
                      {row.all.played}
                    </td>
                    <td className="hidden md:table-cell p-3 text-center whitespace-nowrap">
                      {row.all.win}
                    </td>
                    <td className="hidden md:table-cell p-3 text-center whitespace-nowrap">
                      {row.all.draw}
                    </td>
                    <td className="hidden md:table-cell p-3 text-center whitespace-nowrap">
                      {row.all.lose}
                    </td>
                    <td className="hidden md:table-cell p-3 text-center whitespace-nowrap">
                      {row.goalsDiff}
                    </td>
                    <td className="hidden md:table-cell p-3 text-center font-bold whitespace-nowrap">
                      {row.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}