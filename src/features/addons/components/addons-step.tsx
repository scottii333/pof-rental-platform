"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Addon } from "@/shared/addon";
import type { Car } from "@/shared/car";
import { getPriceBreakdown } from "@/features/booking/pricing";
import BackButton from "@/features/booking/components/back-button";
import BookingSummaryBar from "@/features/booking/components/booking-summary-bar";
import PriceDetailsDialog from "@/features/booking/components/price-details-dialog";
import AddonRow from "./addon-row";

type AddonsStepProps = {
  car: Car;
  addons: Addon[];
  protectionPerDay: number;
  rentalDays: number;
};

const parseSelected = (raw: string | null, addons: Addon[]): Set<string> => {
  if (!raw) return new Set();
  const valid = new Set(addons.map((addon) => addon.id));
  return new Set(raw.split(",").filter((id) => valid.has(id)));
};

const AddonsStep = ({
  car,
  addons,
  protectionPerDay,
  rentalDays,
}: AddonsStepProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [priceDetailsOpen, setPriceDetailsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const selectedIds = useMemo(
    () => parseSelected(searchParams.get("addons"), addons),
    [searchParams, addons]
  );

  const { addonsPerDay, addonsOneTime } = useMemo(() => {
    let perDay = 0;
    let oneTime = 0;
    for (const addon of addons) {
      if (!selectedIds.has(addon.id)) continue;
      if (addon.billing === "per-day") perDay += addon.price;
      else oneTime += addon.price;
    }
    return { addonsPerDay: perDay, addonsOneTime: oneTime };
  }, [addons, selectedIds]);

  const { total } = useMemo(
    () =>
      getPriceBreakdown({
        dailyPrice: car.pricePerDay,
        protectionPerDay,
        addonsPerDay,
        addonsOneTime,
        rentalDays,
      }),
    [car.pricePerDay, protectionPerDay, addonsPerDay, addonsOneTime, rentalDays]
  );

  const toggle = useCallback(
    (id: string, next: boolean) => {
      const ids = new Set(selectedIds);
      if (next) ids.add(id);
      else ids.delete(id);

      const params = new URLSearchParams(searchParams);
      if (ids.size > 0) params.set("addons", [...ids].join(","));
      else params.delete("addons");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams, selectedIds]
  );

  const goNext = useCallback(() => {
    if (isNavigating) return;
    setIsNavigating(true);
    const params = new URLSearchParams(searchParams);
    params.set("car", car.id);
    setTimeout(() => {
      router.push(`/easytogo/checkout?${params.toString()}`);
    }, 2000);
  }, [car.id, isNavigating, router, searchParams]);

  return (
    <div className="mx-auto w-[80%]">
      <div className="my-6 flex flex-col gap-4 pb-24">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-lg font-semibold uppercase tracking-wide">
            Do you need any extras?
          </h1>
        </div>

        <div className="flex flex-col gap-3">
          {addons.map((addon) => (
            <AddonRow
              key={addon.id}
              addon={addon}
              selected={selectedIds.has(addon.id)}
              onToggle={(next) => toggle(addon.id, next)}
            />
          ))}
        </div>
      </div>

      <BookingSummaryBar
        total={total}
        loading={isNavigating}
        onPriceDetails={() => setPriceDetailsOpen(true)}
        onNext={goNext}
      />

      <PriceDetailsDialog
        dailyPrice={car.pricePerDay}
        rentalDays={rentalDays}
        protectionPerDay={protectionPerDay}
        addonsPerDay={addonsPerDay}
        addonsOneTime={addonsOneTime}
        open={priceDetailsOpen}
        onOpenChange={setPriceDetailsOpen}
      />
    </div>
  );
};

export default AddonsStep;
