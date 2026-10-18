import { cookies } from "next/headers";

const COOKIE = "nh_keys";
const MAX_AGE = 60 * 60 * 24 * 30; // 30d

export type StoredKey = {
  key: string;
  expiresAt: number; // ms
  maxUses: number;
  createdAt: number; // ms
};

export type KeysCookie = {
  regular?: StoredKey;
  premium?: StoredKey;
};

export async function readKeysCookie(): Promise<KeysCookie> {
  const store = await cookies();
  const raw = store.get(COOKIE)?.value;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as KeysCookie;
    return parsed ?? {};
  } catch {
    return {};
  }
}

export function isKeyValid(
  k: StoredKey | undefined | null,
): k is StoredKey {
  return (
    !!k &&
    typeof k.key === "string" &&
    typeof k.expiresAt === "number" &&
    k.expiresAt > Date.now()
  );
}

export async function saveKey(
  keyType: "regular" | "premium",
  stored: StoredKey,
): Promise<void> {
  const store = await cookies();
  const current = await readKeysCookie();
  const next: KeysCookie = { ...current, [keyType]: stored };
  store.set(COOKIE, encodeURIComponent(JSON.stringify(next)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}