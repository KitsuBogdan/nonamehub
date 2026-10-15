// components/LinkvertiseScript.tsx
"use client";

import Script from "next/script";

export default function LinkvertiseScript() {
  return (
    <>
      <Script
        src="https://publisher.linkvertise.com/cdn/linkvertise.js"
        strategy="afterInteractive"
      />
      <Script id="linkvertise-init" strategy="afterInteractive">
        {`linkvertise(1343514, {
            whitelist: ["nonamehub.fyi", "www.nonamehub.fyi"],
            blacklist: []
        });`}
      </Script>
    </>
  );
}