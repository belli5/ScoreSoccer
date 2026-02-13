import { apiFootball } from "@/lib/api_football" 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const teamId = searchParams.get("teamId")

  if (!teamId) {
    return Response.json({ error: "teamId é obrigatório" }, { status: 400 })
  }

  const data = await apiFootball("/teams", { id: teamId })
  return Response.json(data)
}
