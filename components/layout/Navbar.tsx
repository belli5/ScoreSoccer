"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-[#39FF14] text-black shadow-[0_0_18px_#39FF14]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          ScoreSoccer
        </Link>

        {/* Botão só no mobile */}
        <button
          type="button"
          className="md:hidden rounded-lg border border-black/20 px-3 py-2 text-sm font-semibold"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          Menu
        </button>

        {/* Seu UL reaproveitado */}
        <ul
          className={`
            text-sm font-semibold
            md:flex md:items-center md:gap-6
            ${open ? "flex" : "hidden"}
            absolute left-0 top-full w-full flex-col gap-2 bg-[#39FF14] px-6 py-4 shadow-[0_10px_20px_rgba(0,0,0,0.15)]
            md:static md:w-auto md:flex-row md:bg-transparent md:p-0 md:shadow-none
          `}
        >
          <li>
            <Link
              className="block hover:underline underline-offset-4 md:inline"
              href="/"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="block hover:underline underline-offset-4 md:inline"
              href="/destaques"
              onClick={() => setOpen(false)}
            >
              Ao Vivo
            </Link>
          </li>
          <li>
            <Link
              className="block hover:underline underline-offset-4 md:inline"
              href="/ligas"
              onClick={() => setOpen(false)}
            >
              Ligas
            </Link>
          </li>
          <li>
            <Link
              className="block hover:underline underline-offset-4 md:inline"
              href="/favoritos"
              onClick={() => setOpen(false)}
            >
              Favoritos
            </Link>
          </li>
          <li>
            <Link
              className="block hover:underline underline-offset-4 md:inline"
              href="/geral"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}