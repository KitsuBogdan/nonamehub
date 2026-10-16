// src/components/ResourceArtwork.tsx
"use client";

import Image from "next/image";
import type { Resource } from "@/data/resources";

/**
 * Мапа artwork за slug.
 * Кожен ресурс має власну обкладинку.
 * Якщо slug не знайдено — використовується default-cover.
 */
const ARTWORK: Record<string, string> = {
  // Regular key
  "nn-key": "/key-cover.png",

  // Premium key
  "nn-key-premium": "/key-cover-premium.png",
};

const FALLBACK = "/default-cover.png";

export default function ResourceArtwork({ resource }: { resource: Resource }) {
  const src = ARTWORK[resource.slug] ?? FALLBACK;

  return (
    <div className="group relative h-36 w-full overflow-hidden bg-white/5">
      <Image
        src={src}
        alt={resource.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
        priority={false}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"
      />
    </div>
  );
}