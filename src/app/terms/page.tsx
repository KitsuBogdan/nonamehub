import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for using NoNameHub.",
};

export default function Page() {
  return (
    <LegalPage
      kicker="LEGAL"
      title="Terms of Service"
      updated="Last updated: October 2026"
      intro="By accessing NoNameHub, you agree to the following terms. Please read them before using any resources."
      sections={[
        {
          title: "Use of resources",
          text: "All scripts, UI libraries, and assets are provided 'as-is'. You are solely responsible for how you use them in your projects. You agree that your use does not violate any laws, Roblox's Terms of Service, or third-party rights.",
        },
        {
          title: "Limitation of liability",
          text: "NoNameHub is not responsible for any damage, data loss, or account bans resulting from the use of our resources. Use them at your own risk.",
        },
        {
          title: "Availability",
          text: "All resources are provided for free. We reserve the right to update, modify, or remove any resource at any time without prior notice.",
        },
        {
          title: "Changes to terms",
          text: "We may change these terms occasionally. Your continued use of the site means you accept the current version of these terms.",
        },
      ]}
    />
  );
}