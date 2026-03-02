import React from "react"
import Link from "next/link"

type Fixture = {
  fixture: { id: number; date: string }
  league?: { name?: string; round?: string; logo?: string }
  teams: {
    home: { id: number; name: string; logo: string }
    away: { id: number; name: string; logo: string }
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
                  className={`px-4 hover:bg-zinc-900/40 transition ${
                    compact ? "py-2" : "py-3"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* competição */}
                    <div className="flex items-center gap-2 mb-2 text-xs text-zinc-400">
                      {fx.league?.logo && (
                        <img
                          src={fx.league.logo}
                          alt={fx.league?.name}
                          className="h-4 w-4"
                        />
                      )}
                      <a href="/ligas" className="hover:underline">
                        <span className="uppercase tracking-wide">
                          {fx.league?.name}
                        </span>
                      </a>
                    </div>

                    {/* ✅ LINHA PRINCIPAL RESPONSIVA */}
                    <div className="w-full flex items-center gap-3 text-sm text-zinc-100">
                      {/* HOME */}
                      <div className="flex flex-1 min-w-0 items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/${fx.teams.home.id}`}
                          className="min-w-0 hover:underline"
                          title={fx.teams.home.name}
                        >
                          <span className="block max-w-[140px] truncate text-right sm:max-w-none">
                            {fx.teams.home.name}
                          </span>
                        </Link>
                        <img
                          src={fx.teams.home.logo}
                          alt={fx.teams.home.name}
                          className="h-6 w-6 drop-shadow sm:h-7 sm:w-7"
                        />
                      </div>

                      {/* PLACAR (sempre central e compacto) */}
                      <div className="shrink-0 rounded-md bg-zinc-900 border border-zinc-800 px-2 py-1 font-bold text-base">
                        <span className="inline-block w-4 text-center">{home}</span>
                        <span className="mx-1 text-zinc-500">-</span>
                        <span className="inline-block w-4 text-center">{away}</span>
                      </div>

                      {/* AWAY */}
                      <div className="flex flex-1 min-w-0 items-center justify-start gap-2">
                        <img
                          src={fx.teams.away.logo}
                          alt={fx.teams.away.name}
                          className="h-6 w-6 drop-shadow sm:h-7 sm:w-7"
                        />
                        <Link
                          href={`/dashboard/${fx.teams.away.id}`}
                          className="min-w-0 hover:underline"
                          title={fx.teams.away.name}
                        >
                          <span className="block max-w-[140px] truncate text-left sm:max-w-none">
                            {fx.teams.away.name}
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* data embaixo */}
                    <div className="mt-2 text-xs text-zinc-400">
                      {formatDatePtBR(fx.fixture.date)}
                      {fx.league?.round ? ` • ${fx.league.round}` : ""}
                    </div>
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