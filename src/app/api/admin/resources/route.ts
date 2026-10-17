import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { getAllResources, createResource } from "@/lib/resourcesStore";
import type { Resource } from "@/data/resources";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const list = await getAllResources(true);
  return NextResponse.json({ resources: list });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as Resource | null;
  if (!body || !body.slug || !body.title) {
    return NextResponse.json({ error: "bad_body" }, { status: 400 });
  }
  try {
    await createResource(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown" },
      { status: 400 },
    );
  }
}