import { apiFootball } from "@/lib/api_football"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const teamId = searchParams.get("teamId")
  const season = searchParams.get("season") || "2024"
  const league = searchParams.get("league") || "71"

  if (!teamId) {
    return Response.json({ error: "teamId é obrigatório" }, { status: 400 })
  }

  const seasonNum = Number(season)

  // ligas europeias que cruzam o ano (2024/25)
  const EURO_LEAGUES = new Set(["39", "140", "78"])

  let from: string
  let to: string

  if (EURO_LEAGUES.has(String(league))) {
    from = `${seasonNum}-07-01`
    to = `${seasonNum + 1}-06-30`
  } else {
    from = `${seasonNum}-01-01`
    to = `${seasonNum}-12-31`
  }

  const data = await apiFootball("/fixtures", {
    team: teamId,
    season,
    league,
    from,
    to,
    status: "FT",
  })

  return Response.json(data)
}
