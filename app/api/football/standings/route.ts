import { apiFootball } from "@/lib/api_football"

export async function GET() {
  const data = await apiFootball("/standings", {
    league: "71",   // Brasileirão Série A
    season: "2024", // permitido no Free
    })


  return Response.json(data)
}
