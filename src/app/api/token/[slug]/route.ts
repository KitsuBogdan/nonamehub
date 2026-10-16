// src/app/api/token/[slug]/route.ts
import { NextResponse } from "next/server";
import { getResource } from "@/data/resources";
import { createToken } from "@/lib/token";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const token = await createToken(slug, 0);
  return NextResponse.json(
    { token },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}