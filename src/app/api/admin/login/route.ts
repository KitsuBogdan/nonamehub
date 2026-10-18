import { NextResponse } from "next/server";
import { setAdminCookie, verifyAdminPassword } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({}));

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "admin_not_configured", detail: "ADMIN_PASSWORD is not set" },
      { status: 500 },
    );
  }

  const input = typeof password === "string" ? password : "";
  const ok = verifyAdminPassword(input, expected);
  if (!ok) {
    // Slow down brute-force from a warm isolate.
    // Cold-isolate reset + CF rate limiting are separate layers (see notes).
    await new Promise((r) => setTimeout(r, 1000));
    return NextResponse.json({ error: "wrong_password" }, { status: 401 });
  }

  if (!process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { error: "admin_not_configured", detail: "ADMIN_SECRET is not set" },
      { status: 500 },
    );
  }

  try {
    await setAdminCookie();
  } catch (err) {
    console.error("[admin/login] failed to set cookie:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}