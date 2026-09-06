"use client";

import { toast } from "@/components/ui/toast";

/** Toast shown for mockup buttons whose behaviour isn't built yet. */
export const notImplemented = (feature: string) =>
  toast.add({
    title: `${feature} coming soon`,
    description: "This is a mockup. The logic isn't implemented yet.",
    type: "info",
  });
