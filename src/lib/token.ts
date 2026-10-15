// src/lib/token.ts
import crypto from "crypto";

const SECRET = process.env.NONAME_TOKEN_SECRET ?? "";

/** TTL токена — 15 хвилин. Достатньо, щоб пройти Linkvertise. */
export const TOKEN_TTL_MS = 15 * 60 * 1000;

function hmac(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

/**
 * Формат токена: <expiresAt>.<signature>
 * payload підпису: <slug>.<expiresAt>
 */
export function signToken(slug: string, ttlMs = TOKEN_TTL_MS): string {
  if (!SECRET) {
    throw new Error("NONAME_TOKEN_SECRET is not configured");
  }
  const exp = Date.now() + ttlMs;
  const sig = hmac(`${slug}.${exp}`);
  return `${exp}.${sig}`;
}

export function verifyToken(slug: string, token: string): boolean {
  if (!SECRET) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [expStr, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp)) return false;
  if (Date.now() > exp) return false;

  const expected = hmac(`${slug}.${exp}`);
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;

  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Перевіряє, що referer походить від доменів Linkvertise. */
export function isLinkvertiseReferer(referer: string): boolean {
  if (!referer) return false;
  try {
    const url = new URL(referer);
    const host = url.hostname.toLowerCase();
    return (
      host === "linkvertise.com" ||
      host.endsWith(".linkvertise.com") ||
      host === "linkvertise.net" ||
      host.endsWith(".linkvertise.net") ||
      host === "linkvertise.de" ||
      host.endsWith(".linkvertise.de") ||
      host === "link-to.net" ||
      host.endsWith(".link-to.net") ||
      host === "link-to.me" ||
      host.endsWith(".link-to.me")
    );
  } catch {
    return false;
  }
}