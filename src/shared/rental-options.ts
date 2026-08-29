import { z } from "zod";

export const rentalOptionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  badge: z.string(),
});

export type RentalOption = z.infer<typeof rentalOptionSchema>;
