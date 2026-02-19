"use client"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts"

export default function TeamCharts({
  homeAway,
  monthGoals,
  cumulativePoints,
}: {
  homeAway: any[]
  monthGoals: any[]
  cumulativePoints: any[]
}) {
  return (
    <div className="mt-10 flex flex-col gap-6">
        {/* 1) Aproveitamento Casa x Fora */}
        <div className="rounded-xl border border-zinc-800 p-4 bg-[#0B0F14]">
            <h3 className="text-sm font-semibold text-zinc-200 mb-3">
            Aproveitamento (Casa x Fora)
            </h3>
            <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={homeAway}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="win" name="Vitórias" fill="#22c55e" />
                <Bar dataKey="draw" name="Empates" fill="#facc15" />
                <Bar dataKey="lose" name="Derrotas" fill="#ef4444" />
                </BarChart>
            </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
            % pontos: Casa {homeAway?.[0]?.pct?.toFixed?.(1) ?? 0}% • Fora {homeAway?.[1]?.pct?.toFixed?.(1) ?? 0}%
            </p>
        </div>

        {/* 2) Resultados por mês */}
        <div className="rounded-xl border border-zinc-800 p-4 bg-[#0B0F14]">
            <h3 className="text-sm font-semibold text-zinc-200 mb-3">
                Pontos acumulados (temporada)
            </h3>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cumulativePoints}>
                    <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                    <XAxis dataKey="game" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" allowDecimals={false} />
                    <Tooltip
                    contentStyle={{
                        backgroundColor: "#111827",
                        border: "1px solid #27272a",
                        color: "#fff",
                    }}
                    labelFormatter={(label) => `Jogo ${label}`}
                    />
                    <Legend />
                    <Line
                    dataKey="points"
                    name="Pontos"
                    stroke="#39FF14"
                    strokeWidth={3}
                    dot={{ r: 2 }}
                    activeDot={{ r: 5 }}
                    />
                </LineChart>
                </ResponsiveContainer>
            </div>

            <p className="mt-2 text-xs text-zinc-400">
                Eixo X = número do jogo na temporada • Eixo Y = pontos acumulados
            </p>
        </div>

        {/* 3) Gols pró x contra por mês */}
        <div className="rounded-xl border border-zinc-800 p-4 bg-[#0B0F14] md:col-span-2">
            <h3 className="text-sm font-semibold text-zinc-200 mb-3">
            Gols pró x contra por mês
            </h3>
            <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthGoals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                    dataKey="gf"
                    name="Gols Pró"
                    stroke="#39FF14"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
                <Line dataKey="ga" name="Gols Contra" />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}
