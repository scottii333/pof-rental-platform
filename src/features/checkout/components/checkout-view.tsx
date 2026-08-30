"use client";

import { useMemo, useState } from "react";

import type { Addon } from "@/shared/addon";
import type { Car } from "@/shared/car";
import type { GuestBookingInput } from "@/shared/guest-booking";
import type { ProtectionPackage } from "@/shared/protection-package";
import type { RentalOption } from "@/shared/rental-options";
import { getPriceBreakdown } from "@/features/booking/pricing";
import BackButton from "@/features/booking/components/back-button";
import PriceDetailsDialog from "@/features/booking/components/price-details-dialog";
import { toast } from "@/components/ui/toast";
import { useCreateBookingMutation } from "../checkout.queries";
import GuestBookingForm from "./guest-booking-form";
import BookingSummaryPanel from "./booking-summary-panel";

type Schedule = {
  location: string;
  pickup: string;
  return: string;
  days: number;
};

type CheckoutViewProps = {
  car: Car;
  schedule: Schedule;
  protection: ProtectionPackage | null;
  addons: Addon[];
  payment: RentalOption;
  mileage: RentalOption;
  rentalDays: number;
  minLicenseYears: number;
  pickupDateTime: string;
  returnDateTime: string;
  pickupLocation: string;
  returnLocation: string;
};

const CheckoutView = ({
  car,
  schedule,
  protection,
  addons,
  payment,
  mileage,
  rentalDays,
  minLicenseYears,
  pickupDateTime,
  returnDateTime,
  pickupLocation,
  returnLocation,
}: CheckoutViewProps) => {
  const [priceDetailsOpen, setPriceDetailsOpen] = useState(false);
  // Bump to remount the form with fresh, empty fields after a booking.
  const [formKey, setFormKey] = useState(0);

  const mutation = useCreateBookingMutation((confirmation) => {
    toast.add({
      title: "Booking confirmed (Mockup)",
      description: `Reference ${confirmation.reference}. This is a mockup — no email has been sent.`,
      type: "success",
    });
    setFormKey((key) => key + 1);
  });

  const { addonsPerDay, addonsOneTime } = useMemo(() => {
    let perDay = 0;
    let oneTime = 0;
    for (const addon of addons) {
      if (addon.billing === "per-day") perDay += addon.price;
      else oneTime += addon.price;
    }
    return { addonsPerDay: perDay, addonsOneTime: oneTime };
  }, [addons]);

  const protectionPerDay = protection?.pricePerDay ?? 0;

  const { total } = getPriceBreakdown({
    dailyPrice: car.pricePerDay,
    protectionPerDay,
    addonsPerDay,
    addonsOneTime,
    rentalDays,
  });

  const handleConfirm = (guest: GuestBookingInput) => {
    mutation.mutate(
      {
        carId: car.id,
        protectionId: protection?.id ?? null,
        addonIds: addons.map((addon) => addon.id),
        paymentOptionId: payment.id,
        mileageOptionId: mileage.id,
        pickupLocation,
        returnLocation,
        pickupDateTime,
        returnDateTime,
        guest,
      },
      {
        onError: (error) => {
          toast.add({
            title: "Booking failed",
            description: error.message,
            type: "error",
          });
        },
      }
    );
  };

  return (
    <div className="mx-auto w-[85%] py-6">
      <div className="mb-4 flex items-center gap-2">
        <BackButton />
        <h1 className="text-lg font-semibold uppercase tracking-wide">
          Checkout
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GuestBookingForm
          key={formKey}
          minLicenseYears={minLicenseYears}
          pending={mutation.isPending}
          onConfirm={handleConfirm}
        />

        <BookingSummaryPanel
          car={car}
          schedule={schedule}
          protection={protection}
          addons={addons}
          paymentOption={payment.title}
          mileageOption={mileage.title}
          total={total}
          onPriceDetails={() => setPriceDetailsOpen(true)}
        />
      </div>

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

export default CheckoutView;
