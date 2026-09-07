import { Suspense } from "react";
import { redirect } from "next/navigation";

import { config } from "@/config";
import { loadBookingContext } from "@/server/booking/booking-context";
import InsuranceStep from "@/features/insurance/components/insurance-step";
import StepSkeleton from "@/features/booking/components/step-skeleton";
import { listProtectionPackages } from "@/server/insurance/insurance.service";

type InsurancePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const InsurancePage = async ({ searchParams }: InsurancePageProps) => {
  const context = await loadBookingContext(await searchParams);
  if (!context) redirect("/easytogo");

  const packages = await listProtectionPackages();

  return (
    <main>
      <Suspense fallback={<StepSkeleton />}>
        <InsuranceStep
          car={context.car}
          packages={packages}
          rentalDays={context.schedule.days}
          minLicenseYears={config.rental.minLicenseYears}
        />
      </Suspense>
    </main>
  );
};

export default InsurancePage;
