import "server-only";

import type { Addon } from "@/shared/addon";

const ADDONS: Addon[] = [
  {
    id: "free-deposit-ultimate",
    name: "Free Deposit – Ultimate",
    price: 1181.25,
    billing: "per-day",
    featured: true,
    description:
      "The deposit is conditional and subject to rental terms, making the booking process easier and more convenient.",
  },
  {
    id: "car-delivery-dubai",
    name: "Car Delivery (Dubai City)",
    price: 136.5,
    billing: "one-time",
    featured: true,
    description:
      "This service is available only within Dubai City. The one-time cost may change if the distance is longer.",
  },
  {
    id: "car-pickup-dubai",
    name: "Car Pickup (Dubai City)",
    price: 136.5,
    billing: "one-time",
    featured: true,
    description:
      "This service is available only within Dubai City. The one-time cost may change if the distance is longer.",
  },
  {
    id: "additional-driver",
    name: "Additional Driver",
    price: 210,
    billing: "one-time",
    featured: false,
    description:
      "Add another driver to split the driving and enjoy a stress-free trip. All additional drivers must show a valid license when collecting the car.",
  },
  {
    id: "baby-seat",
    name: "Baby Seat",
    price: 21,
    billing: "per-day",
    featured: false,
    description:
      "Baby seat for your child’s safety and comfort during the ride.",
  },
];

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

export const addonsStore = {
  async list(): Promise<Addon[]> {
    return clone(ADDONS);
  },
  async findByIds(ids: string[]): Promise<Addon[]> {
    const wanted = new Set(ids);
    return clone(ADDONS.filter((addon) => wanted.has(addon.id)));
  },
};
