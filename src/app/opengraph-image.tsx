// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const alt = "NoNameHub — Roblox resource hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  // Завантажуємо лого через HTTP із власного сайту
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nonamehub.fyi";
  let logoUrl = `${siteUrl}/logo.png`;
  try {
    const res = await fetch(`${siteUrl}/logo.png`, { cache: "force-cache" });
    if (res.ok) {
      const buf = await res.arrayBuffer();
      const b64 = Buffer.from(buf).toString("base64");
      logoUrl = `data:image/png;base64,${b64}`;
    }
  } catch {
    /* якщо не вдалось — використаємо прямий URL */
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 40%, #1a0d2e 0%, #0a0a12 70%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: 60,
        }}
      >
        <img src={logoUrl} width={90} height={90} alt="" style={{ marginBottom: 36 }} />

        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          NoNameHub
        </div>

        <div
          style={{
            fontSize: 34,
            color: "#8b5cf6",
            marginTop: 26,
            fontWeight: 600,
          }}
        >
          Roblox Scripts, Models &amp; UI
        </div>

        <div
          style={{
            width: 320,
            height: 2,
            background: "#8b5cf6",
            opacity: 0.35,
            marginTop: 54,
          }}
        />

        <div style={{ fontSize: 22, color: "#71717a", marginTop: 38 }}>
          nonamehub.fyi
        </div>
      </div>
    ),
    size,
  );
}
