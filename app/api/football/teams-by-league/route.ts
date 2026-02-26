import { apiFootball } from "@/lib/api_football"
import { getCache, setCache } from "@/lib/simpleCache"
import { LEAGUES } from "@/lib/leagues"

async function fetchTeamsWithFallback(leagueId: string, season: string) {
  const trySeasons = [season, String(Number(season) - 1), String(Number(season) - 2)]

  for (const s of trySeasons) {
    const data = await apiFootball("/teams", { league: leagueId, season: s })
    const list = data?.response ?? []
    if (list.length > 0) return { response: list, usedSeason: s, raw: data }
  }

  // se nenhuma season funcionou, devolve vazio
  return { response: [], usedSeason: season, raw: null }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const season = searchParams.get("season") || "2024"

  const key = `teams-by-league:season=${season}:leagues=${LEAGUES.map(l => l.id).join(",")}`
  const cached = getCache(key)
  if (cached) return Response.json(cached)

  const responses = await Promise.all(
    LEAGUES.map((l) => fetchTeamsWithFallback(l.id, season))
  )

  const result: Record<string, any> = { season }

  LEAGUES.forEach((league, index) => {
    result[league.key] = responses[index].response
    // opcional: pra você debugar no browser e ver qual season ele usou
    result[`${league.key}_seasonUsed`] = responses[index].usedSeason
  })

  setCache(key, result, 24 * 60 * 60 * 1000)

  return Response.json(result)
}