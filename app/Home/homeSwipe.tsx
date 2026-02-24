"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import FixturesCard from "@/components/layout/fixtures"

function formatDayTitle(day: string) {
  const d = new Date(day + "T00:00:00")
  return d.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

type DaysGroup = { date: string; games: any[] }

export default function HomeSwipe({ days }: { days: DaysGroup[] }) {
  const [favIds, setFavIds] = useState<Set<number>>(new Set())
  const [active, setActive] = useState<"all" | "fav">("all")

  const sliderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("scoresoccer:fav:teams")
    if (!saved) return
    setFavIds(new Set(JSON.parse(saved)))
  }, [])

  const favoriteDays = useMemo(() => {
    if (!favIds.size) return []
    return days
      .map((group) => ({
        ...group,
        games: group.games.filter((fx: any) => {
          const homeId = fx?.teams?.home?.id
          const awayId = fx?.teams?.away?.id
          return favIds.has(homeId) || favIds.has(awayId)
        }),
      }))
      .filter((g) => g.games.length > 0)
  }, [days, favIds])

  function go(which: "all" | "fav") {
    setActive(which)

    const el = sliderRef.current
    if (!el) return

    const x = which === "all" ? 0 : el.clientWidth
    el.scrollTo({ left: x, behavior: "smooth" })
  }

  return (
    <section className="max-w-6xl mx-auto px-6 pb-12">
      {/* Tabs clean: linha neon no topo do tab ativo */}
      <div className="mb-6 border-b border-white/10 flex gap-8">
        <Tab label="Todos" active={active === "all"} onClick={() => go("all")} />
        <Tab label="Favoritos" active={active === "fav"} onClick={() => go("fav")} />
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="
          flex gap-6 overflow-x-hidden pb-2
          snap-x snap-mandatory scroll-smooth
          [scrollbar-width:none] [-ms-overflow-style:none]
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <style>{`div::-webkit-scrollbar{display:none;}`}</style>

        {/* Página 1 */}
        <div className="snap-start shrink-0 w-full">
          <div className="space-y-8">
            {days.map((group) => (
              <div key={group.date} className="flex justify-center">
                <FixturesCard
                  title={formatDayTitle(group.date)}
                  fixtures={group.games}
                  compact
                />
              </div>
            ))}
          </div>
        </div>

        {/* Página 2 */}
        <div className="snap-start shrink-0 w-full">
          {!favIds.size ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-white/80 font-medium">
                Você ainda não favoritou nenhum time.
              </p>
              <p className="text-white/50 mt-1">
                Marque seus favoritos na página de times.
              </p>
            </div>
          ) : favoriteDays.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-white/80 font-medium">
                Nenhum jogo encontrado para seus favoritos.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {favoriteDays.map((group) => (
                <div key={group.date} className="flex justify-center">
                  <FixturesCard
                    title={formatDayTitle(group.date)}
                    fixtures={group.games}
                    compact
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Tab({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`relative py-3 text-sm font-medium transition-colors ${
        active ? "text-white" : "text-white/55 hover:text-white/80"
      }`}
    >
      {/* linha neon em cima do tab ativo */}
      {active && (
        <span className="absolute left-0 right-0 -top-[1px] h-[2px] bg-[#39FF14] shadow-[0_0_14px_rgba(57,255,20,0.55)]" />
      )}
      {label}
    </button>
  )
}