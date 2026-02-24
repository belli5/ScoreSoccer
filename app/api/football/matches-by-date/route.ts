import { apiFootball } from "@/lib/api_football"
import { getCache, setCache } from "@/lib/simpleCache"

export async function GET() {
  const season = "2024"

  const leagues = ["71", "72", "39"] 
  const from = `${season}-01-01`
  const to = `${season}-12-31`

  // ✅ chave do cache (inclui season + ligas)
  const key = `matches-by-date:season=${season}:leagues=${leagues.join(",")}`

  // ✅ tenta cache primeiro
  const cached = getCache(key)
  if (cached) {
    return Response.json(cached)
  }

  // busca todas em paralelo
  const results = await Promise.all(
    leagues.map((league) =>
      apiFootball("/fixtures", {
        league,
        season,
        from,
        to,
      })
    )
  )

  // junta todos os jogos
  const fixtures = results.flatMap((r) => r?.response ?? [])

  // agrupar por data local
  const grouped: Record<string, any[]> = {}

  for (const fx of fixtures) {
    const localDate = new Date(fx.fixture.date)
    const date = localDate.toLocaleDateString("sv-SE") // YYYY-MM-DD

    grouped[date] ??= []
    grouped[date].push(fx)
  }

  // ordenar datas e ordenar jogos dentro da data (por horário)
  const sortedDates = Object.keys(grouped).sort()

  const result = sortedDates.map((date) => ({
    date,
    games: grouped[date].sort(
      (a: any, b: any) =>
        new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
    ),
  }))

  // ✅ 2024 é histórico → cache bem longo (ex: 12h ou 24h)
  setCache(key, result, 12 * 60 * 60 * 1000) // 12 horas

  return Response.json(result)
}