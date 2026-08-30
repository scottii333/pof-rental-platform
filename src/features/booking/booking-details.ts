import { BRANCH_LOCATION, getRentalDays } from "@/shared/search";

import { RENTAL_DAYS } from "./pricing";

const PICKUP_OFFSET_DAYS = 2;
const PICKUP_HOUR = 10;

export type BookingSchedule = {
  location: string;
  pickup: Date;
  return: Date;
  days: number;
};

const rollingSchedule = (): BookingSchedule => {
  const pickup = new Date();
  pickup.setDate(pickup.getDate() + PICKUP_OFFSET_DAYS);
  pickup.setHours(PICKUP_HOUR, 0, 0, 0);

  const returnAt = new Date(pickup);
  returnAt.setDate(returnAt.getDate() + RENTAL_DAYS);

  return {
    location: BRANCH_LOCATION,
    pickup,
    return: returnAt,
    days: RENTAL_DAYS,
  };
};

export const resolveSchedule = (
  pickupDateTime?: string | null,
  returnDateTime?: string | null,
  location?: string | null,
): BookingSchedule => {
  if (!pickupDateTime || !returnDateTime) return rollingSchedule();

  const pickup = new Date(pickupDateTime);
  const dropoff = new Date(returnDateTime);
  if (Number.isNaN(pickup.getTime()) || Number.isNaN(dropoff.getTime())) {
    return rollingSchedule();
  }

  return {
    location: location || BRANCH_LOCATION,
    pickup,
    return: dropoff,
    days: getRentalDays(pickup, dropoff),
  };
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Dubai",
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Dubai",
});

export const formatBookingMoment = (date: Date) =>
  `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
