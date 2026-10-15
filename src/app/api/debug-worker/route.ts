// src/app/api/debug-worker/route.ts
import { NextResponse } from "next/server";
import { generateKey, WorkerError } from "@/lib/worker";

export async function GET() {
  try {
    const result = await generateKey({
      name: "debug",
      expiresDays: 1,
      maxUses: 1,
    });
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    if (err instanceof WorkerError) {
      return NextResponse.json({
        ok: false,
        code: err.code,
        status: err.status,
        message: err.message,
      });
    }
    return NextResponse.json({ ok: false, error: String(err) });
  }
}