// app/api/football/standings/route.ts
import { apiFootball } from "@/lib/api_football"

export const revalidate = 600

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const league = searchParams.get("league") || "71"
  const season = searchParams.get("season") || "2024"

  const data = await apiFootball("/standings", { league, season })
  return Response.json(data)
}