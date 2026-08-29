import "server-only";

import type { BookingConfirmation } from "@/shared/booking";

export type StoredBooking = BookingConfirmation & {
  createdAt: string;
  guestName: string;
  guestPhone: string;
  protectionId: string | null;
  addonIds: string[];
  paymentOptionId: string;
  mileageOptionId: string;
};

const bookings: StoredBooking[] = [];

export const bookingsStore = {
  async create(booking: StoredBooking): Promise<StoredBooking> {
    bookings.push(booking);
    return booking;
  },
  async list(): Promise<StoredBooking[]> {
    return [...bookings];
  },
  async findByReference(reference: string): Promise<StoredBooking | null> {
    return bookings.find((entry) => entry.reference === reference) ?? null;
  },
};
