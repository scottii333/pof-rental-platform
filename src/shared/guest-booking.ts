import { isSupportedCountry, isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const guestBookingSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Enter your name")
      .max(100, "Name is too long"),
    email: z.string().trim().toLowerCase().email("Enter a valid email"),
    retypeEmail: z.string().trim().toLowerCase().email("Enter a valid email"),
    /** ISO 3166-1 alpha-2 country code, e.g. "AE". */
    country: z
      .string()
      .refine(isSupportedCountry, { message: "Select your country" }),
    phone: z.string().trim().min(1, "Enter your phone number"),
    agreeTerms: z.literal(true, {
      message: "You must accept the terms and conditions",
    }),
    above25: z.literal(true, { message: "You must be above 25 years old" }),
  })
  .refine((data) => data.email === data.retypeEmail, {
    path: ["retypeEmail"],
    message: "Emails do not match",
  })
  .refine(
    (data) =>
      isSupportedCountry(data.country) &&
      isValidPhoneNumber(data.phone, data.country),
    {
      path: ["phone"],
      message: "Enter a valid phone number for the selected country",
    },
  );

export type GuestBookingInput = z.infer<typeof guestBookingSchema>;
