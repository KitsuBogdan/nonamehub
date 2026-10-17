export type ResourceCategory = "Scripts" | "Models" | "UI" | "Key";

export type LinkvertiseStep = {
  url: string;
  ads: number;
  label?: string;
};

export type Resource = {
  slug: string;
  title: string;
  description: string;
  category: ResourceCategory;
  type: string;
  tag: string;
  color: string;
  version: string;

  /** 0 = без кроків (прямий ключ), 1+ = Linkvertise кроки */
  steps: number;
  downloads: string;

  requiresKey: boolean;
  downloadUrl?: string;

  keyConfig?: {
    expiresDays?: number;
    maxUses?: number;
  };

  keyType?: "regular" | "premium";

  linkvertise?: LinkvertiseStep[];

  cover?: string;
  keyUsage?: string;
  disabled?: boolean;

  /** ID скрипта у loader worker (для /get_script) */
  loaderScriptId?: string;
};

const REGULAR_URL = "https://link-center.net/1343514/Hlzlwx0Sl3Eb";
const PREMIUM_URL = "https://link-center.net/1343514/Hlzlwx0Sl3Eb";

export const resources: Resource[] = [
  // ─── Scripts ─────────────────────────────────────────────
  {
    slug: "iwttg-v3",
    title: "I Wanna Test The Game v3",
    description:
      "Latest stable release. Full feature set, regular key required.",
    category: "Scripts",
    type: "Script",
    tag: "V3",
    color: "violet",
    version: "3.0.0",
    steps: 1,
    downloads: "1.2k",
    requiresKey: true,
    keyType: "regular",
    keyConfig: { expiresDays: 7, maxUses: 100 },
    linkvertise: [{ url: REGULAR_URL, ads: 2, label: "Step 1 of 1" }],
    loaderScriptId: "IWTTGame_v3",
    keyUsage:
      "Paste this key into Config.Key at the top of the script.",
  },
  {
    slug: "iwttg-v2",
    title: "I Wanna Test The Game v2",
    description:
      "Previous stable release. Archived for legacy compatibility.",
    category: "Scripts",
    type: "Script",
    tag: "V2",
    color: "violet",
    version: "2.0.0",
    steps: 1,
    downloads: "3.4k",
    requiresKey: true,
    keyType: "regular",
    keyConfig: { expiresDays: 7, maxUses: 100 },
    linkvertise: [{ url: REGULAR_URL, ads: 2, label: "Step 1 of 1" }],
    loaderScriptId: "IWTTGame_v2",
    keyUsage:
      "Paste this key into Config.Key at the top of the script.",
  },
  {
    slug: "iwttg-reworked-beta",
    title: "I Wanna Test The Game (Reworked Beta)",
    description:
      "Experimental rework. Archived — may contain bugs.",
    category: "Scripts",
    type: "Script",
    tag: "BETA",
    color: "violet",
    version: "0.62.0-beta",
    steps: 1,
    downloads: "800",
    requiresKey: true,
    keyType: "regular",
    keyConfig: { expiresDays: 7, maxUses: 100 },
    linkvertise: [{ url: REGULAR_URL, ads: 2, label: "Step 1 of 1" }],
    loaderScriptId: "IWTTGame_reworked_beta",
    keyUsage:
      "Paste this key into Config.Key at the top of the script.",
  },

  // ─── Keys (universal access) ─────────────────────────────
  {
    slug: "nn-key",
    title: "Universal Access Key",
    description:
      "One key for all NoNameHub scripts. Get it once, use it everywhere.",
    category: "Key",
    type: "Key",
    tag: "KEY",
    color: "violet",
    version: "0.1.0",
    steps: 1,
    downloads: "0",
    requiresKey: true,
    keyType: "regular",
    keyConfig: { expiresDays: 7, maxUses: 100 },
    linkvertise: [{ url: REGULAR_URL, ads: 2, label: "Step 1 of 1" }],
    cover: "/key-cover.png",
    keyUsage:
      "Paste this key into Config.Key at the top of any NoNameHub script.",
  },
  {
    slug: "nn-key-premium",
    title: "Premium Access Key",
    description:
      "Premium key for advanced features. Requires completing 3 steps (2 ads each).",
    category: "Key",
    type: "Key",
    tag: "PREMIUM",
    color: "amber",
    version: "0.1.0",
    steps: 3,
    downloads: "0",
    requiresKey: true,
    keyType: "premium",
    keyConfig: { expiresDays: 30, maxUses: 100 },
    linkvertise: [
      { url: PREMIUM_URL, ads: 2, label: "Step 1 of 3" },
      { url: PREMIUM_URL, ads: 2, label: "Step 2 of 3" },
      { url: PREMIUM_URL, ads: 2, label: "Step 3 of 3" },
    ],
    cover: "/key-cover-premium.png",
    keyUsage:
      "Paste this key into Config.Key at the top of the premium script.",
  },
];

export function getCategories(): ResourceCategory[] {
  return ["Scripts", "Models", "UI", "Key"];
}

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getSimilar(slug: string, limit = 3): Resource[] {
  const current = getResource(slug);
  if (!current) return [];
  return resources
    .filter((r) => r.slug !== slug && r.category === current.category)
    .slice(0, limit);
}