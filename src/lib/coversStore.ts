import { getCloudflareContext } from "@opennextjs/cloudflare";

type R2Object = {
  body: ReadableStream;
  httpMetadata?: { contentType?: string };
};

type R2 = {
  put: (
    key: string,
    value: ArrayBuffer,
    opts?: { httpMetadata?: { contentType?: string } },
  ) => Promise<unknown>;
  get: (key: string) => Promise<R2Object | null>;
};

type CloudflareEnv = {
  RESOURCES_R2?: R2;
};

async function getR2(): Promise<R2 | null> {
  try {
    const ctx = getCloudflareContext();
    const env = (ctx.env as CloudflareEnv | undefined) ?? {};
    return env.RESOURCES_R2 ?? null;
  } catch {
    return null;
  }
}

export async function saveCover(
  file: File,
): Promise<{ url: string } | { error: string }> {
  if (!file.type.startsWith("image/")) return { error: "not_image" };
  if (file.size > 3 * 1024 * 1024) return { error: "too_large" };

  const ext = (file.name.split(".").pop() ?? "png").toLowerCase();
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = await file.arrayBuffer();

  // ── R2 (production CF) ─────────────────────────────────
  const r2 = await getR2();
  if (r2) {
    await r2.put(`covers/${name}`, buffer, {
      httpMetadata: { contentType: file.type },
    });
    return { url: `/api/covers/${name}` };
  }

  // ── Filesystem (dev) ───────────────────────────────────
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const dir = path.join(process.cwd(), "public", "covers");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, name), Buffer.from(buffer));
    return { url: `/covers/${name}` };
  } catch (err) {
    console.error("Cover save failed:", err);
    return { error: "storage_unavailable" };
  }
}

export async function getCover(name: string): Promise<R2Object | null> {
  const r2 = await getR2();
  if (!r2) return null;
  return r2.get(`covers/${name}`);
}