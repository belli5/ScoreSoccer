import { apiFootball } from "@/lib/api_football"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const season = searchParams.get("season") || "2024"

  const leagues = {
    serieA: "71",
    serieB: "72",
    premier: "39",
  }

  const [dataA, dataB, dataP] = await Promise.all([
    apiFootball("/teams", { league: leagues.serieA, season }),
    apiFootball("/teams", { league: leagues.serieB, season }),
    apiFootball("/teams", { league: leagues.premier, season }),
  ])

  return Response.json({
    season,
    serieA: dataA?.response ?? [],
    serieB: dataB?.response ?? [],
    premier: dataP?.response ?? [],
  })
}