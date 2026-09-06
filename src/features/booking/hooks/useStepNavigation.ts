"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { config } from "@/config";

export const useStepNavigation = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const run = useCallback(
    (action: () => void, delayMs: number) => {
      if (isNavigating) return;
      setIsNavigating(true);
      setTimeout(action, delayMs);
    },
    [isNavigating],
  );

  const goTo = useCallback(
    (href: string) => run(() => router.push(href), config.loading.minDelay),
    [router, run],
  );

  const goBack = useCallback(
    () => run(() => router.back(), config.loading.backDelay),
    [router, run],
  );

  return { isNavigating, goTo, goBack };
};
