export const SITE = {
  name: "NoNameHub",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nonamehub.fyi",
  discord: "https://discord.gg/aJeWPZqKgs",
  youtube: "https://www.youtube.com/@nnscripts",
  loader:
    process.env.NEXT_PUBLIC_LOADER_URL ?? "https://api.nonamehub.fyi",
} as const;