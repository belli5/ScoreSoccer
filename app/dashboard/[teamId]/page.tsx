import Navbar from "@/components/layout/Navbar"

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

    console.log("API-Football fixtures results:", fixturesData?.results)
    console.log("API-Football fixtures errors:", fixturesData?.errors)


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

                <h2 className="mt-8 mb-3 text-lg font-semibold">Ultimas partidas</h2>

                <div className="rounded-xl border border-zinc-700 overflow-hidden">
                {fixtures.length === 0 ? (
                    <div className="p-4 text-zinc-400">Sem jogos encontrados.</div>
                ) : (
                    <ul className="divide-y divide-zinc-800">
                    {fixtures.map((fx: any) => (
                        <li key={fx.fixture.id} className="p-4 hover:bg-zinc-900/40">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                            
                            <img src={fx.teams.home.logo} alt="" className="h-5 w-5" />
                            <span>{fx.teams.home.name}</span>
                            <span className="text-zinc-500">x</span>
                            <span>{fx.teams.away.name}</span>
                            
                            <img src={fx.teams.away.logo} alt="" className="h-5 w-5" />
                            </div>

                            <div className="text-zinc-400 text-sm">
                            {new Date(fx.fixture.date).toLocaleString("pt-BR")}
                            </div>
                        </div>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        </div>
    </main>
  )
}
