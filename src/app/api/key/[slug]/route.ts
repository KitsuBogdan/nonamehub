// src/app/api/key/[slug]/route.ts
import { NextResponse } from "next/server";
import { getResource } from "@/data/resources";
import { generateKey, WorkerError } from "@/lib/worker";
import { createToken, verifyToken } from "@/lib/token";
import { isUsed, markUsed } from "@/lib/usedTokens";

const TOKEN_TTL_MS = 10 * 60 * 1000;

const DEFAULT_REGULAR_URL =
  "https://link-center.net/1343514/Hlzlwx0Sl3Eb";

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

/**
 * POST /api/key/[slug]
 * Body: { token: string, hash: string }
 *
 * Відповідь:
 *   { ok: true, key: "NNK-xxx" }                       — фінальний ключ
 *   { ok: true, nextStep: N, nextToken, nextUrl }      — потрібен наступний крок
 *   { error: "code", status?: number }                 — помилка
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const resource = getResource(slug);
  if (!resource) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // ── Парсимо body
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

  // ── Токен: валідність + крок
  const payload = await verifyToken(slug, token);
  if (!payload) {
    return NextResponse.json({ error: "invalid_token" }, { status: 403 });
  }

  // ── Токен одноразовий
  if (isUsed(token)) {
    return NextResponse.json({ error: "token_used" }, { status: 403 });
  }

  // ── Перевірка Linkvertise hash
  const hashOk = await verifyLinkvertiseHash(hash);
  if (!hashOk) {
    return NextResponse.json({ error: "invalid_hash" }, { status: 403 });
  }

  // ── Позначаємо токен використаним (одноразовий)
  markUsed(token, TOKEN_TTL_MS);

  // ── Скільки кроків потрібно
  const totalSteps =
    resource.keyType === "premium" && resource.linkvertise?.length
      ? resource.linkvertise.length
      : 1;

  const currentStep = payload.step;
  const nextStep = currentStep + 1;

  // ── Ще не всі кроки → видаємо новий токен і посилання на наступний Linkvertise
  if (nextStep < totalSteps) {
    const nextToken = await createToken(slug, nextStep);

    const nextUrl =
      resource.keyType === "premium" && resource.linkvertise
        ? resource.linkvertise[nextStep].url
        : DEFAULT_REGULAR_URL;

    return NextResponse.json({
      ok: true,
      nextStep,
      nextToken,
      nextUrl,
    });
  }

  // ── Останній крок → генеруємо ключ
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

/**
 * GET /api/key/[slug]
 * Редірект із query-параметрами (для сумісності з Linkvertise-поверненням,
 * якщо браузер не зберіг localStorage — видаємо помилку).
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  // Якщо приходить готовий ключ (після нашого внутрішнього редіректу) —
  // просто пропускаємо далі.
  if (key) {
    return NextResponse.redirect(
      new URL(`/resource/${slug}?key=${encodeURIComponent(key)}`, request.url),
      { status: 307 },
    );
  }

  // Інакше — повертаємо користувача на сторінку ресурсу з помилкою
  return NextResponse.redirect(
    new URL(`/resource/${slug}?err=invalid_flow`, request.url),
    { status: 307 },
  );
}