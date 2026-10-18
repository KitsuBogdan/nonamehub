const TTL_MS = 15 * 60 * 1000;

export type TokenPayload = {
  slug: string;
  step: number;
  exp: number;
};

function getTokenSecret(): string {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) {
    throw new Error("TOKEN_SECRET env var is not set");
  }
  return secret;
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getTokenSecret()),
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
  const bin = atob(str.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

export async function createToken(slug: string, step = 0): Promise<string> {
  const payload: TokenPayload = { slug, step, exp: Date.now() + TTL_MS };
  const payloadB64 = b64url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign(
    "HMAC",
    await getKey(),
    new TextEncoder().encode(payloadB64),
  );
  return `${payloadB64}.${b64url(sig)}`;
}

export async function verifyToken(
  slug: string,
  token: string,
): Promise<TokenPayload | null> {
  if (!token || typeof token !== "string") return null;

  let expectedSig: string;
  try {
    expectedSig = b64url(
      await crypto.subtle.sign(
        "HMAC",
        await getKey(),
        new TextEncoder().encode(token.split(".")[0] ?? ""),
      ),
    );
  } catch {
    // TOKEN_SECRET not configured — token can't be verified.
    return null;
  }

  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return null;
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