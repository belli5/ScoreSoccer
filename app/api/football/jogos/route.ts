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

  // Brasileirão 2024 (aprox): abril a dezembro
  const from = `${seasonNum}-01-01`
  const to = `${seasonNum}-12-31`

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
