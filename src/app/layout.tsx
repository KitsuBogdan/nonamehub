import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ToastProvider } from "@/components/Toast";
import ScrollTop from "@/components/ScrollTop";
import { SITE } from "@/data/site";

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
  metadataBase: new URL(SITE.url),
  title: {
    default: "NoNameHub — Roblox resource hub",
    template: "%s — NoNameHub",
  },
  description:
    "Free scripts, UI libraries, and keys for your next Roblox Studio project.",
  keywords: [
    "Roblox",
    "Roblox Studio",
    "Roblox scripts",
    "Roblox UI",
    "Roblox keys",
    "game development",
  ],
  authors: [{ name: "NoNameHub" }],
  openGraph: {
    type: "website",
    siteName: "NoNameHub",
    title: "NoNameHub — Roblox resource hub",
    description:
      "Free scripts, UI libraries, and keys for your next Roblox Studio project.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoNameHub — Roblox resource hub",
    description:
      "Free scripts, UI libraries, and keys for your next Roblox Studio project.",
  },
  icons: { icon: "/logo.webp", apple: "/logo.webp" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <ToastProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <ScrollTop />
        </ToastProvider>
      </body>
    </html>
  );
}