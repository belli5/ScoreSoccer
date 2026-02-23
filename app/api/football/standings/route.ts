import { apiFootball } from "@/lib/api_football"

export async function GET(req: Request) {
  console.log("[STANDINGS ROUTE] req.url:", req.url)

  const { searchParams } = new URL(req.url)
  const league = searchParams.get("league") || "71"
  const season = searchParams.get("season") || "2024"

  const data = await apiFootball("/standings", { league, season })

  return Response.json(data)
}