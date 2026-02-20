import { apiFootball } from "@/lib/api_football"

export async function GET() {
  const season = "2024"
  const league = "71"

  const from = `${season}-01-01`
  const to = `${season}-12-31`

  const data = await apiFootball("/fixtures", {
    league,
    season,
    from,
    to,
  })

  const fixtures = data?.response ?? []

  // Agrupar por data
  const grouped: Record<string, any[]> = {}

  for (const fx of fixtures) {
    const localDate = new Date(fx.fixture.date)
    const date = localDate.toLocaleDateString("sv-SE")

    if (!grouped[date]) {
      grouped[date] = []
    }

    grouped[date].push(fx)
  }

  // Ordenar por data crescente
  const sortedDates = Object.keys(grouped).sort()

  const result = sortedDates.map(date => ({
    date,
    games: grouped[date]
  }))

  return Response.json(result)
}