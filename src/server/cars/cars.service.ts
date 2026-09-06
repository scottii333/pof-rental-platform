import type { Car } from "@/shared/car";
import { searchInputSchema } from "@/shared/search";

import { HttpError, HttpStatus } from "../http-error";
import { assertDubaiBranch } from "../branch";
import { carsStore } from "./cars.store";

/** Cars available for a valid search at the Dubai branch. */
export const searchCars = async (raw: unknown): Promise<Car[]> => {
  const parsed = searchInputSchema.safeParse(raw);
  if (!parsed.success) {
    throw new HttpError(
      HttpStatus.Unprocessable,
      "Invalid search criteria",
      parsed.error.flatten(),
    );
  }

  assertDubaiBranch(parsed.data.pickupLocation, parsed.data.returnLocation);

  return carsStore.listAvailable();
};

export const listCars = async (): Promise<Car[]> => carsStore.list();

export const getCar = async (id: string): Promise<Car | null> =>
  carsStore.findById(id);

export const getCarOrThrow = async (id: string): Promise<Car> => {
  const car = await carsStore.findById(id);
  if (!car) throw new HttpError(HttpStatus.NotFound, "Car not found");
  if (!car.available) {
    throw new HttpError(HttpStatus.Conflict, "Car is no longer available");
  }
  return car;
};
