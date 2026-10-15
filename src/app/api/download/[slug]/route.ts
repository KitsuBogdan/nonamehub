// app/api/download/[slug]/route.ts
import { NextResponse } from "next/server";
import { getResource } from "@/data/resources";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = getResource(slug);

  if (!resource) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  // TODO: замінити на реальне посилання з БД / R2 / S3
  // Поки що — плейсхолдер, щоб перевірити флоу.
  const fileUrl = `https://example.com/files/${resource.slug}.zip`;

  // Тимчасово редіректимо на файл.
  // Пізніше тут буде: отримання підписаного URL, видача ключа, логування тощо.
  return NextResponse.redirect(fileUrl);
}