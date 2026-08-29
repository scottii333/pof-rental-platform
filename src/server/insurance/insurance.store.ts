import "server-only";

import type { ProtectionPackage } from "@/shared/protection-package";

const PACKAGES: ProtectionPackage[] = [
  {
    id: "basic",
    name: "Basic Protection",
    pricePerDay: 0,
    features: [
      { label: "Third Party Insurance", included: true },
      { label: "Tyre & Windshield Protection", included: false },
      { label: "Interior Protection", included: false },
    ],
  },
  {
    id: "standard",
    name: "Standard Protection",
    pricePerDay: 838.95,
    features: [
      { label: "Full Insurance", included: true },
      { label: "Tyre & Wheel Protection", included: true },
      { label: "Minor Scratches & Dents Protection", included: false },
      { label: "Breakdown Protection", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium Protection",
    pricePerDay: 1573.95,
    features: [
      { label: "Full Insurance", included: true },
      { label: "Tyre & Wheel Protection", included: true },
      { label: "Minor Scratches & Dents Protection", included: true },
      { label: "Breakdown Protection", included: false },
    ],
  },
  {
    id: "elite",
    name: "ELITE Protection",
    pricePerDay: 2098.95,
    features: [
      { label: "Full Insurance", included: true },
      { label: "Tyre & Wheel Protection", included: true },
      { label: "Minor Scratches & Dents Protection", included: true },
      { label: "Breakdown Protection", included: true },
    ],
  },
];

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

export const insuranceStore = {
  async list(): Promise<ProtectionPackage[]> {
    return clone(PACKAGES);
  },
  async findById(id: string): Promise<ProtectionPackage | null> {
    const pkg = PACKAGES.find((entry) => entry.id === id);
    return pkg ? clone(pkg) : null;
  },
};
