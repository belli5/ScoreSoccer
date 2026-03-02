import Navbar from "@/components/layout/Navbar"
import FixturesCard from "@/components/layout/fixtures"
import TeamCharts from "@/components/layout/charts"

type PageProps = {
  params: Promise<{ teamId: string }>
  searchParams: Promise<{ league?: string; season?: string }>
}

export default async function TeamDashboard({ params, searchParams }: PageProps) {
  const { teamId } = await params
  const sp = await searchParams

  const leagueId = sp.league ?? "71"
  const season = sp.season ?? "2024"

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

  const teamRes = await fetch(`${baseUrl}/api/football/teams?teamId=${teamId}`, {
    cache: "no-store",
  })
  const teamData = await teamRes.json()

  const analyticsRes = await fetch(
    `${baseUrl}/api/football/analytics?teamId=${teamId}&league=${leagueId}&season=${season}`,
    { cache: "no-store" }
  )
  const analytics = await analyticsRes.json()

  const team = teamData?.response?.[0]?.team
  const venue = teamData?.response?.[0]?.venue

  const fixturesRes = await fetch(
    `${baseUrl}/api/football/jogos?teamId=${teamId}&league=${leagueId}&season=${season}`,
    { cache: "no-store" }
  )
  const fixturesData = await fixturesRes.json()
  const allFixtures = fixturesData?.response ?? []

  const fixtures = allFixtures
    .sort(
      (a: any, b: any) =>
        new Date(b.fixture.date).getTime() - new Date(a.fixture.date).getTime()
    )
    .slice(0, 5)

  const leagueName = fixtures?.[0]?.league?.name ?? "Brasileirão Série A"

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header do time */}
        <div className="flex items-center gap-4">
          <img src={team?.logo} alt={team?.name} className="h-12 w-12" />
          <div>
            <h1 className="text-2xl font-bold text-[#39FF14]">
              {team?.name ?? "Time"}
            </h1>
            <p className="text-sm text-zinc-400">
              ID: {teamId} {venue?.name ? `• Estádio: ${venue.name}` : ""}
            </p>
          </div>
        </div>

        {/* Conteúdo responsivo: mobile = coluna (placares em cima, gráficos embaixo)
            desktop = 2 colunas */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row">
          {/* Placares */}
          <div className="w-full lg:max-w-xl">
            <FixturesCard
              title={`${leagueName} • Últimas partidas`}
              fixtures={fixtures}
              compact
            />
          </div>

          {/* Gráficos */}
          <div className="w-full lg:flex-1 lg:flex lg:justify-end">
            <div className="w-full lg:max-w-2xl">
              <TeamCharts
                homeAway={analytics.homeAway ?? []}
                monthGoals={analytics.monthGoals ?? []}
                cumulativePoints={analytics.cumulativePoints ?? []}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}