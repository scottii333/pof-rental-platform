import { carsResponseSchema, type Car } from "@/shared/car";
import type { SearchInput } from "@/shared/search";
import { readApiError } from "@/lib/api";

export const fetchCars = async (search: SearchInput): Promise<Car[]> => {
  const query = new URLSearchParams({
    pickupLocation: search.pickupLocation,
    returnLocation: search.returnLocation,
    pickupDateTime: search.pickupDateTime,
    returnDateTime: search.returnDateTime,
  });

  const res = await fetch(`/api/cars?${query.toString()}`);

  if (!res.ok) {
    throw new Error(await readApiError(res));
  }

  const data = carsResponseSchema.parse(await res.json());
  return data.cars;
};
