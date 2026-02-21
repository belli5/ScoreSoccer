import Navbar from "@/components/layout/Navbar"
import FixturesCard from "@/components/layout/fixtures"

function formatDayTitle(day: string) {
  const d = new Date(day + "T00:00:00")
  return d.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/football/matches-by-date", {
    cache: "no-store",
  })

  const days = await res.json() 

  return (
    <main className="bg-[#0B0F14] min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-zinc-100">Todos os Jogos</h1>
            <p className="mt-1 text-[#9CA3AF]">Aqui você pode ver todos os jogos de qualquer campeonato.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {days.map((group: any) => (
        <div key={group.date} className="flex justify-center">
          <FixturesCard
            title={formatDayTitle(group.date)}
            fixtures={group.games}
            compact
          />
        </div>
      ))}
      </div>
    </main>
  )
}