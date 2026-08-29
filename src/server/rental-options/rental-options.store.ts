import "server-only";

import type { RentalOption } from "@/shared/rental-options";

const PAYMENT: RentalOption[] = [
  {
    id: "best-price",
    title: "Best price",
    description:
      "Pay now, cancel anytime, and rebook for a fee. A 10% cancellation fee applies.",
    badge: "Included",
  },
];

const MILEAGE: RentalOption[] = [
  {
    id: "250-km-day",
    title: "250 km per day",
    description: "AED 27 + VAT for every additional kilometre.",
    badge: "Included",
  },
];

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

export const rentalOptionsStore = {
  async listPayment(): Promise<RentalOption[]> {
    return clone(PAYMENT);
  },
  async listMileage(): Promise<RentalOption[]> {
    return clone(MILEAGE);
  },
  async findPayment(id: string): Promise<RentalOption | null> {
    return clone(PAYMENT.find((option) => option.id === id) ?? null);
  },
  async findMileage(id: string): Promise<RentalOption | null> {
    return clone(MILEAGE.find((option) => option.id === id) ?? null);
  },
};
