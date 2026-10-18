import { NextResponse } from "next/server";
import { getResourceBySlug } from "@/lib/resourcesStore";
import { generateKey, WorkerError } from "@/lib/worker";
import { createToken, verifyToken } from "@/lib/token";
import { readKeysCookie, isKeyValid, saveKey } from "@/lib/keysCookie";

type LvVerifyResult =
  | { ok: true; valid: boolean }
  | {
      ok: false;
      code:
        | "linkvertise_not_configured"
        | "linkvertise_unreachable"
        | "linkvertise_bad_response"
        | "linkvertise_bad_token";
      detail: string;
    };

const HASH_LENGTH = 64;

async function verifyLinkvertiseHash(hash: string): Promise<LvVerifyResult> {
  const token = process.env.LINKVERTISE_ANTI_BYPASS_TOKEN;
  if (!token) {
    return {
      ok: false,
      code: "linkvertise_not_configured",
      detail: "LINKVERTISE_ANTI_BYPASS_TOKEN not set",
    };
  }

  if (hash.length !== HASH_LENGTH || /\s/.test(hash)) {
    return {
      ok: false,
      code: "linkvertise_bad_response",
      detail: `hash must be exactly ${HASH_LENGTH} chars without whitespace (got ${hash.length})`,
    };
  }

  const baseUrl =
    process.env.LINKVERTISE_API_URL ||
    "https://publisher.linkvertise.com/api/v1/anti_bypassing";
  const url = `${baseUrl}?token=${encodeURIComponent(token)}&hash=${encodeURIComponent(hash)}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    return { ok: false, code: "linkvertise_unreachable", detail: String(err) };
  }

  const ct = res.headers.get("content-type") ?? "";
  const text = (await res.text()).trim();

  if (
    ct.includes("text/html") ||
    text.startsWith("<!doctype") ||
    text.startsWith("<html") ||
    res.status === 302
  ) {
    return {
      ok: false,
      code: "linkvertise_bad_response",
      detail: `got HTML/redirect (status ${res.status}); hash format may be invalid`,
    };
  }

  if (text.toLowerCase().includes("invalid token")) {
    return { ok: false, code: "linkvertise_bad_token", detail: text };
  }

  if (!res.ok) {
    return {
      ok: false,
      code: "linkvertise_bad_response",
      detail: `HTTP ${res.status}: ${text.slice(0, 120)}`,
    };
  }

  try {
    const data = JSON.parse(text);
    if (typeof data?.status === "boolean") {
      return { ok: true, valid: data.status };
    }
    return {
      ok: false,
      code: "linkvertise_bad_response",
      detail: `unexpected JSON shape: ${text.slice(0, 120)}`,
    };
  } catch {
    const upper = text.toUpperCase();
    if (upper === "TRUE") return { ok: true, valid: true };
    if (upper === "FALSE") return { ok: true, valid: false };
    return {
      ok: false,
      code: "linkvertise_bad_response",
      detail: `unrecognized format: ${text.slice(0, 120)}`,
    };
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource || resource.disabled) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (!resource.requiresKey) {
    return NextResponse.json({ error: "no_key_required" }, { status: 400 });
  }

  const keyType = resource.keyType ?? "regular";

  // Return existing valid key immediately — no Linkvertise re-check, no new worker call
  const existing = await readKeysCookie();
  if (isKeyValid(existing[keyType])) {
    const k = existing[keyType]!;
    return NextResponse.json({
      ok: true,
      key: k.key,
      expiresAt: k.expiresAt,
      maxUses: k.maxUses,
      existing: true,
    });
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

  const lv = await verifyLinkvertiseHash(hash);
  if (!lv.ok) {
    console.error("[key] linkvertise failed:", lv.code, "|", lv.detail);
    const status = lv.code === "linkvertise_bad_token" ? 500 : 502;
    return NextResponse.json({ error: lv.code, detail: lv.detail }, { status });
  }
  if (!lv.valid) {
    return NextResponse.json(
      {
        error: "invalid_hash",
        hint: "Hash expired (10s TTL), already used, or invalid.",
      },
      { status: 403 },
    );
  }

  const totalSteps = resource.steps > 0 ? resource.steps : 1;
  const nextStep = payload.step + 1;

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

  const expiresDays = resource.keyConfig?.expiresDays ?? 2;
  const maxUses = resource.keyConfig?.maxUses ?? 75;

  try {
    const result = await generateKey({
      name: slug,
      expiresDays,
      maxUses,
      keyType,
    });

    const now = Date.now();
    const stored = {
      key: result.key,
      expiresAt: now + expiresDays * 24 * 60 * 60 * 1000,
      maxUses,
      createdAt: now,
    };
    await saveKey(keyType, stored);

    return NextResponse.json({
      ok: true,
      key: stored.key,
      expiresAt: stored.expiresAt,
      maxUses: stored.maxUses,
      existing: false,
    });
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