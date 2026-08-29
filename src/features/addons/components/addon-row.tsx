"use client";

import { useId, useState } from "react";
import { ChevronDown, Star } from "lucide-react";

import type { Addon } from "@/shared/addon";
import { formatAed } from "@/features/booking/pricing";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const billingLabel: Record<Addon["billing"], string> = {
  "per-day": "PerDay",
  "one-time": "OneTime",
};

type AddonRowProps = {
  addon: Addon;
  selected: boolean;
  onToggle: (selected: boolean) => void;
};

const AddonRow = ({ addon, selected, onToggle }: AddonRowProps) => {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <div className="rounded-lg border border-[#c9a86a]/40">
      <div className="flex items-center gap-4 p-4">
        {addon.featured && (
          <Star className="size-4 shrink-0 fill-[#c9a86a] text-[#c9a86a]" />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="font-medium">{addon.name}</span>
          <span className="text-sm text-muted-foreground">
            {formatAed(addon.price)} ({billingLabel[addon.billing]})
          </span>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          aria-controls={detailsId}
          className="flex shrink-0 items-center gap-1 text-sm underline underline-offset-2"
        >
          Details
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </button>

        <Switch
          checked={selected}
          onCheckedChange={onToggle}
          aria-label={`Add ${addon.name}`}
          className="shrink-0 data-checked:bg-[#c9a86a]"
        />
      </div>

      <div
        id={detailsId}
        className={cn(
          "grid transition-all duration-200 ease-out",
          expanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="border-t border-[#c9a86a]/20 px-4 py-3 text-sm text-muted-foreground">
            {addon.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddonRow;
