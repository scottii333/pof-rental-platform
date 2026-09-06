"use client";

import { useSearchParams as useNextSearchParams } from "next/navigation";
import type { SearchInput } from "@/shared/search";

interface UseCarSearchParamsReturn {
  hasSearch: boolean;
  input: Partial<SearchInput> | null;
}

export function useCarSearchParams(): UseCarSearchParamsReturn {
  const params = useNextSearchParams();

  const hasSearch =
    params.has("pickupDateTime") && params.has("returnDateTime");

  const input = hasSearch
    ? {
        pickupLocation: params.get("pickupLocation") ?? "",
        returnLocation: params.get("returnLocation") ?? "",
        pickupDateTime: params.get("pickupDateTime") ?? "",
        returnDateTime: params.get("returnDateTime") ?? "",
      }
    : null;

  return { hasSearch, input };
}
