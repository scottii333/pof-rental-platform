const DAY_MS = 24 * 60 * 60 * 1000;

export const config = {
  cache: {
    staleTime: {
      default: 60 * 1000,
      carSearch: 30 * 1000,
    },
    gcTime: 5 * 60 * 1000,
  },
  loading: {
    minDelay: 2000,
  },
  rental: {
    branch: "Dubai Sheikh Zayed Road (POF Rental)",
    minDaysMs: 1 * DAY_MS,
    maxDaysMs: 30 * DAY_MS,
    operatingHours: {
      open: 9,
      close: 18,
    },
    operatingDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
  },
  currency: {
    symbol: "AED",
    taxRate: 0.05,
  },
  reference: {
    prefix: "POF",
  },
} as const;
