"use client";

import { useEffect, useState } from "react";
import type { Resource } from "@/data/resources";

type Mode = "list" | "edit" | "create";

const EMPTY: Resource = {
  slug: "",
  title: "",
  description: "",
  category: "Scripts",
  type: "Script",
  tag: "",
  color: "violet",
  version: "0.1.0",
  steps: 1,
  downloads: "0",
  requiresKey: true,
  keyConfig: { expiresDays: 7, maxUses: 100 },
  keyType: "regular",
  linkvertise: [{ url: "", ads: 2, label: "Step 1" }],
  cover: "",
  keyUsage: "",
  disabled: false,
};

export default function AdminClient({
  initialAuthed,
}: {
  initialAuthed: boolean;
}) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [list, setList] = useState<Resource[]>([]);
  const [mode, setMode] = useState<Mode>("list");
  const [draft, setDraft] = useState<Resource>(EMPTY);
  const [busy, setBusy] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/resources");
    if (res.ok) {
      const data = await res.json();
      setList(data.resources ?? []);
    } else if (res.status === 401) {
      setAuthed(false);
    }
  }

  useEffect(() => {
    if (!authed) return;
    // Defer to next microtask so setState in load() runs outside
    // the synchronous effect body.
    void Promise.resolve().then(load);
  }, [authed]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setPassword("");
    } else {
      setError("Wrong password");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setList([]);
  }

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const isNew = mode === "create";
      const url = isNew
        ? "/api/admin/resources"
        : `/api/admin/resources/${draft.slug}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error ?? "Save failed");
        return;
      }
      setMode("list");
      setDraft(EMPTY);
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function remove(slug: string) {
    if (!confirm(`Delete "${slug}"?`)) return;
    await fetch(`/api/admin/resources/${slug}`, { method: "DELETE" });
    await load();
  }

  async function uploadCover(file: File) {
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.url) {
        setDraft((d) => ({ ...d, cover: data.url }));
      } else {
        setError(data.error ?? "Upload failed");
      }
    } finally {
      setBusy(false);
    }
  }

  if (!authed) {
    return (
      <main className="mx-auto max-w-sm px-5 py-20">
        <form
          onSubmit={login}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h1 className="font-[Space_Grotesk] text-xl font-semibold">
            Admin login
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="mt-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          />
          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold"
          >
            Log in
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-[Space_Grotesk] text-2xl font-semibold">
          Admin — Resources
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setDraft(EMPTY);
              setMode("create");
            }}
            className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold"
          >
            + New
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm"
          >
            Log out
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      {mode === "list" && (
        <ul className="mt-6 space-y-2">
          {list.map((r) => (
            <li
              key={r.slug}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 p-3"
            >
              {r.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.cover}
                  alt=""
                  className="h-12 w-20 rounded object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {r.title}
                  {r.disabled && (
                    <span className="ml-2 text-xs text-red-400">
                      [disabled]
                    </span>
                  )}
                </p>
                <p className="text-xs text-zinc-500">
                  {r.slug} · {r.category} · {r.steps} step(s) ·{" "}
                  {r.keyType ?? "regular"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDraft(r);
                  setMode("edit");
                }}
                className="rounded bg-white/10 px-3 py-1 text-xs"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => remove(r.slug)}
                className="rounded bg-red-500/20 px-3 py-1 text-xs text-red-300"
              >
                Delete
              </button>
            </li>
          ))}
          {list.length === 0 && (
            <li className="text-sm text-zinc-500">No resources yet.</li>
          )}
        </ul>
      )}

      {(mode === "edit" || mode === "create") && (
        <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/3 p-4">
          <Field label="Slug (URL)">
            <input
              value={draft.slug}
              onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              disabled={mode === "edit"}
              className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm disabled:opacity-50"
            />
          </Field>

          <Field label="Title">
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={draft.description}
              onChange={(e) =>
                setDraft({ ...draft, description: e.target.value })
              }
              rows={2}
              className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select
                value={draft.category}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    category: e.target.value as Resource["category"],
                  })
                }
                className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
              >
                {["Scripts", "Models", "UI", "Key"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Tag">
              <input
                value={draft.tag}
                onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
                className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
              />
            </Field>

            <Field label="Color">
              <select
                value={draft.color}
                onChange={(e) => setDraft({ ...draft, color: e.target.value })}
                className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
              >
                {["violet", "amber", "emerald", "sky", "rose"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Version">
              <input
                value={draft.version}
                onChange={(e) =>
                  setDraft({ ...draft, version: e.target.value })
                }
                className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
              />
            </Field>

            <Field label="Downloads (display)">
              <input
                value={draft.downloads}
                onChange={(e) =>
                  setDraft({ ...draft, downloads: e.target.value })
                }
                className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
              />
            </Field>

            <Field label="Loader script ID">
              <input
                value={draft.loaderScriptId ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, loaderScriptId: e.target.value })
                }
                placeholder="IWTTGame_v3"
                className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
              />
            </Field>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.requiresKey}
                onChange={(e) =>
                  setDraft({ ...draft, requiresKey: e.target.checked })
                }
              />
              Requires key
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!draft.disabled}
                onChange={(e) =>
                  setDraft({ ...draft, disabled: e.target.checked })
                }
              />
              Disabled (hidden)
            </label>
          </div>

          {!draft.requiresKey && (
            <Field label="Download URL">
              <input
                value={draft.downloadUrl ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, downloadUrl: e.target.value })
                }
                placeholder="https://..."
                className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
              />
            </Field>
          )}

          {draft.requiresKey && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Steps (0 = instant)">
                  <input
                    type="number"
                    min={0}
                    value={draft.steps}
                    onChange={(e) =>
                      setDraft({ ...draft, steps: Number(e.target.value) })
                    }
                    className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                </Field>

                <Field label="Key type">
                  <select
                    value={draft.keyType ?? "regular"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        keyType: e.target.value as "regular" | "premium",
                      })
                    }
                    className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  >
                    <option value="regular">regular</option>
                    <option value="premium">premium</option>
                  </select>
                </Field>

                <Field label="Expires (days)">
                  <input
                    type="number"
                    min={0}
                    value={draft.keyConfig?.expiresDays ?? 7}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        keyConfig: {
                          ...draft.keyConfig,
                          expiresDays: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                </Field>

                <Field label="Max uses">
                  <input
                    type="number"
                    min={0}
                    value={draft.keyConfig?.maxUses ?? 100}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        keyConfig: {
                          ...draft.keyConfig,
                          maxUses: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                </Field>
              </div>

              {draft.steps > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium">Linkvertise steps</p>
                  {Array.from({ length: draft.steps }).map((_, i) => (
                    <div key={i} className="mb-2 flex gap-2">
                      <input
                        value={draft.linkvertise?.[i]?.url ?? ""}
                        onChange={(e) => {
                          const lv = [...(draft.linkvertise ?? [])];
                          lv[i] = {
                            ...(lv[i] ?? { ads: 2 }),
                            url: e.target.value,
                          };
                          setDraft({ ...draft, linkvertise: lv });
                        }}
                        placeholder={`Step ${i + 1} URL`}
                        className="flex-1 rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
                      />
                      <input
                        type="number"
                        value={draft.linkvertise?.[i]?.ads ?? 2}
                        onChange={(e) => {
                          const lv = [...(draft.linkvertise ?? [])];
                          lv[i] = {
                            ...(lv[i] ?? { url: "" }),
                            ads: Number(e.target.value),
                          };
                          setDraft({ ...draft, linkvertise: lv });
                        }}
                        className="w-20 rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}

              <Field label="Key usage hint">
                <input
                  value={draft.keyUsage ?? ""}
                  onChange={(e) =>
                    setDraft({ ...draft, keyUsage: e.target.value })
                  }
                  placeholder="Paste this key into Config.Key..."
                  className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
                />
              </Field>
            </>
          )}

          <Field label="Cover image">
            <div className="flex flex-wrap items-center gap-3">
              {draft.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={draft.cover}
                  alt=""
                  className="h-16 w-24 rounded border border-white/10 object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && uploadCover(e.target.files[0])
                }
                className="text-sm"
              />
              <input
                value={draft.cover ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, cover: e.target.value })
                }
                placeholder="/key-cover.png or /covers/..."
                className="flex-1 rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
              />
            </div>
          </Field>

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={save}
              disabled={busy}
              className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("list");
                setDraft(EMPTY);
                setError(null);
              }}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-400">
        {label}
      </span>
      {children}
    </label>
  );
}