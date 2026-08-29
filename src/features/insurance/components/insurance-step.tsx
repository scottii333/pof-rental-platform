"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Info } from "lucide-react";

import type { Car } from "@/shared/car";
import {
  protectionPackageSchema,
  type ProtectionPackage,
  type ProtectionPackageId,
} from "@/shared/protection-package";
import { getPriceBreakdown } from "@/features/booking/pricing";
import BackButton from "@/features/booking/components/back-button";
import BookingSummaryBar from "@/features/booking/components/booking-summary-bar";
import PriceDetailsDialog from "@/features/booking/components/price-details-dialog";
import ProtectionPackageCard from "./protection-package-card";

const idSchema = protectionPackageSchema.shape.id;

type InsuranceStepProps = {
  car: Car;
  packages: ProtectionPackage[];
  rentalDays: number;
  minLicenseYears: number;
};

const InsuranceStep = ({
  car,
  packages,
  rentalDays,
  minLicenseYears,
}: InsuranceStepProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [priceDetailsOpen, setPriceDetailsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const fallbackId = packages[0].id;
  const parsedParam = idSchema.safeParse(searchParams.get("protection"));
  const selectedId: ProtectionPackageId = parsedParam.success
    ? parsedParam.data
    : fallbackId;

  const selected =
    packages.find((pkg) => pkg.id === selectedId) ?? packages[0];

  const { total } = useMemo(
    () =>
      getPriceBreakdown({
        dailyPrice: car.pricePerDay,
        protectionPerDay: selected.pricePerDay,
        rentalDays,
      }),
    [car.pricePerDay, selected.pricePerDay, rentalDays]
  );

  const select = useCallback(
    (id: ProtectionPackageId) => {
      const params = new URLSearchParams(searchParams);
      params.set("protection", id);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const goNext = useCallback(() => {
    if (isNavigating) return;
    setIsNavigating(true);
    const params = new URLSearchParams(searchParams);
    params.set("car", car.id);
    params.set("protection", selectedId);
    setTimeout(() => {
      router.push(`/easytogo/addons?${params.toString()}`);
    }, 2000);
  }, [car.id, isNavigating, router, searchParams, selectedId]);

  return (
    <div className="mx-auto w-[80%]">
      <div className="my-6 flex flex-col gap-6 pb-24">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-lg font-semibold uppercase tracking-wide">
            Which protection package you need?
          </h1>
        </div>

        <p className="flex items-center gap-2 rounded-md bg-[#c9a86a]/10 px-4 py-3 text-sm text-muted-foreground">
          <Info className="size-4 shrink-0 text-[#c9a86a]" />
          Drivers must have held their driver&apos;s license for at least{" "}
          {minLicenseYears} year(s) for this vehicle.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <ProtectionPackageCard
              key={pkg.id}
              package={pkg}
              selected={pkg.id === selectedId}
              onSelect={() => select(pkg.id)}
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
        protectionPerDay={selected.pricePerDay}
        open={priceDetailsOpen}
        onOpenChange={setPriceDetailsOpen}
      />
    </div>
  );
};

export default InsuranceStep;
