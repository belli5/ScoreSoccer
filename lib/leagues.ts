export const LEAGUES = [
  { key: "serieA", label: "Série A", id: "71" },
  { key: "premier", label: "Premier League", id: "39" },
  { key: "laliga", label: "La Liga", id: "140" },
  { key: "bundesliga", label: "Bundesliga", id: "78" },
] as const

export type LeagueKey = typeof LEAGUES[number]["key"]