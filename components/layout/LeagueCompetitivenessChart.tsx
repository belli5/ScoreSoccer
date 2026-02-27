// components/layout/LeagueCompetitivenessChart.tsx
"use client"

import { useEffect, useState } from "react"
import { Cell } from "recharts"
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Item = {
  key: string
  label: string
  leagueId: string
  ok: boolean
  p1?: number
  p5?: number
  gap?: number
  gapPct?: number
}

export default function LeagueCompetitivenessChart({ season }: { season: string }) {
  const [data, setData] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      const res = await fetch(`/api/football/competitiveness?season=${season}`)
      const json = await res.json()
      if (mounted) {
        setData((json.data ?? []).filter((x: Item) => x.ok))
        setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [season])

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-start justify-between gap-3">
            <div>
            <h2 className="text-lg font-semibold text-white">Competitividade (1º vs 5º)</h2>
            <p className="text-sm text-zinc-400">
                Menor diferença de pontos = topo mais equilibrado
            </p>
            </div>
        </div>

        <div className="mt-4 h-72">
            {loading ? (
            <div className="h-full w-full animate-pulse rounded-xl bg-white/5" />
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="label" tick={{ fill: "#A1A1AA", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#A1A1AA", fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ background: "#0B0F14", border: "1px solid rgba(255,255,255,0.12)" }}
                        labelStyle={{ color: "white" }}
                    />
                    {/* usa gap ou gapPct (eu recomendo gapPct por normalizar) */}
                    <Bar dataKey="gap" radius={[10, 10, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={entry.key === "serieA" ? "#39FF14" : "#00E676"}
                            />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    </div>
  )
}