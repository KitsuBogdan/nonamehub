import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { saveCover } from "@/lib/coversStore";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }

  const result = await saveCover(file);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ url: result.url });
}