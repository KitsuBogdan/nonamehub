import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ToastProvider } from "@/components/Toast";
import ScrollTop from "@/components/ScrollTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nonamehub.com",
  ),
  title: {
    default: "NoNameHub — Roblox resource hub",
    template: "%s — NoNameHub",
  },
  description:
    "Scripts, models, and UI kits for your next Roblox Studio project.",
  keywords: [
    "Roblox",
    "Roblox Studio",
    "Roblox scripts",
    "Roblox models",
    "Roblox UI",
    "game development",
  ],
  authors: [{ name: "NoNameHub" }],
  openGraph: {
    type: "website",
    siteName: "NoNameHub",
    title: "NoNameHub — Roblox resource hub",
    description:
      "Scripts, models, and UI kits for your next Roblox Studio project.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoNameHub — Roblox resource hub",
    description:
      "Scripts, models, and UI kits for your next Roblox Studio project.",
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <LanguageProvider>
          <ToastProvider>
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
            <ScrollTop />
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}