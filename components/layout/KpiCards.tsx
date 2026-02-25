"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type KpiData = {
  leaguesTotal: number
  teamsTotal: number
  gamesTotal: number
  avgGoalsFT: number | null
}

function formatAvg(x: number | null) {
  if (x === null) return "—"
  return x.toFixed(2).replace(".", ",")
}

function KpiItem({
  label,
  value,
  hint,
  loading,
}: {
  label: string
  value: string
  hint?: string
  loading?: boolean
}) {
  return (
    <Card className="rounded-2xl border border-[#39FF14] bg-zinc-950/60 shadow-[0_0_15px_#39FF14]">
      <CardContent className="p-3">
        <p className="text-xs font-medium tracking-wide text-zinc-400">
          {label}
        </p>

        <div className="mt-3 flex items-end justify-between gap-3">
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded bg-white/10" />
          ) : (
            <p className="text-3xl font-semibold tracking-tight text-[#39FF14]">
              {value}
            </p>
          )}

          {hint ? (
            <p className="text-[11px] leading-tight text-zinc-500">{hint}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default function KpiCards({
  league = "71",
  season = "2024",
}: {
  league?: string
  season?: string
}) {
  const [data, setData] = useState<KpiData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)

    fetch(`/api/football/kpis?league=${league}&season=${season}`)
      .then((r) => r.json())
      .then((json) => {
        if (!alive) return
        setData(json)
      })
      .catch(() => {
        if (!alive) return
        setData(null)
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <KpiItem
        label="LIGAS TOTAIS"
        value={data ? String(data.leaguesTotal) : "—"}
        hint="Suportadas no site"
        loading={loading}
        />

        <KpiItem
        label="TIMES TOTAIS"
        value={data ? String(data.teamsTotal) : "—"}
        hint="Somando ligas"
        loading={loading}
        />

        <KpiItem
        label="JOGOS REGISTRADOS"
        value={data ? String(data.gamesTotal) : "—"}
        hint={`Temporada ${season}`}
        loading={loading}
        />

        <KpiItem
        label="MÉDIA DE GOLS (FT)"
        value={data ? formatAvg(data.avgGoalsFT) : "—"}
        hint="Só jogos finalizados"
        loading={loading}
        />
    </div>
  )
}