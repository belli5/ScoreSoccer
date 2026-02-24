type Entry = { expiresAt: number; value: any }

const store = new Map<string, Entry>()

export function getCache(key: string) {
  const e = store.get(key)
  if (!e) return null
  if (Date.now() > e.expiresAt) {
    store.delete(key)
    return null
  }
  return e.value
}

export function setCache(key: string, value: any, ttlMs: number) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs })
}