import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NoNameHub handles your data.",
};

export default function Page() {
  return (
    <LegalPage
      kickerKey="privacy.kicker"
      titleKey="privacy.title"
      updatedKey="privacy.updated"
      introKey="privacy.intro"
      sections={[
        { titleKey: "privacy.s1.title", textKey: "privacy.s1.text" },
        { titleKey: "privacy.s2.title", textKey: "privacy.s2.text" },
        { titleKey: "privacy.s3.title", textKey: "privacy.s3.text" },
        { titleKey: "privacy.s4.title", textKey: "privacy.s4.text" },
      ]}
    />
  );
}