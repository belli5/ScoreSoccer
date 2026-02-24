import { apiFootball } from "@/lib/api_football"
import { getCache, setCache } from "@/lib/simpleCache"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const season = searchParams.get("season") || "2024"

  // ✅ chave única do cache (muda só quando muda season)
  const key = `teams-by-league:season=${season}`

  // ✅ tenta pegar do cache
  const cached = getCache(key)
  if (cached) {
    return Response.json(cached)
  }

  const leagues = {
    serieA: "71",
    serieB: "72",
    premier: "39",
  }

  const [dataA, dataB, dataP] = await Promise.all([
    apiFootball("/teams", { league: leagues.serieA, season }),
    apiFootball("/teams", { league: leagues.serieB, season }),
    apiFootball("/teams", { league: leagues.premier, season }),
  ])

  const result = {
    season,
    serieA: dataA?.response ?? [],
    serieB: dataB?.response ?? [],
    premier: dataP?.response ?? [],
  }

  // ✅ 2024 não muda → pode cachear por MUITO tempo (ex: 24h)
  setCache(key, result, 24 * 60 * 60 * 1000)

  return Response.json(result)
}