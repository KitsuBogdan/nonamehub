import { NextResponse } from "next/server";
import { getResourceBySlug } from "@/lib/resourcesStore";
import { generateKey, WorkerError } from "@/lib/worker";
import { readKeysCookie, isKeyValid, saveKey } from "@/lib/keysCookie";

export async function POST(
  _req: Request,
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
  if (resource.steps > 0) {
    return NextResponse.json({ error: "steps_required" }, { status: 400 });
  }

  const keyType = resource.keyType ?? "regular";

  // Return existing valid key if present
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
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}