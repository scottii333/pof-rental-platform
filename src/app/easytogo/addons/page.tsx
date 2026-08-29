import { Suspense } from "react";
import { redirect } from "next/navigation";

import { resolveSchedule } from "@/features/booking/booking-details";
import AddonsStep from "@/features/addons/components/addons-step";
import { listAddons } from "@/server/addons/addons.service";
import { listCars, getCar } from "@/server/cars/cars.service";
import { getProtectionPackage } from "@/server/insurance/insurance.service";

type AddonsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const str = (value: string | string[] | undefined) =>
  typeof value === "string" ? value : undefined;

const AddonsPage = async ({ searchParams }: AddonsPageProps) => {
  const params = await searchParams;

  const pickupDateTime = str(params.pickupDateTime);
  const returnDateTime = str(params.returnDateTime);
  if (!pickupDateTime || !returnDateTime) redirect("/easytogo");

  const car =
    (await getCar(str(params.car) ?? "")) ?? (await listCars())[0];
  const addons = await listAddons();
  const protection = await getProtectionPackage(str(params.protection));

  const schedule = resolveSchedule(
    pickupDateTime,
    returnDateTime,
    str(params.pickupLocation)
  );

  return (
    <main>
      <Suspense>
        <AddonsStep
          car={car}
          addons={addons}
          protectionPerDay={protection?.pricePerDay ?? 0}
          rentalDays={schedule.days}
        />
      </Suspense>
    </main>
  );
};

export default AddonsPage;
