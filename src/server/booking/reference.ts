import { config } from "@/config";

export const createBookingReference = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 6);
  return `${config.reference.prefix}-${timestamp}-${random}`.toUpperCase();
};
