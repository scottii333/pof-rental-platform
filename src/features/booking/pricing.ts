import type { Addon } from "@/shared/addon";
import { config } from "@/config";

/** Default rental length used only by the demo "rolling" schedule. */
export const RENTAL_DAYS = 7;

export type PriceBreakdown = {
  dailyPrice: number;
  protectionPerDay: number;
  addonsPerDay: number;
  addonsOneTime: number;
  rentalDays: number;
  vatRate: number;
  subtotal: number;
  tax: number;
  total: number;
};

type PriceBreakdownInput = {
  dailyPrice: number;
  rentalDays: number;
  protectionPerDay?: number;
  addonsPerDay?: number;
  addonsOneTime?: number;
  vatRate?: number;
};

export const getPriceBreakdown = ({
  dailyPrice,
  rentalDays,
  protectionPerDay = 0,
  addonsPerDay = 0,
  addonsOneTime = 0,
  vatRate = config.currency.taxRate,
}: PriceBreakdownInput): PriceBreakdown => {
  const subtotal =
    (dailyPrice + protectionPerDay + addonsPerDay) * rentalDays + addonsOneTime;
  const tax = subtotal * vatRate;

  return {
    dailyPrice,
    protectionPerDay,
    addonsPerDay,
    addonsOneTime,
    rentalDays,
    vatRate,
    subtotal,
    tax,
    total: subtotal + tax,
  };
};

export type AddonCost = { perDay: number; oneTime: number };

/** Split a list of add-ons into per-day and one-time totals. */
export const splitAddonCost = (addons: Addon[]): AddonCost => {
  let perDay = 0;
  let oneTime = 0;
  for (const addon of addons) {
    if (addon.billing === "per-day") perDay += addon.price;
    else oneTime += addon.price;
  }
  return { perDay, oneTime };
};

const amount = new Intl.NumberFormat("en-AE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatAed = (value: number) =>
  `${amount.format(value)} ${config.currency.symbol}`;
