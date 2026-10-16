// src/app/api/key/[slug]/route.ts
import { NextResponse } from "next/server";
import { getResource } from "@/data/resources";
import { generateKey, WorkerError } from "@/lib/worker";
import { verifyToken } from "@/lib/token";
import { isUsed, markUsed } from "@/lib/usedTokens";

const TOKEN_TTL_MS = 5 * 60 * 1000;

function reject(code: string, status = 403) {
  return NextResponse.json({ error: code, code }, { status });
}

async function verifyLinkvertiseHash(hash: string): Promise<boolean> {
  const token = process.env.LINKVERTISE_ANTI_BYPASS_TOKEN;
  if (!token) {
    console.error("LINKVERTISE_ANTI_BYPASS_TOKEN not configured");
    return false;
  }
  try {
    const url =
      `https://publisher.linkvertise.com/api/v1/anti_bypassing` +
      `?token=${encodeURIComponent(token)}` +
      `&hash=${encodeURIComponent(hash)}`;
    const res = await fetch(url, { method: "POST" });
    const text = (await res.text()).trim();
    console.log("[linkvertise] anti_bypassing:", text);
    return text.toUpperCase().includes("TRUE");
  } catch (err) {
    console.error("Linkvertise verify error:", err);
    return false;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return reject("not_found", 404);

  const url = new URL(request.url);
  const token = url.searchParams.get("t") ?? "";
  const hash = url.searchParams.get("hash") ?? "";

  // 1) Токен
  if (!token) return reject("missing_token");
  if (!verifyToken(slug, token)) return reject("invalid_token");

  // 2) Linkvertise hash (якщо передано)
  if (hash) {
    const ok = await verifyLinkvertiseHash(hash);
    if (!ok) return reject("invalid_hash");
  }

  // 3) Одноразовість
  if (isUsed(token)) return reject("token_used");
  markUsed(token, TOKEN_TTL_MS);

  // 4) Генеруємо ключ
  try {
    const result = await generateKey({
      name: resource.slug,
      expiresDays: resource.keyConfig?.expiresDays ?? 7,
      maxUses: resource.keyConfig?.maxUses ?? 1,
    });

    const target = new URL(`/resource/${slug}`, request.url);
    target.searchParams.set("key", result.key);

    return NextResponse.redirect(target, {
      status: 307,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (err) {
    if (err instanceof WorkerError) {
      const target = new URL(`/resource/${slug}`, request.url);
      target.searchParams.set("err", err.code ?? "unknown");
      return NextResponse.redirect(target, { status: 307 });
    }
    console.error("Unexpected key error:", err);
    return reject("unexpected", 500);
  }
}
