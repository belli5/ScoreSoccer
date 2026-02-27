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

type MostCompetitive = {
  id: string
  label: string
  gapTop5: number
  logo?: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const season = searchParams.get("season") || "2024"

  const key = `kpis:site:season=${season}:standingsOnly:v2` // 👈 mudei pra v2 pra furar cache antigo
  const cached = getCache(key)
  if (cached) return Response.json(cached)

  const leaguesTotal = LEAGUES.length
  let teamsTotal = 0

  let mostCompetitive: MostCompetitive | null = null

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

    const leagueLogo = standingsData?.response?.[0]?.league?.logo
    const table = standingsData?.response?.[0]?.league?.standings?.[0] ?? []
    if (!Array.isArray(table) || table.length === 0) continue

    teamsTotal += table.length

    if (table.length >= 5) {
      const p1 = table[0]?.points
      const p5 = table[4]?.points

      if (typeof p1 === "number" && typeof p5 === "number") {
        const gap = p1 - p5
        if (!mostCompetitive || gap < mostCompetitive.gapTop5) {
          mostCompetitive = {
            id: String(lg.id),
            label: lg.label,
            gapTop5: gap,
            logo: leagueLogo,
          }
        }
      }
    }
  } // ✅ FECHA O FOR AQUI

  const payload = {
    leaguesTotal,
    teamsTotal,
    mostCompetitive,
  }

  setCache(key, payload, 6 * 60 * 60 * 1000)

  return Response.json(payload)
}