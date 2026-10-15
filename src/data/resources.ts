// src/data/resources.ts

export type ResourceCategory = "Scripts" | "Models" | "UI" | "Key";

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
  keyUsage?: string;
};

export const resources: Resource[] = [
  {
    slug: "uni-key",
    title: "Access Key to NonameHub Resources",
    description:
      "Universal access key for all NonameHub scripts and tools. Get it once — use it everywhere.",
    category: "Key",
    type: "Key",
    tag: "KEY",
    color: "violet",
    version: "0.1.0",
    steps: 2,
    downloads: "0",
    keyConfig: {
      expiresDays: 7,
      maxUses: 1,
    },
    keyUsage: "Paste this key into Config.Key at the top of the script.",
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