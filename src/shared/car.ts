import z from "zod";

export const carSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.enum(["sedan", "suv", "sports", "luxury"]),
  year: z.number().int(),
  seats: z.number().int(),
  transmission: z.enum(["automatic", "manual"]),
  imageUrl: z.string(),
  pricePerDay: z.number().int(),
  available: z.boolean(),
});

export type Car = z.infer<typeof carSchema>;

/** Shape returned by `GET /api/cars`. */
export const carsResponseSchema = z.object({
  cars: z.array(carSchema),
});
