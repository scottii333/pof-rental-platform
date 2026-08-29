import { z } from "zod";

export const BRANCH_LOCATION = "Dubai Sheikh Zayed Road (POF Rental)";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** Rentals are billed per day, so the return is at least one day after pickup. */
const MIN_RENTAL_MS = DAY_MS;

const MAX_RENTAL_WINDOW_MS = 30 * DAY_MS;

const OPERATING_DAYS = [1, 2, 3, 4, 5, 6];
export const OPENING_HOUR = 9;
export const CLOSING_HOUR = 18;

const BRANCH_TZ = "Asia/Dubai";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const branchHour = (date: Date): number =>
  Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: BRANCH_TZ,
      hour: "2-digit",
      hourCycle: "h23",
    }).format(date),
  );

const branchWeekday = (date: Date): number =>
  WEEKDAYS.indexOf(
    new Intl.DateTimeFormat("en-US", {
      timeZone: BRANCH_TZ,
      weekday: "short",
    }).format(date),
  );

export const isOperatingDay = (date: Date) =>
  OPERATING_DAYS.includes(branchWeekday(date));

const isWithinOperatingHours = (date: Date) => {
  const hour = branchHour(date);
  return isOperatingDay(date) && hour >= OPENING_HOUR && hour <= CLOSING_HOUR;
};

const nextHour = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(copy.getHours() + 1, 0, 0, 0);
  return copy;
};

const isoDateTime = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date/time");

export const searchInputSchema = z
  .object({
    pickupLocation: z.string().min(1, "Select a pickup location"),
    returnLocation: z.string().min(1, "Select a return location"),
    pickupDateTime: isoDateTime,
    returnDateTime: isoDateTime,
  })
  .superRefine((data, ctx) => {
    const pickup = Date.parse(data.pickupDateTime);
    const dropoff = Date.parse(data.returnDateTime);

    if (pickup < Date.now()) {
      ctx.addIssue({
        code: "custom",
        path: ["pickupDateTime"],
        message: "Pickup can't be in the past",
      });
    }
    if (!isWithinOperatingHours(new Date(pickup))) {
      ctx.addIssue({
        code: "custom",
        path: ["pickupDateTime"],
        message: "Pickup must be within opening hours (Mon–Sat, 9:00–18:00)",
      });
    }
    if (!isWithinOperatingHours(new Date(dropoff))) {
      ctx.addIssue({
        code: "custom",
        path: ["returnDateTime"],
        message: "Return must be within opening hours (Mon–Sat, 9:00–18:00)",
      });
    }
    if (dropoff < pickup + MIN_RENTAL_MS) {
      ctx.addIssue({
        code: "custom",
        path: ["returnDateTime"],
        message: "Return must be at least one day after pickup",
      });
    }
    if (dropoff > pickup + MAX_RENTAL_WINDOW_MS) {
      ctx.addIssue({
        code: "custom",
        path: ["returnDateTime"],
        message: "Return must be within one month of pickup",
      });
    }
  });

export type SearchInput = z.infer<typeof searchInputSchema>;

/** Earliest selectable pickup — the next full hour from now. */
export const getMinPickup = (now: Date = new Date()) => nextHour(now);

/** Earliest selectable return moment for a given pickup (one day later). */
export const getMinReturn = (pickup: Date) =>
  new Date(pickup.getTime() + MIN_RENTAL_MS);

/** Latest selectable return moment for a given pickup. */
export const getMaxReturn = (pickup: Date) =>
  new Date(pickup.getTime() + MAX_RENTAL_WINDOW_MS);

/** Billable days between pickup and return (rounded up, minimum 1). */
export const getRentalDays = (pickup: Date, dropoff: Date) =>
  Math.max(1, Math.ceil((dropoff.getTime() - pickup.getTime()) / DAY_MS));
