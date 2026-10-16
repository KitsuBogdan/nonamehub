// src/lib/token.ts
const SECRET = process.env.TOKEN_SECRET ?? "change-me-in-production";
const TTL_MS = 10 * 60 * 1000; // 10 хв на весь флоу (усі 3 кроки)

export type TokenPayload = {
  slug: string;
  step: number;
  exp: number;
};

async function getKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  for (let i = 0; i < arr.length; i++) str += String.fromCharCode(arr[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function unb64url(str: string): Uint8Array {
  const pad = "=".repeat((4 - (str.length % 4)) % 4);
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

export async function createToken(slug: string, step = 0): Promise<string> {
  const payload: TokenPayload = {
    slug,
    step,
    exp: Date.now() + TTL_MS,
  };
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = b64url(new TextEncoder().encode(payloadStr));

  const key = await getKey();
  const sigBuf = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64),
  );
  const sigB64 = b64url(sigBuf);

  return `${payloadB64}.${sigB64}`;
}

export async function verifyToken(
  slug: string,
  token: string,
): Promise<TokenPayload | null> {
  if (!token || typeof token !== "string") return null;

  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return null;

  const key = await getKey();
  const sigBuf = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64),
  );
  const expectedSig = b64url(sigBuf);

  // timing-safe порівняння
  if (expectedSig.length !== sigB64.length) return null;
  let diff = 0;
  for (let i = 0; i < expectedSig.length; i++) {
    diff |= expectedSig.charCodeAt(i) ^ sigB64.charCodeAt(i);
  }
  if (diff !== 0) return null;

  try {
    const json = new TextDecoder().decode(unb64url(payloadB64));
    const payload = JSON.parse(json) as TokenPayload;

    if (payload.slug !== slug) return null;
    if (typeof payload.step !== "number") return null;
    if (payload.exp < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}