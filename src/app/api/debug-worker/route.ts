// src/app/api/debug-worker/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const WORKER_URL = process.env.NONAME_WORKER_URL ?? "https://loader.nonamescr.workers.dev";
  const ADMIN_TOKEN = process.env.NONAME_ADMIN_TOKEN;

  if (!ADMIN_TOKEN) {
    return NextResponse.json({
      ok: false,
      reason: "NONAME_ADMIN_TOKEN not set",
    });
  }

  const url = new URL(`${WORKER_URL.replace(/\/+$/, "")}/gen_key`);
  url.searchParams.set("name", "debug");
  url.searchParams.set("expires", "1");
  url.searchParams.set("max_uses", "1");

  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
    });

    const body = await res.text();

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      tokenLength: ADMIN_TOKEN.length,
      tokenPrefix: ADMIN_TOKEN.slice(0, 4) + "****",
      workerUrl: WORKER_URL,
      body: body.slice(0, 500),
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      reason: "fetch failed",
      error: String(err),
    });
  }
}