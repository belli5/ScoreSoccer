import { apiFootball } from "@/lib/api_football"
import { getCache, setCache } from "@/lib/simpleCache"

const SUPPORTED_LEAGUES = [
  { key: "serieA", label: "Série A", id: "71" },
  { key: "serieB", label: "Série B", id: "72" },
  { key: "premier", label: "Premier League", id: "39" },
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const season = searchParams.get("season") || "2024"

  // Como é "geral do site", não depende de league (só do season)
  const key = `kpis:site:season=${season}`
  const cached = getCache(key)
  if (cached) return Response.json(cached)

  // 1) Ligas totais
  const leaguesTotal = SUPPORTED_LEAGUES.length

  // 2) Times totais (somando ligas)
  const teamsResponses = await Promise.all(
    SUPPORTED_LEAGUES.map((lg) => apiFootball("/teams", { league: lg.id, season }))
  )
  const teamsTotal = teamsResponses.reduce(
    (acc, data) => acc + (data?.response?.length ?? 0),
    0
  )

  // 3) Jogos registrados + 4) Média de gols por partida (FT)
  const from = `${season}-01-01`
  const to = `${season}-12-31`

  const fixturesResponses = await Promise.all(
    SUPPORTED_LEAGUES.map((lg) =>
      apiFootball("/fixtures", { league: lg.id, season, from, to })
    )
  )

  const allFixtures = fixturesResponses.flatMap((d) => d?.response ?? [])
  const gamesTotal = allFixtures.length

  const finished = allFixtures.filter((fx: any) => fx?.fixture?.status?.short === "FT")

  let avgGoalsFT: number | null = null
  if (finished.length > 0) {
    const totalGoals = finished.reduce((acc: number, fx: any) => {
      const h = fx?.goals?.home
      const a = fx?.goals?.away
      if (h === null || h === undefined || a === null || a === undefined) return acc
      return acc + h + a
    }, 0)

    avgGoalsFT = totalGoals / finished.length
  }

  const payload = {
    leaguesTotal,
    teamsTotal,
    gamesTotal,
    avgGoalsFT, // null => mostra "—"
  }

  // 6h (boa: reduz requisições e ainda atualiza durante a temporada)
  setCache(key, payload, 6 * 60 * 60 * 1000)

  return Response.json(payload)
}