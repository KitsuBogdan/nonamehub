import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "NoNameHub is a community resource hub for Roblox developers.",
};

export default function Page() {
  return <AboutClient />;
}