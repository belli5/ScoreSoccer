import { apiFootball } from "@/lib/api_football"
import { getCache, setCache } from "@/lib/simpleCache"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const league = searchParams.get("league") || "71"
  const season = searchParams.get("season") || "2024"

  const key = `standings:league=${league}:season=${season}`
  const cached = getCache(key)
  if (cached) return Response.json(cached)

  const data = await apiFootball("/standings", { league, season })

  // 1 hora
  setCache(key, data, 60 * 60 * 1000)

  return Response.json(data)
}