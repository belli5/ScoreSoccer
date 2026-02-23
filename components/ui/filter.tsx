"use client"

import { useRouter, useSearchParams } from "next/navigation"

type LeagueOption = {
  id: string
  name: string
  logo?: string
}

export default function LeagueFilter({
  options,
  paramName = "league",
}: {
  options: LeagueOption[]
  paramName?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const current = searchParams.get(paramName) || options[0].id

 function handleChange(id: string) {
  const params = new URLSearchParams(searchParams.toString())
  params.set(paramName, id)

  router.push(`/ligas?${params.toString()}`) // path completo
  router.refresh() // força re-render do server component
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((league) => {
        const active = current === league.id

        return (
          <button
            key={league.id}
            onClick={() => handleChange(league.id)}
            className={[
              "flex items-center gap-2 px-4 py-2 rounded-lg border transition",
              active
                ? "bg-[#39FF14] text-black border-[#39FF14] shadow-[0_0_12px_#39FF14]"
                : "bg-zinc-900 text-white border-zinc-700 hover:border-zinc-500",
            ].join(" ")}
          >
            {league.logo && (
              <img src={league.logo} alt={league.name} className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{league.name}</span>
          </button>
        )
      })}
    </div>
  )
}