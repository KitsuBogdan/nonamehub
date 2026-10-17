import { NextResponse } from "next/server";
import { getResource } from "@/data/resources";
import { generateKey, WorkerError } from "@/lib/worker";
import { createToken, verifyToken } from "@/lib/token";
import { isUsed, markUsed } from "@/lib/usedTokens";

const TOKEN_TTL_MS = 15 * 60 * 1000;

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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource || resource.disabled) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (!resource.requiresKey) {
    return NextResponse.json({ error: "no_key_required" }, { status: 400 });
  }

  let body: { token?: string; hash?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const token = String(body.token ?? "").trim();
  const hash = String(body.hash ?? "").trim();
  if (!token || !hash) {
    return NextResponse.json({ error: "missing_params" }, { status: 400 });
  }

  const payload = await verifyToken(slug, token);
  if (!payload) {
    return NextResponse.json({ error: "invalid_token" }, { status: 403 });
  }
  if (isUsed(token)) {
    return NextResponse.json({ error: "token_used" }, { status: 403 });
  }

  const ok = await verifyLinkvertiseHash(hash);
  if (!ok) {
    return NextResponse.json({ error: "invalid_hash" }, { status: 403 });
  }

  markUsed(token, TOKEN_TTL_MS);

  const totalSteps = resource.steps > 0 ? resource.steps : 1;
  const currentStep = payload.step;
  const nextStep = currentStep + 1;

  // Проміжний крок → новий токен + посилання на наступний Linkvertise
  if (nextStep < totalSteps) {
    const nextToken = await createToken(slug, nextStep);
    const nextUrl =
      resource.linkvertise?.[nextStep]?.url ??
      resource.linkvertise?.[0]?.url ??
      "";

    return NextResponse.json({
      ok: true,
      progress: { next: nextStep + 1, total: totalSteps },
      nextStep,
      nextToken,
      nextUrl,
    });
  }

  // Останній крок → генеруємо ключ
  try {
    const result = await generateKey({
      name: slug,
      expiresDays: resource.keyConfig?.expiresDays ?? 7,
      maxUses: resource.keyConfig?.maxUses ?? 1,
      keyType: resource.keyType ?? "regular",
    });
    return NextResponse.json({ ok: true, key: result.key });
  } catch (err) {
    if (err instanceof WorkerError) {
      return NextResponse.json(
        { error: err.code ?? "worker_error" },
        { status: 502 },
      );
    }
    console.error("Unexpected key error:", err);
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}