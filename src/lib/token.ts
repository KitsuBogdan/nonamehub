import { TOKEN_SECRET } from "./secrets";

const TTL_MS = 15 * 60 * 1000;

export type TokenPayload = {
  slug: string;
  step: number;
  exp: number;
};

function secretFingerprint(): string {
  const s = TOKEN_SECRET ?? "";
  return `${s.slice(0, 6)}...${s.slice(-4)} (len=${s.length})`;
}

async function getKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(TOKEN_SECRET),
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
  const sigB64 = b64url(sig);

  console.log("[createToken]", {
    secret: secretFingerprint(),
    slug,
    step,
    payloadB64_len: payloadB64.length,
    sig_prefix: sigB64.slice(0, 20),
    sig_len: sigB64.length,
  });

  return `${payloadB64}.${sigB64}`;
}

export async function verifyToken(
  slug: string,
  token: string,
): Promise<TokenPayload | null> {
  console.log("[verifyToken] entry", {
    secret: secretFingerprint(),
    slug,
    token_type: typeof token,
    token_len: typeof token === "string" ? token.length : null,
    token_prefix: typeof token === "string" ? token.slice(0, 40) : null,
  });

  if (!token || typeof token !== "string") {
    console.log("[verifyToken] REJECT: no token");
    return null;
  }

  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) {
    console.log("[verifyToken] REJECT: bad split", { payloadB64: !!payloadB64, sigB64: !!sigB64 });
    return null;
  }

  const key = await getKey();
  const expectedSig = b64url(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64)),
  );

  console.log("[verifyToken] sig compare", {
    expected_prefix: expectedSig.slice(0, 20),
    got_prefix: sigB64.slice(0, 20),
    expected_len: expectedSig.length,
    got_len: sigB64.length,
    match_prefix: expectedSig.slice(0, 20) === sigB64.slice(0, 20),
  });

  if (expectedSig.length !== sigB64.length) {
    console.log("[verifyToken] REJECT: length mismatch");
    return null;
  }

  let diff = 0;
  for (let i = 0; i < expectedSig.length; i++) {
    diff |= expectedSig.charCodeAt(i) ^ sigB64.charCodeAt(i);
  }
  if (diff !== 0) {
    console.log("[verifyToken] REJECT: HMAC mismatch (secret differs or token tampered)");
    return null;
  }

  try {
    const payload = JSON.parse(
      new TextDecoder().decode(unb64url(payloadB64)),
    ) as TokenPayload;
    console.log("[verifyToken] payload decoded", payload);

    if (payload.slug !== slug) {
      console.log("[verifyToken] REJECT: slug mismatch", { expected: slug, got: payload.slug });
      return null;
    }
    if (typeof payload.step !== "number") {
      console.log("[verifyToken] REJECT: bad step");
      return null;
    }
    if (payload.exp < Date.now()) {
      console.log("[verifyToken] REJECT: expired", { exp: payload.exp, now: Date.now() });
      return null;
    }
    console.log("[verifyToken] ACCEPT");
    return payload;
  } catch (e) {
    console.log("[verifyToken] REJECT: parse error", String(e));
    return null;
  }
}

export async function consumeToken(_token: string): Promise<void> {}
