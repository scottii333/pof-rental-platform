import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { SearchInput } from "@/shared/search";
import { searchInputSchema } from "@/shared/search";

import { fetchCars } from "./cars.api";

const MIN_LOADING_MS = 2000;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const carsKeys = {
  all: ["cars"] as const,
  search: (input: SearchInput) => [...carsKeys.all, "search", input] as const,
};

export const useCarsQuery = (input: Partial<SearchInput> | null) => {
  const parsed = input ? searchInputSchema.safeParse(input) : null;
  const valid = parsed?.success ? parsed.data : null;

  return useQuery({
    queryKey: valid ? carsKeys.search(valid) : carsKeys.all,
    queryFn: async () => {
      const [cars] = await Promise.all([
        fetchCars(valid as SearchInput),
        wait(MIN_LOADING_MS),
      ]);
      return cars;
    },
    enabled: valid !== null,
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });
};
