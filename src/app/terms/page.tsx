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
      intro="By using NoNameHub, you agree to these terms. Please read them carefully."
      sections={[
        {
          title: "Use of resources",
          text: "All resources on NoNameHub are provided as-is for educational and development purposes. You are responsible for how you use them in your own projects.",
        },
        {
          title: "User responsibility",
          text: "You confirm that your use of any resource does not violate any laws or third-party rights.",
        },
        {
          title: "Limitation of liability",
          text: "NoNameHub is not responsible for any damage or loss resulting from the use of resources available on the site.",
        },
        {
          title: "Changes to terms",
          text: "We may update these terms from time to time. Continued use of the site means you accept the updated terms.",
        },
      ]}
    />
  );
}