import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "All resources",
  description:
    "Browse scripts, models, and UI kits for Roblox Studio on NoNameHub.",
  openGraph: {
    title: "All resources — NoNameHub",
    description:
      "Browse scripts, models, and UI kits for Roblox Studio.",
  },
};

export default function Page() {
  return <ResourcesClient />;
}