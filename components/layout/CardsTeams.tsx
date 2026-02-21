"use client"

type Props = {
  name: string
  logo: string
  selected?: boolean
  onClick?: () => void
}

export default function FavoriteSquareCard({
  name,
  logo,
  selected = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative aspect-square rounded-xl border bg-[#0B0F14] p-3",
        "border-zinc-800 hover:border-zinc-600 transition",
        "flex items-center justify-center",
        selected
          ? "border-[#39FF14] shadow-[0_0_18px_rgba(57,255,20,0.45)]"
          : "",
      ].join(" ")}
      title={name}
    >
      {/* estrela (só aparece quando selecionado) */}
      {selected && (
        <span className="absolute right-2 top-2 text-[#39FF14] text-sm">★</span>
      )}

      <img
        src={logo}
        alt={name}
        className="h-10 w-10 object-contain drop-shadow"
      />

      <span className="sr-only">{name}</span>
    </button>
  )
}