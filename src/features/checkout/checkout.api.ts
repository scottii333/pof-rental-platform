import {
  bookingConfirmationSchema,
  type BookingConfirmation,
  type CreateBookingInput,
} from "@/shared/booking";
import { readApiError } from "@/lib/api";

export const createBookingRequest = async (
  input: CreateBookingInput,
): Promise<BookingConfirmation> => {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(await readApiError(res));
  }

  return bookingConfirmationSchema.parse(await res.json());
};
