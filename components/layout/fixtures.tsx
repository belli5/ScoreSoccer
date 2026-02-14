import React from "react"

type Fixture = {
  fixture: { id: number; date: string }
  league?: { name?: string; round?: string }
  teams: {
    home: { name: string; logo: string }
    away: { name: string; logo: string }
  }
  goals?: { home: number | null; away: number | null }
  score?: { fulltime?: { home: number | null; away: number | null } }
}

function formatDatePtBR(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
}

function getScore(fx: Fixture) {
  const h = fx?.score?.fulltime?.home ?? fx?.goals?.home
  const a = fx?.score?.fulltime?.away ?? fx?.goals?.away
  const home = h === null || h === undefined ? "-" : h
  const away = a === null || a === undefined ? "-" : a
  return { home, away }
}

export default function FixturesCard({
  title,
  fixtures,
  compact = false,
}: {
  title: string
  fixtures: Fixture[]
  compact?: boolean
}) {
  return (
    <section className="w-full max-w-xl">
        {/* topo */}
        <div className="mb-3">
            <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
            <div className="h-px bg-zinc-800 mt-2" />
        </div>

        {/* lista */}
        <div className="rounded-xl border border-zinc-800 bg-[#0B0F14] overflow-hidden">
            {fixtures.length === 0 ? (
            <div className="p-4 text-sm text-zinc-400">Sem jogos encontrados.</div>
            ) : (
            <ul className="divide-y divide-zinc-800">
                {fixtures.map((fx) => {
                const { home, away } = getScore(fx)

                return (
                    <li
                    key={fx.fixture.id}
                    className={`px-4 py-3 hover:bg-zinc-900/40 transition ${
                        compact ? "py-2" : ""
                    }`}
                    >
                    {/* linha principal */}
                    <div className="flex flex-col items-center text-center">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center gap-6 text-sm text-zinc-100">
  
                                {/* TIME CASA */}
                                <div className="flex items-center gap-2 min-w-[120px] justify-end">
                                    <span className="text-right">{fx.teams.home.name}</span>
                                    <img
                                    src={fx.teams.home.logo}
                                    alt={fx.teams.home.name}
                                    className="h-6 w-6 drop-shadow"
                                    />
                                </div>

                                {/* PLACAR */}
                                <div className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 font-bold text-base">
                                    {home} <span className="text-zinc-500">-</span> {away}
                                </div>

                                {/* TIME FORA */}
                                <div className="flex items-center gap-2 min-w-[120px] justify-start">
                                    <img
                                    src={fx.teams.away.logo}
                                    alt={fx.teams.away.name}
                                    className="h-6 w-6 drop-shadow"
                                    />
                                    <span className="text-left">{fx.teams.away.name}</span>
                                </div>
                            </div>

                            {/* data embaixo */}
                            <div className="mt-1 text-xs text-zinc-400">
                                {formatDatePtBR(fx.fixture.date)}
                                {fx.league?.round ? ` • ${fx.league.round}` : ""}
                            </div>
                        </div>

                        {/* placar */}
                        
                    </div>
                    </li>
                )
                })}
            </ul>
            )}
        </div>
    </section>
  )
}
