// app/page.tsx
import Navbar from "@/components/layout/Navbar"
import HomeSwipe from "@/app/Home/homeSwipe"

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/football/matches-by-date", {
    cache: "no-store",
  })

  const days = await res.json()

  return (
    <main className="bg-[#0B0F14] min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-zinc-100">Home</h1>
        <p className="mt-1 text-[#9CA3AF]">
          Deslize para ver todos os jogos ou só os favoritos.
        </p>
      </div>

      <HomeSwipe days={days} />
    </main>
  )
}