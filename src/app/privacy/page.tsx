import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NoNameHub handles your data.",
};

export default function Page() {
  return (
    <LegalPage
      kicker="LEGAL"
      title="Privacy Policy"
      updated="Last updated: October 2026"
      intro="Your privacy matters to us. This policy explains what data we collect and how we use it."
      sections={[
        {
          title: "Data we collect",
          text: "We only collect the information you provide directly — such as your email if you choose to contact us.",
        },
        {
          title: "How we use your data",
          text: "Your data is used solely to respond to your messages. We do not sell or rent your data to third parties.",
        },
        {
          title: "Cookies",
          text: "We use minimal local storage to improve your experience. No third-party tracking cookies are used.",
        },
        {
          title: "Your rights",
          text: "You can request access, correction, or deletion of your personal data at any time.",
        },
      ]}
    />
  );
}