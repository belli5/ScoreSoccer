// app/api/football/competitiveness/route.ts
import { apiFootball } from "@/lib/api_football"

const LEAGUES = [
  { key: "serieA", label: "Série A", id: "71" },
  { key: "premier", label: "Premier League", id: "39" },
  { key: "laliga", label: "La Liga", id: "140" },
  { key: "bundesliga", label: "Bundesliga", id: "78" },
] as const

export const revalidate = 60 * 60 * 6 

function pickTop5Gap(standings: any[]) {
  if (!Array.isArray(standings) || standings.length < 5) return null

  const first = standings[0]
  const fifth = standings[4]
  if (!first || !fifth) return null

  const p1 = Number(first.points)
  const p5 = Number(fifth.points)

  // se vier NaN por algum motivo
  if (!Number.isFinite(p1) || !Number.isFinite(p5)) return null

  const gap = p1 - p5
  const gapPct = p1 ? (gap / p1) * 100 : 0

  return { p1, p5, gap, gapPct }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const season = searchParams.get("season") || "2024"

  const results = await Promise.all(
    LEAGUES.map(async (lg) => {
      const raw = await apiFootball("/standings", {
        league: lg.id,
        season,
      })

      const leagueObj = raw?.response?.[0]?.league
      const standings = leagueObj?.standings?.[0] // <- formato comum da API-Football

      const metrics = pickTop5Gap(standings)
      if (!metrics) {
        return {
          key: lg.key,
          label: lg.label,
          leagueId: lg.id,
          ok: false,
        }
      }

      return {
        key: lg.key,
        label: lg.label,
        leagueId: lg.id,
        ok: true,
        ...metrics,
      }
    })
  )

  return Response.json({ season, data: results })
}