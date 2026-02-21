import Navbar from "@/components/layout/Navbar"
import Link from "next/link"

type TeamRow = {
  rank: number
  points: number
  goalsDiff: number
  team: {
    id: number
    name: string
    logo: string
  }
  all: {
    played: number
    win: number
    draw: number
    lose: number
  }
}

export default async function LigaPage() {
  const res = await fetch("http://localhost:3000/api/football/standings", {
    cache: "no-store",
  })

  const data = await res.json()

    const league = data?.response?.[0]?.league
    const leagueName = league?.name ?? "Liga"
    const leagueLogo = league?.logo
    const season = league?.season ?? "2024"

  const standings: TeamRow[] =
    data?.response?.[0]?.league?.standings?.[0] ?? []

  return (
    <main className="bg-[#0B0F14] min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-[#E5E7EB]">Ligas</h1>
            <p className="mt-1 text-[#9CA3AF]">Aqui você pode ver as tabelas de classificação das ligas que você preferir.</p>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="mb-6 flex items-center gap-3 p-3">
                {leagueLogo && (
                    <img
                    src={leagueLogo}
                    alt={leagueName}
                    className="h-10 w-10"
                    />
                )}

                <div>
                    <h1 className="text-2xl font-bold text-[#E5E7EB]">
                    {leagueName} ({season})
                    </h1>
                
                </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-zinc-300">
                <table className="w-full text-sm">
                    <thead className="bg-[#39FF14] text-zinc-900 shadow-[0_0_18px_#39FF14]">
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
                        {standings.map((row) => {

                            let rowColor = ""

                            if (row.rank <= 4) {
                            rowColor = "text-orange-400"
                            } else if (row.rank >= 17) {
                            rowColor = "text-red-500"
                            }

                            return (
                            <tr
                                key={row.team.name}
                                className={`border-t border-zinc-700 hover:bg-zinc-800 transition ${rowColor}`}
                            >
                                <td className="p-3">{row.rank}</td>

                                <td className="p-3 flex items-center gap-3">
                                <img
                                    src={row.team.logo}
                                    alt={row.team.name}
                                    className="h-5 w-5"
                                />
                                <Link
                                    href={`/dashboard/${row.team.id}`}
                                    className="hover:underline underline-offset-4"
                                    >
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
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </main>
  )
}
