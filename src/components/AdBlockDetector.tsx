"use client";

import { useEffect, useState } from "react";

export default function AdBlockDetector({
  children,
}: {
  children: React.ReactNode;
}) {
  const [blocked, setBlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const bait = document.createElement("div");
    bait.className = "adsbox ad-banner adsbygoogle";
    bait.style.cssText =
      "width:1px;height:1px;position:absolute;left:-9999px;top:-9999px;";
    bait.innerHTML = "&nbsp;";
    document.body.appendChild(bait);

    const timer = setTimeout(() => {
      const stillThere = document.body.contains(bait);
      const hidden =
        bait.offsetHeight === 0 ||
        bait.offsetWidth === 0 ||
        getComputedStyle(bait).display === "none";

      setBlocked(!stillThere || hidden);
      setChecked(true);
      bait.remove();
    }, 400);

    return () => {
      clearTimeout(timer);
      if (document.body.contains(bait)) bait.remove();
    };
  }, []);

  if (!checked) {
    return <>{children}</>;
  }

  if (blocked) {
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/6 p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10 text-amber-300">
            !
          </span>
          <div>
            <h3 className="font-[Space_Grotesk] text-base font-semibold text-amber-100">
              Ad blocker detected
            </h3>
            <p className="mt-1 text-sm leading-6 text-amber-200/80">
              Disable your ad blocker to access this resource. Ads keep NoNameHub running.
            </p>
            <p className="mt-2 text-xs leading-5 text-amber-200/60">
              Turn off extensions like uBlock, AdBlock Plus, or Brave Shields, then reload the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}