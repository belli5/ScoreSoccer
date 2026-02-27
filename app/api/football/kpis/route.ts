import { apiFootball } from "@/lib/api_football"
import { getCache, setCache } from "@/lib/simpleCache"
import { LEAGUES } from "@/lib/leagues"

function extractApiError(data: any): string | null {
  const err = data?.errors
  if (!err) return null

  if (Array.isArray(err)) return err.length > 0 ? JSON.stringify(err) : null

  if (typeof err === "object") {
    const keys = Object.keys(err)
    if (keys.length === 0) return null
    for (const k of ["rateLimit", "requests", "token", "message", "plan"]) {
      if (err[k]) return String(err[k])
    }
    return JSON.stringify(err)
  }

  return String(err)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const season = searchParams.get("season") || "2024"

  const key = `kpis:site:season=${season}:standingsOnly`
  const cached = getCache(key)
  if (cached) return Response.json(cached)

  const leaguesTotal = LEAGUES.length

  let teamsTotal = 0

  // menor gap entre 1º e 5º
  let mostCompetitive: { id: string; label: string; gapTop5: number } | null = null

  for (const lg of LEAGUES) {
    const standingsData = await apiFootball("/standings", {
      league: lg.id,
      season,
    })

    const apiErr = extractApiError(standingsData)
    if (apiErr) {
      return Response.json(
        { message: "API-Football error", detail: apiErr },
        { status: 429 }
      )
    }

    const table = standingsData?.response?.[0]?.league?.standings?.[0] ?? []
    if (!Array.isArray(table) || table.length === 0) continue

    // ✅ timesTotal via standings (não usa /teams)
    teamsTotal += table.length

    // ✅ gapTop5 via standings
    if (table.length >= 5) {
      const p1 = table[0]?.points
      const p5 = table[4]?.points

      if (typeof p1 === "number" && typeof p5 === "number") {
        const gap = p1 - p5
        if (!mostCompetitive || gap < mostCompetitive.gapTop5) {
          mostCompetitive = { id: String(lg.id), label: lg.label, gapTop5: gap }
        }
      }
    }
  }

  const payload = {
    leaguesTotal,
    teamsTotal,
    mostCompetitive, // pode ser null se alguma liga não tiver standings/top5
  }

  // ✅ cache forte pra não estourar 10/min
  setCache(key, payload, 6 * 60 * 60 * 1000) // 6h

  return Response.json(payload)
}