import { z } from "zod";

const protectionFeatureSchema = z.object({
  label: z.string(),
  included: z.boolean(),
});

export const protectionPackageSchema = z.object({
  id: z.enum(["basic", "standard", "premium", "elite"]),
  name: z.string(),
  pricePerDay: z.number().nonnegative(),
  features: z.array(protectionFeatureSchema).min(1),
});

export type ProtectionPackage = z.infer<typeof protectionPackageSchema>;
export type ProtectionPackageId = ProtectionPackage["id"];
