import { NextResponse } from "next/server";
import { getResource } from "@/data/resources";
import { generateKey, WorkerError } from "@/lib/worker";

export async function POST(
  _req: Request,
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
  if (resource.steps > 0) {
    return NextResponse.json({ error: "steps_required" }, { status: 400 });
  }

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
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}