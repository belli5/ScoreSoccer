const BASE_URL = "https://v3.football.api-sports.io"

export async function apiFootball(path: string, params?: Record<string, string>) {
  const url = new URL(BASE_URL + path)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  const response = await fetch(url.toString(), {
    headers: {
      "x-apisports-key": process.env.API_FOOTBALL_KEY as string,
    },
  })

  if (!response.ok) {
    throw new Error("Erro na API-Football")
  }

  return response.json()
}
