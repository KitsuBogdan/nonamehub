// src/app/api/key/[slug]/route.ts
import { NextResponse } from "next/server";
import { getResource } from "@/data/resources";
import { generateKey, WorkerError } from "@/lib/worker";
import { verifyToken } from "@/lib/token";
import { isUsed, markUsed } from "@/lib/usedTokens";

const TOKEN_TTL_MS = 15 * 60 * 1000;

function reject(code: string, status = 403) {
  return NextResponse.json({ error: code, code }, { status });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = getResource(slug);

  if (!resource) {
    return reject("not_found", 404);
  }

  // 1) Токен у query
  const url = new URL(request.url);
  const token = url.searchParams.get("t") ?? "";
  if (!token) return reject("missing_token");

  // 2) Підпис + TTL
  if (!verifyToken(slug, token)) return reject("invalid_token");

  // 3) Одноразовість
  if (isUsed(token)) return reject("token_used");
  markUsed(token, TOKEN_TTL_MS);

  // 5) Генеруємо ключ
  try {
    const result = await generateKey({
      name: resource.slug,
      expiresDays: resource.keyConfig?.expiresDays ?? 7,
      maxUses: resource.keyConfig?.maxUses ?? 1,
    });

    // 6) Редірект на сторінку ресурсу з ключем у query
    const target = new URL(`/resource/${slug}`, request.url);
    target.searchParams.set("key", result.key);

    return NextResponse.redirect(target, {
      status: 307,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
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