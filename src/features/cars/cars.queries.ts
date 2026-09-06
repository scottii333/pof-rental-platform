import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { SearchInput } from "@/shared/search";
import { searchInputSchema } from "@/shared/search";
import { config } from "@/config";
import { withMinLoadingTime } from "@/lib/async";

import { fetchCars } from "./cars.api";

export const carsKeys = {
  all: ["cars"] as const,
  searches: () => [...carsKeys.all, "search"] as const,
  search: (input: SearchInput) => [...carsKeys.searches(), input] as const,
};

export const useCarsQuery = (input: Partial<SearchInput> | null) => {
  const parsed = input ? searchInputSchema.safeParse(input) : null;
  const validInput = parsed?.success ? parsed.data : null;

  return useQuery({
    queryKey: validInput ? carsKeys.search(validInput) : carsKeys.all,
    queryFn: () =>
      withMinLoadingTime(fetchCars(validInput!), config.loading.minDelay),
    enabled: validInput !== null,
    staleTime: config.cache.staleTime.carSearch,
    placeholderData: keepPreviousData,
  });
};
