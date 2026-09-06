import {
  bookingConfirmationSchema,
  createBookingSchema,
  type BookingConfirmation,
} from "@/shared/booking";
import { getRentalDays, searchInputSchema } from "@/shared/search";
import { getPriceBreakdown } from "@/features/booking/pricing";

import { HttpError, HttpStatus } from "../http-error";
import { assertDubaiBranch } from "../branch";
import { resolveAddons } from "../addons/addons.service";
import { getCarOrThrow } from "../cars/cars.service";
import { getProtectionPackage } from "../insurance/insurance.service";
import {
  assertMileageOption,
  assertPaymentOption,
} from "../rental-options/rental-options.service";
import { bookingsStore } from "./booking.store";
import { createBookingReference } from "./reference";

const invalid = (message: string, details?: unknown): HttpError =>
  new HttpError(HttpStatus.Unprocessable, message, details);

const sumAddons = (
  addons: Awaited<ReturnType<typeof resolveAddons>>,
  billing: "per-day" | "one-time",
): number =>
  addons
    .filter((addon) => addon.billing === billing)
    .reduce((total, addon) => total + addon.price, 0);

/**
 * Validate a checkout submission, price it, persist it, and return the
 * confirmation the customer sees.
 */
export const createBooking = async (
  raw: unknown,
): Promise<BookingConfirmation> => {
  const parsed = createBookingSchema.safeParse(raw);
  if (!parsed.success) {
    throw invalid("Invalid booking details", parsed.error.flatten());
  }
  const input = parsed.data;

  assertDubaiBranch(input.pickupLocation, input.returnLocation);

  const window = searchInputSchema.safeParse({
    pickupLocation: input.pickupLocation,
    returnLocation: input.returnLocation,
    pickupDateTime: input.pickupDateTime,
    returnDateTime: input.returnDateTime,
  });
  if (!window.success) {
    throw invalid("Invalid rental dates", window.error.flatten());
  }

  const car = await getCarOrThrow(input.carId);

  const protection = await getProtectionPackage(input.protectionId);
  if (input.protectionId && !protection) {
    throw invalid("Invalid protection package");
  }

  const addons = await resolveAddons(input.addonIds);
  const payment = await assertPaymentOption(input.paymentOptionId);
  const mileage = await assertMileageOption(input.mileageOptionId);

  const rentalDays = getRentalDays(
    new Date(input.pickupDateTime),
    new Date(input.returnDateTime),
  );

  const { total } = getPriceBreakdown({
    dailyPrice: car.pricePerDay,
    protectionPerDay: protection?.pricePerDay ?? 0,
    addonsPerDay: sumAddons(addons, "per-day"),
    addonsOneTime: sumAddons(addons, "one-time"),
    rentalDays,
  });

  const confirmation = bookingConfirmationSchema.parse({
    reference: createBookingReference(),
    email: input.guest.email,
    car,
    pickupLocation: input.pickupLocation,
    returnLocation: input.returnLocation,
    pickupDateTime: input.pickupDateTime,
    returnDateTime: input.returnDateTime,
    rentalDays,
    total,
  });

  await bookingsStore.create({
    ...confirmation,
    createdAt: new Date().toISOString(),
    guestName: input.guest.name,
    guestPhone: input.guest.phone,
    protectionId: input.protectionId,
    addonIds: input.addonIds,
    paymentOptionId: payment.id,
    mileageOptionId: mileage.id,
  });

  return confirmation;
};

export const getBooking = async (
  reference: string,
): Promise<BookingConfirmation> => {
  const booking = await bookingsStore.findByReference(reference);
  if (!booking) throw new HttpError(HttpStatus.NotFound, "Booking not found");
  return bookingConfirmationSchema.parse(booking);
};
