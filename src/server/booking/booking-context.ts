import "server-only";

import type { Car } from "@/shared/car";
import { BRANCH_LOCATION } from "@/shared/search";
import { readParam } from "@/lib/search-params";
import {
  resolveSchedule,
  type BookingSchedule,
} from "@/features/booking/booking-details";

import { getCar, listCars } from "../cars/cars.service";

type SearchParams = Record<string, string | string[] | undefined>;

export type BookingContext = {
  car: Car;
  schedule: BookingSchedule;
  pickupDateTime: string;
  returnDateTime: string;
  pickupLocation: string;
  returnLocation: string;
};

export const loadBookingContext = async (
  params: SearchParams,
): Promise<BookingContext | null> => {
  const pickupDateTime = readParam(params.pickupDateTime);
  const returnDateTime = readParam(params.returnDateTime);
  if (!pickupDateTime || !returnDateTime) return null;

  const pickupLocation = readParam(params.pickupLocation);
  const car =
    (await getCar(readParam(params.car) ?? "")) ?? (await listCars())[0];

  return {
    car,
    schedule: resolveSchedule(pickupDateTime, returnDateTime, pickupLocation),
    pickupDateTime,
    returnDateTime,
    pickupLocation: pickupLocation ?? BRANCH_LOCATION,
    returnLocation: readParam(params.returnLocation) ?? BRANCH_LOCATION,
  };
};
