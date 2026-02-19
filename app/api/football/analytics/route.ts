import { apiFootball } from "@/lib/api_football"

function fmt(d: Date) {
  return d.toISOString().slice(0, 10)
}

function monthKey(dateStr: string) {
  // "2024-08"
  return dateStr.slice(0, 7)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const teamId = searchParams.get("teamId")
  const season = searchParams.get("season") || "2024"
  const league = searchParams.get("league") || "71"

  if (!teamId) {
    return Response.json({ error: "teamId é obrigatório" }, { status: 400 })
  }

  const seasonNum = Number(season)
  const from = `${seasonNum}-01-01`
  const to = `${seasonNum}-12-31`

  // pega todos os jogos finalizados do time no Brasileirão
  const raw = await apiFootball("/fixtures", {
    team: teamId,
    league,
    season,
    from,
    to,
    status: "FT",
  })

  const fixtures = raw?.response ?? []

  // --- 1) Aproveitamento casa/fora ---
  let home = { played: 0, win: 0, draw: 0, lose: 0 }
  let away = { played: 0, win: 0, draw: 0, lose: 0 }

  // --- 2) Vitórias/Derrotas por mês ---
  const byMonth: Record<string, { month: string; win: number; draw: number; lose: number }> = {}

  // --- 3) Gols pró/contra por mês ---
  const goalsByMonth: Record<string, { month: string; gf: number; ga: number }> = {}

  for (const fx of fixtures) {
    const isHome = String(fx.teams.home.id) === String(teamId)
    const h = fx?.score?.fulltime?.home ?? fx?.goals?.home
    const a = fx?.score?.fulltime?.away ?? fx?.goals?.away

    // segurança
    if (h === null || h === undefined || a === null || a === undefined) continue

    const my = isHome ? h : a
    const opp = isHome ? a : h

    const side = isHome ? home : away
    side.played += 1
    if (my > opp) side.win += 1
    else if (my < opp) side.lose += 1
    else side.draw += 1

    const m = monthKey(fx.fixture.date)
    byMonth[m] ??= { month: m, win: 0, draw: 0, lose: 0 }
    goalsByMonth[m] ??= { month: m, gf: 0, ga: 0 }

    if (my > opp) byMonth[m].win += 1
    else if (my < opp) byMonth[m].lose += 1
    else byMonth[m].draw += 1

    goalsByMonth[m].gf += my
    goalsByMonth[m].ga += opp
  }

  const points = (x: { win: number; draw: number }) => x.win * 3 + x.draw
  const maxPoints = (p: number) => p * 3

  const homeAway = [
    {
      name: "Casa",
      played: home.played,
      win: home.win,
      draw: home.draw,
      lose: home.lose,
      points: points(home),
      pct: home.played ? (points(home) / maxPoints(home.played)) * 100 : 0,
    },
    {
      name: "Fora",
      played: away.played,
      win: away.win,
      draw: away.draw,
      lose: away.lose,
      points: points(away),
      pct: away.played ? (points(away) / maxPoints(away.played)) * 100 : 0,
    },
  ]

  const monthResults = Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month))
  const monthGoals = Object.values(goalsByMonth).sort((a, b) => a.month.localeCompare(b.month))

  // 4) Pontos acumulados ao longo da temporada (estilo corrida)
    const ordered = [...fixtures].sort(
    (a: any, b: any) =>
        new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
    )

    let cum = 0
    const cumulativePoints: { game: number; points: number; date: string }[] = []
    let game = 0

    for (const fx of ordered) {
    const isHome = String(fx.teams.home.id) === String(teamId)
    const h = fx?.score?.fulltime?.home ?? fx?.goals?.home
    const a = fx?.score?.fulltime?.away ?? fx?.goals?.away
    if (h === null || h === undefined || a === null || a === undefined) continue

    const my = isHome ? h : a
    const opp = isHome ? a : h

    let pts = 0
    if (my > opp) pts = 3
    else if (my === opp) pts = 1

    cum += pts
    game += 1

    cumulativePoints.push({
        game,
        points: cum,
        date: fx.fixture.date.slice(0, 10),
    })
    }

  return Response.json({
    meta: { teamId, season, league, from, to, fixtures: fixtures.length },
    homeAway,
    monthResults,
    monthGoals,
    cumulativePoints,
  })
}
