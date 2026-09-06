import { Suspense } from "react";
import { redirect } from "next/navigation";

import { readParam } from "@/lib/search-params";
import { loadBookingContext } from "@/server/booking/booking-context";
import AddonsStep from "@/features/addons/components/addons-step";
import { listAddons } from "@/server/addons/addons.service";
import { getProtectionPackage } from "@/server/insurance/insurance.service";

type AddonsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const AddonsPage = async ({ searchParams }: AddonsPageProps) => {
  const params = await searchParams;

  const context = await loadBookingContext(params);
  if (!context) redirect("/easytogo");

  const addons = await listAddons();
  const protection = await getProtectionPackage(readParam(params.protection));

  return (
    <main>
      <Suspense>
        <AddonsStep
          car={context.car}
          addons={addons}
          protectionPerDay={protection?.pricePerDay ?? 0}
          rentalDays={context.schedule.days}
        />
      </Suspense>
    </main>
  );
};

export default AddonsPage;
