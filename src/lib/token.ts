import { getCloudflareContext } from "@opennextjs/cloudflare";

const TTL_MS = 15 * 60 * 1000;

export type TokenPayload = {
  slug: string;
  step: number;
  exp: number;
};

type CloudflareEnv = {
  NONAME_TOKEN_SECRET?: string;
};

function getSecret(): string {
  try {
    const ctx = getCloudflareContext();
    const env = (ctx.env as CloudflareEnv | undefined) ?? {};
    if (env.NONAME_TOKEN_SECRET) return env.NONAME_TOKEN_SECRET;
  } catch {
    /* not on Cloudflare */
  }
  return process.env.NONAME_TOKEN_SECRET ?? "change-me-in-production";
}

async function getKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
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
  const payload: TokenPayload = { slug, step, exp: Date.now() + TTL_MS };
  const payloadB64 = b64url(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await getKey();
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64),
  );
  return `${payloadB64}.${b64url(sig)}`;
}

export async function verifyToken(
  slug: string,
  token: string,
): Promise<TokenPayload | null> {
  if (!token || typeof token !== "string") return null;
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return null;

  const key = await getKey();
  const expectedSig = b64url(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64)),
  );

  if (expectedSig.length !== sigB64.length) return null;
  let diff = 0;
  for (let i = 0; i < expectedSig.length; i++) {
    diff |= expectedSig.charCodeAt(i) ^ sigB64.charCodeAt(i);
  }
  if (diff !== 0) return null;

  try {
    const payload = JSON.parse(
      new TextDecoder().decode(unb64url(payloadB64)),
    ) as TokenPayload;
    if (payload.slug !== slug) return null;
    if (typeof payload.step !== "number") return null;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
