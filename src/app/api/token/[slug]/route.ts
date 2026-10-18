import { NextResponse } from "next/server";
import { getResourceBySlug } from "@/lib/resourcesStore";
import { createToken } from "@/lib/token";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource || resource.disabled) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const token = await createToken(slug, 0);
  return NextResponse.json(
    { token },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}