// src/lib/usedTokens.ts

/**
 * In-memory сховище використаних токенів.
 *
 * ⚠️ Працює лише на одному інстансі сервера (self-hosted / VPS).
 * На Vercel/Netlify кожен serverless-виклик має свою пам'ять —
 * для них потрібен Redis / Vercel KV / Cloudflare KV.
 */

const used = new Map<string, number>();

function cleanup() {
  const now = Date.now();
  for (const [k, v] of used) {
    if (v < now) used.delete(k);
  }
}

export function markUsed(token: string, ttlMs: number) {
  if (used.size > 1000) cleanup();
  used.set(token, Date.now() + ttlMs);
}

export function isUsed(token: string): boolean {
  const until = used.get(token);
  if (!until) return false;
  if (Date.now() > until) {
    used.delete(token);
    return false;
  }
  return true;
}