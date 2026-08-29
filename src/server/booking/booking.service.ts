import {
  bookingConfirmationSchema,
  createBookingSchema,
  type BookingConfirmation,
} from "@/shared/booking";
import { getRentalDays, searchInputSchema } from "@/shared/search";
import { getPriceBreakdown } from "@/features/booking/pricing";

import { HttpError } from "../http-error";
import { assertBranch } from "../branch";
import { resolveAddons } from "../addons/addons.service";
import { getCarOrThrow } from "../cars/cars.service";
import { getProtectionPackage } from "../insurance/insurance.service";
import {
  assertMileageOption,
  assertPaymentOption,
} from "../rental-options/rental-options.service";
import { bookingsStore } from "./booking.store";

const reference = () =>
  `POF-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;

export const createBooking = async (
  raw: unknown,
): Promise<BookingConfirmation> => {
  const parsed = createBookingSchema.safeParse(raw);
  if (!parsed.success) {
    throw new HttpError(422, "Invalid booking details", parsed.error.flatten());
  }
  const input = parsed.data;

  assertBranch(input.pickupLocation, input.returnLocation);

  const window = searchInputSchema.safeParse({
    pickupLocation: input.pickupLocation,
    returnLocation: input.returnLocation,
    pickupDateTime: input.pickupDateTime,
    returnDateTime: input.returnDateTime,
  });
  if (!window.success) {
    throw new HttpError(422, "Invalid rental dates", window.error.flatten());
  }

  const car = await getCarOrThrow(input.carId);

  const protection = await getProtectionPackage(input.protectionId);
  if (input.protectionId && !protection) {
    throw new HttpError(422, "Invalid protection package");
  }

  const addons = await resolveAddons(input.addonIds);
  const payment = await assertPaymentOption(input.paymentOptionId);
  const mileage = await assertMileageOption(input.mileageOptionId);

  const pickup = new Date(input.pickupDateTime);
  const dropoff = new Date(input.returnDateTime);
  const rentalDays = getRentalDays(pickup, dropoff);

  const addonsPerDay = addons
    .filter((addon) => addon.billing === "per-day")
    .reduce((sum, addon) => sum + addon.price, 0);
  const addonsOneTime = addons
    .filter((addon) => addon.billing === "one-time")
    .reduce((sum, addon) => sum + addon.price, 0);

  const { total } = getPriceBreakdown({
    dailyPrice: car.pricePerDay,
    protectionPerDay: protection?.pricePerDay ?? 0,
    addonsPerDay,
    addonsOneTime,
    rentalDays,
  });

  const confirmation = bookingConfirmationSchema.parse({
    reference: reference(),
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
  if (!booking) throw new HttpError(404, "Booking not found");
  return bookingConfirmationSchema.parse(booking);
};
