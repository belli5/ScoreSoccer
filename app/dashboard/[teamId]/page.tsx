import Navbar from "@/components/layout/Navbar"
import FixturesCard from "@/components/layout/fixtures"

type PageProps = {
  params: Promise<{ teamId: string }>
}

export default async function TeamDashboard({ params }: PageProps) {
    const { teamId } = await params

    // (simples) baseUrl local — depois a gente melhora isso
    const baseUrl = "http://localhost:3000"

    const teamRes = await fetch(`${baseUrl}/api/football/teams?teamId=${teamId}`, {
        cache: "no-store",
    })
    const teamData = await teamRes.json()

    const team = teamData?.response?.[0]?.team
    const venue = teamData?.response?.[0]?.venue

    const fixturesRes = await fetch(
        `${baseUrl}/api/football/jogos?teamId=${teamId}&league=71&season=2024`,
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
    <main className="bg-[#0B0F14] min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center gap-4">
            
                <img src={team?.logo} alt={team?.name} className="h-12 w-12" />
                <div>
                    <h1 className="text-2xl font-bold text-[#39FF14]">
                    {team?.name ?? "Time"}
                    </h1>
                    <p className="text-zinc-400 text-sm">
                    ID: {teamId} {venue?.name ? `• Estádio: ${venue.name}` : ""}
                    </p>
                </div>
                </div>

                <div className="mt-8 flex justify-start">
                <FixturesCard
                    title={`${leagueName} • Últimas partidas`}
                    fixtures={fixtures}
                    compact
                />
            </div>
        </div>
    </main>
  )
}
