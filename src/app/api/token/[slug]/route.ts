// src/app/api/token/[slug]/route.ts
import { NextResponse } from "next/server";
import { getResource } from "@/data/resources";
import { signToken, TOKEN_TTL_MS } from "@/lib/token";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = getResource(slug);

  if (!resource) {
    return NextResponse.json(
      { error: "Resource not found", code: "not_found" },
      { status: 404 },
    );
  }

  try {
    const token = signToken(slug);
    return NextResponse.json(
      {
        token,
        expiresAt: Date.now() + TOKEN_TTL_MS,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (err) {
    console.error("Token issue error:", err);
    return NextResponse.json(
      { error: "Server not configured", code: "server_not_configured" },
      { status: 500 },
    );
  }
}