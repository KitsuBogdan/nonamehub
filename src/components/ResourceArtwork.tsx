"use client";

import Image from "next/image";
import { useState } from "react";
import type { Resource } from "@/data/resources";

const ARTWORK: Record<string, string> = {
  "nn-key": "/key-cover.webp",
  "nn-key-premium": "/key-cover-premium.webp",
  "iwttg-v3": "/IWTTG-v3-cover.webp",
  "iwttg-v2": "/IWTTG-v2-cover.webp",
  "iwttg-reworked-beta": "/IWTTG-beta-reworked-cover.webp",
};

const FALLBACK = "/no-resource-cover.webp"; // Виправив одруківку в назві

export default function ResourceArtwork({ resource }: { resource: Resource }) {
  // Початкове джерело зображення
  const initialSrc = resource.cover ?? ARTWORK[resource.slug] ?? FALLBACK;
  
  // Використовуємо стейт, щоб мати можливість змінити картинку, якщо вона не завантажиться
  const [src, setSrc] = useState(initialSrc);

  return (
    <div className="group relative aspect-[16/9] w-full overflow-hidden bg-white/5">
      <Image
        src={src}
        alt={resource.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
        // Якщо файл не знайдено (404) або сталася помилка — ставимо заглушку
        onError={() => {
          if (src !== FALLBACK) {
            setSrc(FALLBACK);
          }
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"
      />
    </div>
  );
}