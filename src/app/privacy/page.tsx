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
      intro="NoNameHub is built to be as private as possible. We don't require accounts, and we don't track you."
      sections={[
        {
          title: "Data we collect",
          text: "We do not have contact forms, user accounts, or newsletter signups. We do not collect your name, email, or any personal information.",
        },
        {
          title: "Cookies",
          text: "We use strictly essential cookies only: 'nh_keys' (to save your generated access keys locally so you don't have to redo the Linkvertise steps) and 'nh_admin' (to authenticate the site administrator). No third-party tracking or advertising cookies are used.",
        },
        {
          title: "Third-party services",
          text: "When generating keys, you are redirected to Linkvertise. Please refer to their Privacy Policy for how they handle data. We do not sell, rent, or share any data with third parties.",
        },
        {
          title: "Contact",
          text: "If you have any questions or need your data removed, the only way to reach us is through our official Discord server.",
        },
      ]}
    />
  );
}