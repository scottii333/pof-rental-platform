import { redirect } from "next/navigation";

import {
  formatBookingMoment,
  resolveSchedule,
} from "@/features/booking/booking-details";
import { BRANCH_LOCATION } from "@/shared/search";
import CheckoutView from "@/features/checkout/components/checkout-view";
import { listAddons } from "@/server/addons/addons.service";
import { listCars, getCar } from "@/server/cars/cars.service";
import { getProtectionPackage } from "@/server/insurance/insurance.service";
import {
  getMileageOption,
  getPaymentOption,
} from "@/server/rental-options/rental-options.service";

const MIN_LICENSE_YEARS = 1;

type CheckoutPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const str = (value: string | string[] | undefined) =>
  typeof value === "string" ? value : undefined;

const readList = (value: string | string[] | undefined): string[] =>
  typeof value === "string" && value.length > 0 ? value.split(",") : [];

const CheckoutPage = async ({ searchParams }: CheckoutPageProps) => {
  const params = await searchParams;

  const pickupDateTime = str(params.pickupDateTime);
  const returnDateTime = str(params.returnDateTime);
  if (!pickupDateTime || !returnDateTime) redirect("/easytogo");

  const car = (await getCar(str(params.car) ?? "")) ?? (await listCars())[0];
  const protection = await getProtectionPackage(str(params.protection));

  const allAddons = await listAddons();
  const wantedAddons = new Set(readList(params.addons));
  const addons = allAddons.filter((addon) => wantedAddons.has(addon.id));

  const payment = await getPaymentOption(str(params.payment));
  const mileage = await getMileageOption(str(params.mileage));

  const raw = resolveSchedule(
    pickupDateTime,
    returnDateTime,
    str(params.pickupLocation),
  );
  const schedule = {
    location: raw.location,
    pickup: formatBookingMoment(raw.pickup),
    return: formatBookingMoment(raw.return),
    days: raw.days,
  };

  return (
    <main>
      <CheckoutView
        car={car}
        schedule={schedule}
        protection={protection}
        addons={addons}
        payment={payment}
        mileage={mileage}
        rentalDays={raw.days}
        minLicenseYears={MIN_LICENSE_YEARS}
        pickupDateTime={raw.pickup.toISOString()}
        returnDateTime={raw.return.toISOString()}
        pickupLocation={str(params.pickupLocation) ?? BRANCH_LOCATION}
        returnLocation={str(params.returnLocation) ?? BRANCH_LOCATION}
      />
    </main>
  );
};

export default CheckoutPage;
