"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LEAGUES } from "@/lib/leagues"


type Row = {
  rank: number
  name: string
  logo: string
  points: number
  played: number
  gf: number
  ga: number
  gd: number
  form: string | null
}

type Overview = {
  league: string
  season: string
  leader: string | null
  bestAttack: string | null
  bestDefense: string | null
  top5: Row[]
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="rounded-2xl border border-[#39FF14]/60 bg-zinc-950/60 shadow-[0_0_12px_#39FF14]">
      <CardContent className="p-4">
        <p className="text-xs font-medium tracking-wide text-zinc-400">{label}</p>
        <p className="mt-2 text-lg font-semibold text-white">{value}</p>
      </CardContent>
    </Card>
  )
}

export default function LeagueOverview({ season = "2024" }: { season?: string }) {
  const [league, setLeague] = useState("71")
  const [data, setData] = useState<Overview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)

    fetch(`/api/football/overview?league=${league}&season=${season}`)
      .then((r) => r.json())
      .then((json) => {
        if (!alive) return
        setData(json)
      })
      .finally(() => {
        if (!alive) return
        setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [league, season])

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Panorama das Ligas</h2>
          <p className="text-sm text-zinc-400">Top 5 + destaques</p>
        </div>

        <label htmlFor="league-select" className="sr-only">
        Selecionar liga
        </label>

        <select
            id="league-select"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            className="h-10 rounded-xl border border-white/10 bg-zinc-950 px-3 text-sm text-white outline-none"
        >
            {LEAGUES.map((l) => (
            <option key={l.id} value={l.id}>
            {l.label}
            </option>
        ))}
        </select>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <MiniCard label="LÍDER" value={loading ? "Carregando..." : data?.leader ?? "—"} />
        <MiniCard label="MELHOR ATAQUE" value={loading ? "Carregando..." : data?.bestAttack ?? "—"} />
        <MiniCard label="MELHOR DEFESA" value={loading ? "Carregando..." : data?.bestDefense ?? "—"} />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60">
        <div className="px-4 py-3 text-sm font-medium text-zinc-300">
          Top 5 (P, J, SG, GP, GC)
        </div>

        <div className="divide-y divide-white/10">
          {(data?.top5 ?? []).map((r) => (
            <div key={r.rank} className="flex items-center gap-3 px-4 py-3">
              <div className="w-6 text-sm font-semibold text-[#39FF14]">{r.rank}</div>
              {/* se quiser logo: */}
              {/* <img src={r.logo} alt="" className="h-6 w-6" /> */}
              <div className="flex-1 text-sm text-white">{r.name}</div>
              <div className="w-10 text-right text-sm text-white">{r.points}</div>
              <div className="w-10 text-right text-xs text-zinc-400">{r.played}</div>
              <div className="w-10 text-right text-xs text-zinc-400">{r.gd}</div>
              <div className="w-10 text-right text-xs text-zinc-400">{r.gf}</div>
              <div className="w-10 text-right text-xs text-zinc-400">{r.ga}</div>
            </div>
          ))}

          {!loading && (data?.top5?.length ?? 0) === 0 ? (
            <div className="px-4 py-6 text-sm text-zinc-400">Sem dados para exibir.</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}