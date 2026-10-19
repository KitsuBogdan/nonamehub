// src/lib/urls.ts
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nonamehub.fyi";

export const URLS = {
  home: SITE_URL,
  explore: `${SITE_URL}/#catalog`,
  howItWorks: `${SITE_URL}/#how-it-works`,
  resources: `${SITE_URL}/resources`,
  about: `${SITE_URL}/about`,
  lib: `${SITE_URL}/lib`,
  wiki: `${SITE_URL}/wiki`,
  terms: `${SITE_URL}/terms`,
  privacy: `${SITE_URL}/privacy`,
} as const;