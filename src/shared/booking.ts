import { z } from "zod";

import { carSchema } from "./car";
import { guestBookingSchema } from "./guest-booking";
import { protectionPackageSchema } from "./protection-package";

/** Body sent to `POST /api/bookings`. */
export const createBookingSchema = z.object({
  carId: z.string().min(1, "Missing car"),
  protectionId: protectionPackageSchema.shape.id.nullable().default(null),
  addonIds: z.array(z.string()).default([]),
  paymentOptionId: z.string().min(1, "Missing payment option"),
  mileageOptionId: z.string().min(1, "Missing mileage option"),
  pickupLocation: z.string().min(1),
  returnLocation: z.string().min(1),
  pickupDateTime: z.string(),
  returnDateTime: z.string(),
  guest: guestBookingSchema,
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

/** Response from a successful booking. */
export const bookingConfirmationSchema = z.object({
  reference: z.string(),
  email: z.string(),
  car: carSchema,
  pickupLocation: z.string(),
  returnLocation: z.string(),
  pickupDateTime: z.string(),
  returnDateTime: z.string(),
  rentalDays: z.number().int().positive(),
  total: z.number().nonnegative(),
});

export type BookingConfirmation = z.infer<typeof bookingConfirmationSchema>;
