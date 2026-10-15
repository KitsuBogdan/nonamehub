import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "NoNameHub — Roblox resource hub",
  description:
    "Discover scripts, models, and UI kits made for your next Roblox project.",
};

export default function Page() {
  return <HomeClient />;
}