"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Gauge, Loader2 } from "lucide-react";

import { Car } from "@/shared/car";
import type { RentalOption } from "@/shared/rental-options";
import { getPriceBreakdown } from "@/features/booking/pricing";
import { getRentalDays } from "@/shared/search";
import PriceDetailsDialog from "@/features/booking/components/price-details-dialog";
import CarBookingOptions from "./car-booking-options";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getBrandLogo } from "../brand-logos";

const priceFormatter = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 0,
});

type CarCardProps = {
  car: Car;
  paymentOptions: RentalOption[];
  mileageOptions: RentalOption[];
};

const CarCard = ({ car, paymentOptions, mileageOptions }: CarCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandLogo = getBrandLogo(car.brand);
  const [priceDetailsOpen, setPriceDetailsOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const busy = isNavigating || isCancelling;

  const goToInsurance = () => {
    if (busy) return;
    setIsNavigating(true);

    setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("car", car.id);
      params.set("payment", paymentOptions[0].id);
      params.set("mileage", mileageOptions[0].id);
      router.push(`/easytogo/insurance?${params.toString()}`);
    }, 2000);
  };

  const cancelBooking = () => {
    if (busy) return;
    setIsCancelling(true);
    setTimeout(() => {
      setBookingOpen(false);
      setIsCancelling(false);
    }, 1000);
  };

  const pickupParam = searchParams.get("pickupDateTime");
  const returnParam = searchParams.get("returnDateTime");
  const rentalDays =
    pickupParam && returnParam
      ? getRentalDays(new Date(pickupParam), new Date(returnParam))
      : 1;

  const { total: totalInclTax } = getPriceBreakdown({
    dailyPrice: car.pricePerDay,
    rentalDays,
  });

  return (
    <>
      <AlertDialog
        open={bookingOpen}
        onOpenChange={(next) => {
          if (busy) return;
          setBookingOpen(next);
        }}
      >
        <AlertDialogTrigger
          render={
            <button
              type="button"
              aria-label={`View ${car.name}`}
              className="group relative block aspect-3/4 w-full overflow-hidden rounded-lg border border-[#c9a86a]/40 text-left transition-all duration-300 ease-out hover:scale-[1.03] hover:border-[#c9a86a] hover:shadow-lg hover:ring-1 hover:ring-[#c9a86a]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a86a]"
            />
          }
        >
          <Image
            src={car.imageUrl}
            alt={`${car.brand} ${car.name}`}
            width={320}
            height={240}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          {brandLogo && (
            <Image
              src={brandLogo}
              alt={`${car.brand} logo`}
              width={72}
              height={72}
              className="absolute left-3 top-3 h-18 w-18 object-contain"
            />
          )}
          <span className="absolute right-3 top-3 max-w-[60%] text-right text-base font-semibold text-black">
            {car.name}
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
            <span className="flex flex-col gap-1 text-sm font-medium">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {car.seats}
              </span>
              <span className="flex items-center gap-1 capitalize">
                <Gauge className="h-4 w-4" />
                {car.transmission}
              </span>
            </span>
            <span className="text-right text-xl font-bold text-black">
              {priceFormatter.format(car.pricePerDay)}
              <span className="text-xs font-normal"> / day</span>
            </span>
          </span>
        </AlertDialogTrigger>

        <AlertDialogContent className="h-[80%] w-[90%] gap-4 overflow-y-auto p-4 md:h-[60%] md:overflow-y-visible data-[size=default]:max-w-[90vw] data-[size=default]:sm:max-w-lg data-[size=default]:md:max-w-3xl data-[size=default]:lg:max-w-4xl">
          <AlertDialogTitle className="sr-only">
            {car.brand} {car.name}
          </AlertDialogTitle>
          <div className="grid min-h-0 grid-cols-1 gap-4 md:h-full md:grid-cols-2">
            {/* Image View */}
            <div className="relative h-72 min-h-0 overflow-hidden rounded-lg border border-[#c9a86a]/40 sm:h-80 md:h-full">
              <Image
                src={car.imageUrl}
                alt={`${car.brand} ${car.name}`}
                width={640}
                height={480}
                className="h-full w-full object-cover"
              />
              {brandLogo && (
                <Image
                  src={brandLogo}
                  alt={`${car.brand} logo`}
                  width={72}
                  height={72}
                  className="absolute left-3 top-3 h-18 w-18 object-contain"
                />
              )}
              <span className="absolute right-3 top-3 max-w-[60%] text-right text-base font-semibold text-black">
                {car.name}
              </span>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
                <span className="flex flex-col gap-1 text-sm font-medium">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {car.seats}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <Gauge className="h-4 w-4" />
                    {car.transmission}
                  </span>
                </span>
                <span className="text-right text-xl font-bold text-black">
                  {priceFormatter.format(car.pricePerDay)}
                  <span className="text-xs font-normal"> / day</span>
                </span>
              </span>
            </div>

            {/* Booking Options */}
            <div className="flex flex-col gap-4 pb-4 md:pb-0">
              <CarBookingOptions
                paymentOptions={paymentOptions}
                mileageOptions={mileageOptions}
              />
              <AlertDialogFooter className="mt-auto flex-row items-end justify-between sm:justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    Total (Incl. Tax) :
                  </span>
                  <span className="text-2xl font-bold">
                    {priceFormatter.format(totalInclTax)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPriceDetailsOpen(true)}
                    className="w-fit text-sm underline underline-offset-2"
                  >
                    Price details
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={cancelBooking}
                    disabled={busy}
                    className="inline-flex h-9 w-24 items-center justify-center rounded-md border border-red-500/30 bg-red-500/10 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/20 disabled:opacity-70"
                  >
                    {isCancelling ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      "Cancel"
                    )}
                  </button>
                  <AlertDialogAction
                    onClick={goToInsurance}
                    disabled={busy}
                    className="w-24 bg-[#c9a86a] text-white hover:bg-[#c9a86a]/90"
                  >
                    {isNavigating ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      "Next"
                    )}
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <PriceDetailsDialog
        dailyPrice={car.pricePerDay}
        rentalDays={rentalDays}
        open={priceDetailsOpen}
        onOpenChange={setPriceDetailsOpen}
      />
    </>
  );
};

export default CarCard;
