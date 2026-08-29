import { z } from "zod";

export const addonSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  billing: z.enum(["one-time", "per-day"]),
  featured: z.boolean(),
  description: z.string(),
});

export type Addon = z.infer<typeof addonSchema>;
