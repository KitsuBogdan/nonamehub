// src/lib/worker.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";

const WORKER_URL =
  process.env.NONAME_WORKER_URL ?? "https://loader.nonamescr.workers.dev";

const ADMIN_TOKEN = process.env.NONAME_ADMIN_TOKEN;

export type GeneratedKey = {
  key: string;
  status: string;
  config?: {
    expiresDays?: number;
    maxUses?: number;
    name?: string;
  };
};

export class WorkerError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "WorkerError";
  }
}

/** Мінімальний тип для Service Binding — без залежності від @cloudflare/workers-types */
type ServiceBinding = {
  fetch: (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
};

/** Отримує Service Binding LOADER з Cloudflare-контексту, якщо він є. */
function getLoaderBinding(): ServiceBinding | null {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as Record<string, unknown>;
    const binding = env.LOADER;
    if (
      binding &&
      typeof binding === "object" &&
      typeof (binding as ServiceBinding).fetch === "function"
    ) {
      return binding as ServiceBinding;
    }
  } catch {
    /* не Cloudflare — локальна розробка */
  }
  return null;
}

export async function generateKey(options: {
  name?: string;
  expiresDays?: number;
  maxUses?: number;
}): Promise<GeneratedKey> {
  if (!ADMIN_TOKEN) {
    throw new WorkerError(
      "Server is not configured (missing NONAME_ADMIN_TOKEN)",
      500,
      "server_not_configured",
    );
  }

  const url = new URL(`${WORKER_URL.replace(/\/+$/, "")}/gen_key`);

  if (options.name) url.searchParams.set("name", options.name.slice(0, 64));
  if (options.expiresDays != null)
    url.searchParams.set("expires", String(options.expiresDays));
  if (options.maxUses != null)
    url.searchParams.set("max_uses", String(options.maxUses));

  const loader = getLoaderBinding();
  const targetUrl = url.toString();

  let res: Response;
  try {
    if (loader) {
      // Продакшн: через Service Binding (обходить обмеження 1042)
      res = await loader.fetch(targetUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
      });
    } else {
      // Локальна розробка: звичайний fetch
      res = await fetch(targetUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
    }
  } catch {
    throw new WorkerError(
      "Could not reach the key server",
      502,
      "worker_unreachable",
    );
  }

  if (res.status === 401) {
    throw new WorkerError("Invalid admin token", 500, "invalid_token");
  }
  if (res.status === 429) {
    throw new WorkerError("Too many requests", 429, "rate_limited");
  }
  if (res.status === 405) {
    throw new WorkerError("Wrong HTTP method", 500, "method_not_allowed");
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new WorkerError(
      `Worker responded with ${res.status}: ${body.slice(0, 200)}`,
      502,
      "worker_error",
    );
  }

  const data = (await res.json()) as GeneratedKey;

  if (!data.key || typeof data.key !== "string") {
    throw new WorkerError(
      "Worker did not return a key",
      502,
      "malformed_response",
    );
  }

  return data;
}