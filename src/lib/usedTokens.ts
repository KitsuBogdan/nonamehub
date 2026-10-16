// src/lib/usedTokens.ts
type Entry = { expiresAt: number };

const store = new Map<string, Entry>();

export function isUsed(token: string): boolean {
  const entry = store.get(token);
  if (!entry) return false;
  if (entry.expiresAt < Date.now()) {
    store.delete(token);
    return false;
  }
  return true;
}

export function markUsed(token: string, ttlMs = 10 * 60 * 1000): void {
  store.set(token, { expiresAt: Date.now() + ttlMs });
  // Періодичне прибирання старих ключів
  if (store.size > 1000) {
    const now = Date.now();
    for (const [k, v] of store) {
      if (v.expiresAt < now) store.delete(k);
    }
  }
}