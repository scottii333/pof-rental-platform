import type { Car } from "@/shared/car";
import { searchInputSchema } from "@/shared/search";
import { BRANCH_LOCATION } from "@/shared/search";

import { HttpError } from "../http-error";
import { carsStore } from "./cars.store";

export const searchCars = async (raw: unknown): Promise<Car[]> => {
  const parsed = searchInputSchema.safeParse(raw);
  if (!parsed.success) {
    throw new HttpError(422, "Invalid search criteria", parsed.error.flatten());
  }

  const { pickupLocation, returnLocation } = parsed.data;
  if (
    pickupLocation !== BRANCH_LOCATION ||
    returnLocation !== BRANCH_LOCATION
  ) {
    throw new HttpError(422, "We only operate from the Dubai branch");
  }

  return carsStore.listAvailable();
};

export const listCars = async (): Promise<Car[]> => carsStore.list();

export const getCarOrThrow = async (id: string): Promise<Car> => {
  const car = await carsStore.findById(id);
  if (!car) throw new HttpError(404, "Car not found");
  if (!car.available) throw new HttpError(409, "Car is no longer available");
  return car;
};

export const getCar = async (id: string): Promise<Car | null> =>
  carsStore.findById(id);
