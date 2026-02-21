"use client"

import { useEffect, useState } from "react"
import FavoriteSquareCard from "@/components/layout/CardsTeams"

type Team = { id: number; name: string; logo: string }

export default function TeamsGrid({ teams }: { teams: Team[] }) {
  const [selected, setSelected] = useState<Set<number>>(new Set())

  // 🔥 1) Carregar do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("scoresoccer:fav:teams")

    if (saved) {
      const parsed: number[] = JSON.parse(saved)
      setSelected(new Set(parsed))
    }
  }, [])

  // 🔥 2) Função de toggle já salvando no localStorage
  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      // salva como array
      localStorage.setItem(
        "scoresoccer:fav:teams",
        JSON.stringify(Array.from(next))
      )

      return next
    })
  }

  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-6">
      {teams.map((t) => (
        <FavoriteSquareCard
          key={t.id}
          name={t.name}
          logo={t.logo}
          selected={selected.has(t.id)}
          onClick={() => toggle(t.id)}
        />
      ))}
    </div>
  )
}