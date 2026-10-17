import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({}));
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "admin_not_configured" },
      { status: 500 },
    );
  }
  if (password !== expected) {
    return NextResponse.json({ error: "wrong_password" }, { status: 401 });
  }
  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
