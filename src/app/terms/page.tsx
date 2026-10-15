import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for using NoNameHub.",
};

export default function Page() {
  return (
    <LegalPage
      kickerKey="terms.kicker"
      titleKey="terms.title"
      updatedKey="terms.updated"
      introKey="terms.intro"
      sections={[
        { titleKey: "terms.s1.title", textKey: "terms.s1.text" },
        { titleKey: "terms.s2.title", textKey: "terms.s2.text" },
        { titleKey: "terms.s3.title", textKey: "terms.s3.text" },
        { titleKey: "terms.s4.title", textKey: "terms.s4.text" },
      ]}
    />
  );
}