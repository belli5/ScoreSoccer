import { apiFootball } from "@/lib/api_football"
import { getCache, setCache } from "@/lib/simpleCache"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const league = searchParams.get("league") || "71"
  const season = searchParams.get("season") || "2024"

  const key = `overview:league=${league}:season=${season}`
  const cached = getCache(key)
  if (cached) return Response.json(cached)

  const standingsData = await apiFootball("/standings", { league, season })
  const table = standingsData?.response?.[0]?.league?.standings?.[0] ?? []

  const top5 = table.slice(0, 5).map((r: any) => ({
    rank: r.rank,
    name: r.team?.name,
    logo: r.team?.logo,
    points: r.points,
    played: r.all?.played,
    gf: r.all?.goals?.for,
    ga: r.all?.goals?.against,
    gd: r.goalsDiff,
    form: r.form ?? null, // ex: "WWDLW" (às vezes vem)
  }))

  const leader = top5[0]?.name ?? null

  // Melhor ataque/defesa (considerando jogos disputados pra evitar empates injustos)
  const bestAttackRow =
    table.reduce((best: any, cur: any) => {
      const curGF = cur?.all?.goals?.for ?? 0
      const curP = cur?.all?.played ?? 0
      const curAvg = curP ? curGF / curP : 0

      const bestGF = best?.all?.goals?.for ?? 0
      const bestP = best?.all?.played ?? 0
      const bestAvg = bestP ? bestGF / bestP : 0

      return curAvg > bestAvg ? cur : best
    }, table[0]) ?? null

  const bestDefenseRow =
    table.reduce((best: any, cur: any) => {
      const curGA = cur?.all?.goals?.against ?? 0
      const curP = cur?.all?.played ?? 0
      const curAvg = curP ? curGA / curP : Number.POSITIVE_INFINITY

      const bestGA = best?.all?.goals?.against ?? 0
      const bestP = best?.all?.played ?? 0
      const bestAvg = bestP ? bestGA / bestP : Number.POSITIVE_INFINITY

      return curAvg < bestAvg ? cur : best
    }, table[0]) ?? null

  const payload = {
    league,
    season,
    leader,
    bestAttack: bestAttackRow?.team?.name ?? null,
    bestDefense: bestDefenseRow?.team?.name ?? null,
    top5,
  }

  // 1h de cache (standings não muda a cada segundo)
  setCache(key, payload, 60 * 60 * 1000)

  return Response.json(payload)
}