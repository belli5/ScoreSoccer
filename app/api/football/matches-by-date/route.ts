import { apiFootball } from "@/lib/api_football"

export async function GET() {
  const season = "2024"

  const leagues = ["71", "72", "39"] // Série A, Série B, Premier
  const from = `${season}-01-01`
  const to = `${season}-12-31`

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
      (a, b) =>
        new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
    ),
  }))

  return Response.json(result)
}