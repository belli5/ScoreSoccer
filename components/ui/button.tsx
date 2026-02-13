"use client"

import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: "primary" | "dark" | "outline"
}

export default function Button({children, variant = "primary", className = "", ...props}: ButtonProps) {
  const base = "px-4 py-2 rounded-lg font-medium transition"

  const styles = {
    primary: "bg-[#39FF14] text-black hover:brightness-110",
    dark: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "border border-zinc-400 hover:bg-zinc-100",
  }

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
