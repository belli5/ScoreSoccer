import { apiFootball } from "@/lib/api_football"

export async function GET() {
  const season = "2024"

  const serieA = "71"
  const serieB = "72"

  const [dataA, dataB] = await Promise.all([
    apiFootball("/teams", { league: serieA, season }),
    apiFootball("/teams", { league: serieB, season }),
  ])

  const teamsA = dataA?.response ?? []
  const teamsB = dataB?.response ?? []

  return Response.json({
    season,
    serieA: teamsA,
    serieB: teamsB,
  })
}