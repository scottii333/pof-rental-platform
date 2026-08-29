"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const goBack = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    setTimeout(() => router.back(), 600);
  };

  return (
    <button
      type="button"
      onClick={goBack}
      disabled={isNavigating}
      aria-label="Go back"
      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#c9a86a]/40 text-[#c9a86a] transition-colors hover:bg-[#c9a86a]/10 disabled:opacity-70"
    >
      {isNavigating ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <ChevronLeft className="size-4" />
      )}
    </button>
  );
};

export default BackButton;
