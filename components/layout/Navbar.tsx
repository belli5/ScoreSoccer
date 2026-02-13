"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#39FF14] text-black shadow-[0_0_18px_#39FF14]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Nome */}
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          ScoreSoccer
        </Link>

        {/* Menu */}
        <ul className="flex items-center gap-6 text-sm font-semibold">
          <li><Link className="hover:underline underline-offset-4" href="/">Home</Link></li>
          <li><Link className="hover:underline underline-offset-4" href="/destaques">Ao Vivo</Link></li>
          <li><Link className="hover:underline underline-offset-4" href="/ligas">Ligas</Link></li>
          <li><Link className="hover:underline underline-offset-4" href="/times">Times</Link></li>
          <li><Link className="hover:underline underline-offset-4" href="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  )
}
