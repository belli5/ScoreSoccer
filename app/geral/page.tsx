import KpiCards from "@/components/layout/KpiCards"
import Navbar from "@/components/layout/Navbar"
import LeagueOverview from "@/components/layout/LeagueOverview"
import LeagueCompetitivenessChart from "@/components/layout/LeagueCompetitivenessChart"

export default function DashboardPage() {
  const league = "71"
  const season = "2024"

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-400">
            Visão geral rápida dos dados do sistema
          </p>
        </div>

        <div className="mt-8">
          <KpiCards season={season} />
        </div>
        <div className="mt-4">
          <LeagueCompetitivenessChart season={season} />
        </div>
        <LeagueOverview season={season} />
      </div>
    </div>
  )
}