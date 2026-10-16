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
  steps: number;
  downloads: string;
  keyConfig?: {
    expiresDays?: number;
    maxUses?: number;
  };
  keyType?: "regular" | "premium";
  linkvertise?: LinkvertiseStep[];
  keyUsage?: string;
};

// ── Одна й та сама URL для всіх кроків преміуму.
//    Linkvertise може блокувати повторні візити з одного IP протягом
//    короткого часу — якщо крок 2 / 3 почнуть фейлити, треба
//    створити 3 окремих лінки в кабінеті Linkvertise.
const PREMIUM_URL =
  "https://link-center.net/1343514/Hlzlwx0Sl3Eb";

export const resources: Resource[] = [
  {
    slug: "nn-key",
    title: "Access Key to NonameHub Resources",
    description:
      "Universal access key for all NonameHub scripts and tools. Get it once — use it everywhere.",
    category: "Key",
    type: "Key",
    tag: "KEY",
    color: "violet",
    version: "0.1.0",
    steps: 1,
    downloads: "0",
    keyConfig: {
      expiresDays: 7,
      maxUses: 1,
    },
    keyType: "regular",
    keyUsage: "Paste this key into Config.Key at the top of the script.",
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
    keyConfig: {
      expiresDays: 30,
      maxUses: 1,
    },
    keyType: "premium",
    linkvertise: [
      { url: PREMIUM_URL, ads: 2, label: "Step 1 of 3" },
      { url: PREMIUM_URL, ads: 2, label: "Step 2 of 3" },
      { url: PREMIUM_URL, ads: 2, label: "Step 3 of 3" },
    ],
    keyUsage:
      "Paste this key into Config.Key at the top of the premium script.",
  },
];

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

export function getCategories(): ResourceCategory[] {
  return ["Scripts", "Models", "UI", "Key"];
}