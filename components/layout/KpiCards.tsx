"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type KpiData = {
  leaguesTotal: number
  teamsTotal: number
  mostCompetitive: { id: string; label: string; gapTop5: number; logo?: string } | null
}

function KpiItem({
  label,
  value,
  valueNode,
  hint,
  loading,
}: {
  label: string
  value?: string
  valueNode?: React.ReactNode
  hint?: string
  loading?: boolean
}) {
  return (
    <Card className="rounded-2xl border border-[#39FF14] bg-zinc-950/60 shadow-[0_0_15px_#39FF14]">
      <CardContent className="p-3">
        <p className="text-xs font-medium tracking-wide text-zinc-400">{label}</p>

        <div className="mt-3 flex items-end justify-between gap-3">
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded bg-white/10" />
          ) : valueNode ? (
            valueNode
          ) : (
            <p className="text-3xl font-semibold tracking-tight text-[#39FF14]">{value}</p>
          )}

          {hint ? <p className="text-[11px] leading-tight text-zinc-500">{hint}</p> : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default function KpiCards({ season = "2024" }: { season?: string }) {
  const [data, setData] = useState<KpiData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchedOnce = useRef(false)

  useEffect(() => {
    if (fetchedOnce.current) return
    fetchedOnce.current = true

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(`/api/football/kpis?season=${season}`, { signal: controller.signal })
      .then(async (r) => {
        const json = await r.json()
        if (!r.ok) throw json
        return json as KpiData
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err?.name === "AbortError") return
        setData(null)
        setError(err?.detail || err?.message || "Erro ao carregar KPIs (rate limit?)")
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [season])

  const mostLeague = data?.mostCompetitive?.label ?? "—"
  const mostLogo = data?.mostCompetitive?.logo
  const gapTop5 = data?.mostCompetitive ? String(data.mostCompetitive.gapTop5) : "—"

  return (
    <div>
      {error ? (
        <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

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
          hint="Somando standings"
          loading={loading}
        />

        <KpiItem
          label="LIGA MAIS EQUILIBRADA"
          hint="Menor distância (1º–5º)"
          loading={loading}
          valueNode={
            mostLogo ? (
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full border border-[#0B0F14]">
                  <Image
                    src={mostLogo}
                    alt={mostLeague}
                    fill
                    className="p-1 object-contain"
                  />
                </div>
                <p className="text-base font-semibold text-[#39FF14] leading-none">
                  {mostLeague}
                </p>
              </div>
            ) : (
              <p className="text-3xl font-semibold tracking-tight text-[#39FF14]">{mostLeague}</p>
            )
          }
        />

        <KpiItem
          label="GAP TOP 5 (PTS)"
          value={data ? gapTop5 : "—"}
          hint="Pontos (1º - 5º)"
          loading={loading}
        />
      </div>
    </div>
  )
}