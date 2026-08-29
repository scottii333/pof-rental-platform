export const RENTAL_DAYS = 7;
const VAT_RATE = 0.05;

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
  protectionPerDay?: number;
  addonsPerDay?: number;
  addonsOneTime?: number;
  rentalDays?: number;
  vatRate?: number;
};

export const getPriceBreakdown = ({
  dailyPrice,
  protectionPerDay = 0,
  addonsPerDay = 0,
  addonsOneTime = 0,
  rentalDays = RENTAL_DAYS,
  vatRate = VAT_RATE,
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

const amount = new Intl.NumberFormat("en-AE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatAed = (value: number) => `${amount.format(value)} AED`;
