import {
  bookingConfirmationSchema,
  type BookingConfirmation,
  type CreateBookingInput,
} from "@/shared/booking";
import { apiFetch } from "@/lib/http";

export const createBookingRequest = (
  input: CreateBookingInput,
): Promise<BookingConfirmation> =>
  apiFetch("/api/bookings", bookingConfirmationSchema, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
