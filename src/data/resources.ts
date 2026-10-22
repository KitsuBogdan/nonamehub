export type ResourceCategory = "Scripts" | "UI" | "Key";

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

  /** 0 = no steps (direct key), 1+ = Linkvertise steps */
  steps: number;

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

  /** Script ID in the loader worker (for /get_script) */
  loaderScriptId?: string;
};

const LINKVERTISE_URL = "https://link-center.net/1343514/Hlzlwx0Sl3Eb";
const KEY_USAGE = "Paste into any NoNameHub script that requires a key.";

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
    requiresKey: true,
    keyType: "regular",
    keyConfig: { expiresDays: 2, maxUses: 75 },
    linkvertise: [{ url: LINKVERTISE_URL, ads: 2, label: "Step 1 of 1" }],
    cover: "/IWTTG-v3-cover.webp",
    loaderScriptId: "IWTTGame_v3",
    keyUsage: KEY_USAGE,
  },
  {
    slug: "iwttg-v3-premium",
    title: "I Wanna Test The Game v3 Premium",
    description:
      "Premium build of v3 with extra features and priority access. Requires a premium key.",
    category: "Scripts",
    type: "Script",
    tag: "PREMIUM",
    color: "amber",
    version: "3.0.0-premium",
    steps: 3,
    requiresKey: true,
    keyType: "premium",
    keyConfig: { expiresDays: 2, maxUses: 35 },
    linkvertise: [
      { url: LINKVERTISE_URL, ads: 2, label: "Step 1 of 3" },
      { url: LINKVERTISE_URL, ads: 2, label: "Step 2 of 3" },
      { url: LINKVERTISE_URL, ads: 2, label: "Step 3 of 3" },
    ],
    cover: "/IWTTG-V3-premium-cover.webp",
    loaderScriptId: "IWTTGame_v3_premium",
    keyUsage: KEY_USAGE,
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
    requiresKey: true,
    keyType: "regular",
    keyConfig: { expiresDays: 2, maxUses: 75 },
    linkvertise: [{ url: LINKVERTISE_URL, ads: 2, label: "Step 1 of 1" }],
    cover: "/IWTTG-v2-cover.webp",
    loaderScriptId: "IWTTGame_v2",
    keyUsage: KEY_USAGE,
  },
  {
    slug: "iwttg-reworked-beta",
    title: "I Wanna Test The Game (Reworked Beta)",
    description: "Experimental rework. Archived — may contain bugs.",
    category: "Scripts",
    type: "Script",
    tag: "BETA",
    color: "violet",
    version: "0.62.0-beta",
    steps: 1,
    requiresKey: true,
    keyType: "regular",
    keyConfig: { expiresDays: 2, maxUses: 75 },
    linkvertise: [{ url: LINKVERTISE_URL, ads: 2, label: "Step 1 of 1" }],
    cover: "/IWTTG-beta-reworked-cover.webp",
    loaderScriptId: "IWTTGame_reworked_beta",
    keyUsage: KEY_USAGE,
  },

  // ─── UI (free, no key, no steps) ─────────────────────────
  {
    slug: "nonameui",
    title: "Noname UI Library",
    description:
      "Modern, modular, high-performance UI library for Roblox. 21+ elements, 9 themes, lazy loading. Free & open-source.",
    category: "UI",
    type: "Library",
    tag: "UI",
    color: "cyan",
    version: "1.16.1",
    steps: 0,
    requiresKey: false,
    downloadUrl: "https://library.nonamehub.fyi/wiki",
    cover: "/nonameUI-cover.webp",
  },

  // ─── Keys (universal access) ─────────────────────────────
  {
    slug: "nn-key",
    title: "Regular Access Key",
    description:
      "Unlocks all standard scripts in the hub. One key works everywhere.",
    category: "Key",
    type: "Key",
    tag: "KEY",
    color: "violet",
    version: "0.1.0",
    steps: 1,
    requiresKey: true,
    keyType: "regular",
    keyConfig: { expiresDays: 2, maxUses: 75 },
    linkvertise: [{ url: LINKVERTISE_URL, ads: 2, label: "Step 1 of 1" }],
    cover: "/key-cover.webp",
    keyUsage: KEY_USAGE,
  },
  {
    slug: "nn-key-premium",
    title: "Premium Access Key",
    description:
      "Unlocks premium scripts and advanced features. Requires 3 steps to generate.",
    category: "Key",
    type: "Key",
    tag: "PREMIUM",
    color: "amber",
    version: "0.1.0",
    steps: 3,
    requiresKey: true,
    keyType: "premium",
    keyConfig: { expiresDays: 2, maxUses: 35 },
    linkvertise: [
      { url: LINKVERTISE_URL, ads: 2, label: "Step 1 of 3" },
      { url: LINKVERTISE_URL, ads: 2, label: "Step 2 of 3" },
      { url: LINKVERTISE_URL, ads: 2, label: "Step 3 of 3" },
    ],
    cover: "/key-cover-premium.webp",
    keyUsage: KEY_USAGE,
  },
];