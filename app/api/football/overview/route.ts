import { apiFootball } from "@/lib/api_football"
import { getCache, setCache } from "@/lib/simpleCache"

function extractApiError(data: any): string | null {
  const err = data?.errors

  if (!err) return null
  if (Array.isArray(err)) return err.length > 0 ? JSON.stringify(err) : null

  if (typeof err === "object") {
    const keys = Object.keys(err)
    if (keys.length === 0) return null
    for (const k of ["rateLimit", "requests", "token", "message"]) {
      if (err[k]) return String(err[k])
    }
    return JSON.stringify(err)
  }

  return String(err)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const league = searchParams.get("league") || "71"
  const season = searchParams.get("season") || "2024"

  const key = `overview:league=${league}:season=${season}`
  const cached = getCache(key)
  if (cached) return Response.json(cached)

  const standingsData = await apiFootball("/standings", { league, season })

  // ✅ Se deu erro (rateLimit etc.), não cacheia e devolve 429
  const apiErr = extractApiError(standingsData)
  if (apiErr) {
    return Response.json(
      { message: "API-Football error", detail: apiErr },
      { status: 429 }
    )
  }

  const table = standingsData?.response?.[0]?.league?.standings?.[0] ?? []
  if (!Array.isArray(table) || table.length === 0) {
    // ✅ Sem tabela -> não cacheia vazio
    return Response.json(
      { message: "Sem dados de standings para essa liga/temporada." },
      { status: 404 }
    )
  }

  const top5 = table.slice(0, 5).map((r: any) => ({
    rank: r.rank,
    name: r.team?.name,
    logo: r.team?.logo,
    points: r.points,
    played: r.all?.played,
    gf: r.all?.goals?.for,
    ga: r.all?.goals?.against,
    gd: r.goalsDiff,
    form: r.form ?? null,
  }))

  const leader = top5[0]?.name ?? null

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

  // ✅ Só cacheia se tem top5 (evita cachear vazio)
  if (top5.length > 0) {
    setCache(key, payload, 6 * 60 * 60 * 1000) // 1h
  }

  return Response.json(payload)
}