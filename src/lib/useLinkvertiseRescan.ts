// lib/useLinkvertiseRescan.ts
"use client";

import { useEffect } from "react";

type LvApi = { scan?: (el?: HTMLElement | Document) => void };

export function useLinkvertiseRescan(
  deps: unknown[],
  target?: HTMLElement | null,
) {
  useEffect(() => {
    const api = (window as unknown as { linkvertiseAPI?: LvApi })
      .linkvertiseAPI;
    if (api?.scan) {
      api.scan(target ?? document.body);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}