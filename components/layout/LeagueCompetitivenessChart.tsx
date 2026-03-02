"use client"

import { useEffect, useMemo, useState } from "react"
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

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [breakpoint])

  return isMobile
}

export default function LeagueCompetitivenessChart({ season }: { season: string }) {
  const [data, setData] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

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

  // se quiser normalizar, troque para "gapPct"
  const dataKey = "gap" as const

  // ordena do mais competitivo (menor gap) para o menos (maior gap)
  const sorted = useMemo(() => {
    return [...data].sort((a, b) => (a[dataKey] ?? 0) - (b[dataKey] ?? 0))
  }, [data])

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Competitividade (1º vs 5º)
          </h2>
          <p className="text-sm text-zinc-400">
            Menor diferença de pontos = topo mais equilibrado
          </p>
        </div>
      </div>

      {/* altura menor no mobile */}
      <div className={`mt-4 ${isMobile ? "h-56" : "h-72"}`}>
        {loading ? (
          <div className="h-full w-full animate-pulse rounded-xl bg-white/5" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sorted}
              layout={isMobile ? "vertical" : "horizontal"} // ✅ mobile = barras horizontais
              margin={
                isMobile
                  ? { top: 8, right: 12, bottom: 8, left: 12 }
                  : { top: 8, right: 12, bottom: 8, left: 12 }
              }
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

              {/* ✅ Desktop: X = label, Y = valor */}
              {!isMobile && (
                <>
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#A1A1AA", fontSize: 12 }}
                    tickMargin={8}
                  />
                  <YAxis
                    tick={{ fill: "#A1A1AA", fontSize: 12 }}
                    width={36}
                  />
                </>
              )}

              {/* ✅ Mobile: Y = label, X = valor (bem mais legível) */}
              {isMobile && (
                <>
                  <XAxis
                    type="number"
                    tick={{ fill: "#A1A1AA", fontSize: 12 }}
                    tickMargin={8}
                    width={36}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={{ fill: "#A1A1AA", fontSize: 12 }}
                    width={92} // espaço pro nome da liga
                    tickMargin={6}
                  />
                </>
              )}

              <Tooltip
                contentStyle={{
                  background: "#0B0F14",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                labelStyle={{ color: "white" }}
                formatter={(value: any) => [`${value}`, "Dif. pontos"]}
              />

              <Bar
                dataKey={dataKey}
                radius={isMobile ? [10, 10, 10, 10] : [10, 10, 0, 0]}
                barSize={isMobile ? 18 : 210}
              >
                {sorted.map((entry, index) => (
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