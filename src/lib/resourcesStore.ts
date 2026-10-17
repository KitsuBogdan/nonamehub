import { getCloudflareContext } from "@opennextjs/cloudflare";
import { resources as seed, type Resource } from "@/data/resources";

const KEY = "resources:v1";

// ── Cloudflare KV ────────────────────────────────────────
type KV = {
  get: (key: string, type?: "json" | "text") => Promise<unknown>;
  put: (key: string, value: string) => Promise<void>;
};

type CloudflareEnv = {
  RESOURCES_KV?: KV;
};

async function getKV(): Promise<KV | null> {
  try {
    const ctx = getCloudflareContext();
    const env = (ctx.env as CloudflareEnv | undefined) ?? {};
    return env.RESOURCES_KV ?? null;
  } catch {
    return null;
  }
}

// ── Filesystem (dev / self-hosted) ───────────────────────
async function getFs(): Promise<{
  read: () => Promise<Resource[] | null>;
  write: (list: Resource[]) => Promise<void>;
} | null> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const file = path.join(process.cwd(), "data", "resources.json");

    return {
      read: async () => {
        try {
          const raw = await fs.readFile(file, "utf-8");
          const parsed = JSON.parse(raw);
          return Array.isArray(parsed) ? (parsed as Resource[]) : null;
        } catch {
          return null;
        }
      },
      write: async (list) => {
        const dir = path.dirname(file);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(file, JSON.stringify(list, null, 2), "utf-8");
      },
    };
  } catch {
    return null;
  }
}

// ── In-memory fallback ───────────────────────────────────
let memory: Resource[] | null = null;
const memStore = {
  read: async () => memory,
  write: async (list: Resource[]) => {
    memory = [...list];
  },
};

// ── Core ─────────────────────────────────────────────────
async function readList(): Promise<Resource[]> {
  const kv = await getKV();
  if (kv) {
    const data = await kv.get(KEY, "json");
    if (Array.isArray(data)) return data as Resource[];
    await kv.put(KEY, JSON.stringify(seed));
    return [...seed];
  }

  const fs = await getFs();
  if (fs) {
    const data = await fs.read();
    if (data) return data;
    await fs.write(seed);
    return [...seed];
  }

  const data = await memStore.read();
  if (data) return data;
  await memStore.write(seed);
  return [...seed];
}

async function writeList(list: Resource[]): Promise<void> {
  const kv = await getKV();
  if (kv) {
    await kv.put(KEY, JSON.stringify(list));
    return;
  }

  const fs = await getFs();
  if (fs) {
    await fs.write(list);
    return;
  }

  await memStore.write(list);
}

// ── Public API ───────────────────────────────────────────
export async function getAllResources(
  includeDisabled = false,
): Promise<Resource[]> {
  const list = await readList();
  return includeDisabled ? list : list.filter((r) => !r.disabled);
}

export async function getResourceBySlug(
  slug: string,
): Promise<Resource | null> {
  const list = await readList();
  return list.find((r) => r.slug === slug) ?? null;
}

export async function createResource(resource: Resource): Promise<void> {
  const list = await readList();
  if (list.some((r) => r.slug === resource.slug)) {
    throw new Error("slug_exists");
  }
  list.push(resource);
  await writeList(list);
}

export async function updateResource(
  slug: string,
  patch: Partial<Resource>,
): Promise<void> {
  const list = await readList();
  const idx = list.findIndex((r) => r.slug === slug);
  if (idx === -1) throw new Error("not_found");
  list[idx] = { ...list[idx], ...patch, slug };
  await writeList(list);
}

export async function deleteResource(slug: string): Promise<void> {
  const list = await readList();
  await writeList(list.filter((r) => r.slug !== slug));
}

export async function resetResources(): Promise<void> {
  await writeList([...seed]);
}