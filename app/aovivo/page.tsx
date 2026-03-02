// app/page.tsx
import Navbar from "@/components/layout/Navbar"
import { Card, CardContent } from "@/components/ui/card"

export default async function Home() {
  return (
    <main className="bg-[#0B0F14] min-h-screen text-white">
      <Navbar />

      <section className="flex items-center justify-center px-4 py-20">
        <Card className="w-full max-w-xl rounded-2xl border border-[#39FF14] bg-zinc-950/60 shadow-[0_0_25px_#39FF14] backdrop-blur-md">
          <CardContent className="p-8 text-center space-y-4">
            
            <h1 className="text-2xl sm:text-3xl font-bold text-[#39FF14]">
              🚀 Em Atualização
            </h1>

            <p className="text-sm sm:text-base text-zinc-400">
              Estamos trabalhando em novas funcionalidades para deixar o 
              <span className="text-white font-semibold"> ScoreSoccer </span> 
              ainda mais completo.
            </p>

            <div className="text-xs sm:text-sm text-zinc-500">
              Em breve você verá novas métricas, análises e melhorias visuais.
            </div>

          </CardContent>
        </Card>
      </section>
    </main>
  )
}