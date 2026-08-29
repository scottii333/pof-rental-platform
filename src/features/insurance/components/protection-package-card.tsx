import { Check, X } from "lucide-react";

import type { ProtectionPackage } from "@/shared/protection-package";
import { formatAed } from "@/features/booking/pricing";
import { cn } from "@/lib/utils";

type ProtectionPackageCardProps = {
  package: ProtectionPackage;
  selected: boolean;
  onSelect: () => void;
};

const ProtectionPackageCard = ({
  package: pkg,
  selected,
  onSelect,
}: ProtectionPackageCardProps) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    className={cn(
      "flex h-full flex-col gap-4 rounded-lg border p-4 text-left transition-all duration-200",
      selected
        ? "border-[#c9a86a] bg-[#c9a86a]/10"
        : "border-[#c9a86a]/40 hover:border-[#c9a86a]/70"
    )}
  >
    <div className="flex items-center justify-between gap-2">
      <h3 className="font-semibold">{pkg.name}</h3>
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-[#c9a86a]" : "border-[#c9a86a]/40"
        )}
      >
        {selected && <span className="size-2.5 rounded-full bg-[#c9a86a]" />}
      </span>
    </div>

    <ul className="flex flex-1 flex-col gap-2 text-sm">
      {pkg.features.map((feature) => (
        <li
          key={feature.label}
          className={cn(
            "flex items-center gap-2",
            !feature.included && "text-muted-foreground"
          )}
        >
          {feature.included ? (
            <Check className="size-4 shrink-0 text-[#c9a86a]" />
          ) : (
            <X className="size-4 shrink-0 text-muted-foreground" />
          )}
          {feature.label}
        </li>
      ))}
    </ul>

    <p className="text-sm font-semibold">
      {pkg.pricePerDay === 0 ? "Included" : `${formatAed(pkg.pricePerDay)}/day`}
    </p>
  </button>
);

export default ProtectionPackageCard;
