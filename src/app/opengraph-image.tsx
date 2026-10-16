// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "NoNameHub — Roblox resource hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  // Вбудовуємо реальний logo.png як base64
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoUrl = `data:image/png;base64,${logo.toString("base64")}`;

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
        <img
          src={logoUrl}
          width={90}
          height={90}
          alt=""
          style={{ marginBottom: 36 }}
        />

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
