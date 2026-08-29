import { Suspense } from "react";
import { redirect } from "next/navigation";

import { resolveSchedule } from "@/features/booking/booking-details";
import InsuranceStep from "@/features/insurance/components/insurance-step";
import { listCars, getCar } from "@/server/cars/cars.service";
import { listProtectionPackages } from "@/server/insurance/insurance.service";

const MIN_LICENSE_YEARS = 1;

type InsurancePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const str = (value: string | string[] | undefined) =>
  typeof value === "string" ? value : undefined;

const InsurancePage = async ({ searchParams }: InsurancePageProps) => {
  const params = await searchParams;

  const pickupDateTime = str(params.pickupDateTime);
  const returnDateTime = str(params.returnDateTime);
  if (!pickupDateTime || !returnDateTime) redirect("/easytogo");

  const car =
    (await getCar(str(params.car) ?? "")) ?? (await listCars())[0];
  const packages = await listProtectionPackages();

  const schedule = resolveSchedule(
    pickupDateTime,
    returnDateTime,
    str(params.pickupLocation)
  );

  return (
    <main>
      <Suspense>
        <InsuranceStep
          car={car}
          packages={packages}
          rentalDays={schedule.days}
          minLicenseYears={MIN_LICENSE_YEARS}
        />
      </Suspense>
    </main>
  );
};

export default InsurancePage;
