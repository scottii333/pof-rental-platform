import { carsResponseSchema, type Car } from "@/shared/car";
import type { SearchInput } from "@/shared/search";
import { apiFetch } from "@/lib/http";

export const fetchCars = async (search: SearchInput): Promise<Car[]> => {
  const query = new URLSearchParams({
    pickupLocation: search.pickupLocation,
    returnLocation: search.returnLocation,
    pickupDateTime: search.pickupDateTime,
    returnDateTime: search.returnDateTime,
  });

  const { cars } = await apiFetch(`/api/cars?${query}`, carsResponseSchema);
  return cars;
};
