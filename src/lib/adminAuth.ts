import { cookies } from "next/headers";
import crypto from "crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const COOKIE = "nh_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

type CloudflareEnv = {
  ADMIN_SECRET?: string;
};

function getSecret(): string {
  try {
    const ctx = getCloudflareContext();
    const env = (ctx.env as CloudflareEnv | undefined) ?? {};
    if (env.ADMIN_SECRET) return env.ADMIN_SECRET;
  } catch {
    /* not on Cloudflare */
  }
  return process.env.ADMIN_SECRET ?? "change-me-please";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function makeToken(): string {
  const payload = `${Date.now()}.${crypto.randomBytes(8).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const sig = parts[2];
  const expected = sign(payload);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  return !!token && verifyToken(token);
}

export async function setAdminCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}
