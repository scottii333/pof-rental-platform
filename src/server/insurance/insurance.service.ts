import type { ProtectionPackage } from "@/shared/protection-package";

import { insuranceStore } from "./insurance.store";

export const listProtectionPackages = async (): Promise<ProtectionPackage[]> =>
  insuranceStore.list();

export const getProtectionPackage = async (
  id: string | null | undefined
): Promise<ProtectionPackage | null> =>
  id ? insuranceStore.findById(id) : null;
