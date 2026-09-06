import { redirect } from "next/navigation";

import { config } from "@/config";
import { readParam, readParamList } from "@/lib/search-params";
import { formatSchedule } from "@/features/booking/booking-details";
import { loadBookingContext } from "@/server/booking/booking-context";
import CheckoutView from "@/features/checkout/components/checkout-view";
import { listAddons } from "@/server/addons/addons.service";
import { getProtectionPackage } from "@/server/insurance/insurance.service";
import {
  getMileageOption,
  getPaymentOption,
} from "@/server/rental-options/rental-options.service";

type CheckoutPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const CheckoutPage = async ({ searchParams }: CheckoutPageProps) => {
  const params = await searchParams;

  const context = await loadBookingContext(params);
  if (!context) redirect("/easytogo");

  const protection = await getProtectionPackage(readParam(params.protection));

  const wantedAddons = new Set(readParamList(params.addons));
  const addons = (await listAddons()).filter((addon) =>
    wantedAddons.has(addon.id),
  );

  const payment = await getPaymentOption(readParam(params.payment));
  const mileage = await getMileageOption(readParam(params.mileage));

  return (
    <main>
      <CheckoutView
        car={context.car}
        schedule={formatSchedule(context.schedule)}
        protection={protection}
        addons={addons}
        payment={payment}
        mileage={mileage}
        rentalDays={context.schedule.days}
        minLicenseYears={config.rental.minLicenseYears}
        pickupDateTime={context.schedule.pickup.toISOString()}
        returnDateTime={context.schedule.return.toISOString()}
        pickupLocation={context.pickupLocation}
        returnLocation={context.returnLocation}
      />
    </main>
  );
};

export default CheckoutPage;
