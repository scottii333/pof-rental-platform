"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Repeat2 } from "lucide-react";

import type { Addon } from "@/shared/addon";
import type { Car } from "@/shared/car";
import type { BookingConfirmation } from "@/shared/booking";
import type { GuestBookingInput } from "@/shared/guest-booking";
import type { ProtectionPackage } from "@/shared/protection-package";
import type { RentalOption } from "@/shared/rental-options";
import { getPriceBreakdown } from "@/features/booking/pricing";
import BackButton from "@/features/booking/components/back-button";
import PriceDetailsDialog from "@/features/booking/components/price-details-dialog";
import { toast } from "@/components/ui/toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const router = useRouter();
  const [priceDetailsOpen, setPriceDetailsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState<BookingConfirmation | null>(null);

  const mutation = useCreateBookingMutation((confirmation) => {
    setConfirmationData(confirmation);
    setConfirmationOpen(true);
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

      <AlertDialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <AlertDialogContent className="max-w-sm w-[90%] gap-0 p-4">
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#c9a86a]/10">
              <Check className="size-6 text-[#c9a86a]" />
            </div>

            <AlertDialogTitle className="text-center text-lg font-bold">
              Booking Confirmed!
            </AlertDialogTitle>

            <div className="w-full space-y-2 text-center">
              <p className="text-xs text-muted-foreground">Reference number:</p>
              <div className="rounded bg-[#c9a86a]/10 px-3 py-2">
                <p className="font-mono text-sm font-bold tracking-wider text-[#c9a86a]">
                  {confirmationData?.reference}
                </p>
              </div>

              <div className="space-y-1 pt-2 text-left text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span className="font-medium">{confirmationData?.car.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Days:</span>
                  <span className="font-medium">{confirmationData?.rentalDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-bold text-[#c9a86a]">
                    AED {confirmationData?.total}
                  </span>
                </div>
              </div>

              <div className="rounded border border-[#c9a86a]/20 bg-[#c9a86a]/5 px-3 py-2 text-xs text-muted-foreground">
                This is a mockup
              </div>
            </div>

            <button
              onClick={() => router.push("/easytogo")}
              className="w-full flex items-center justify-center gap-2 rounded bg-[#c9a86a] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#c9a86a]/90"
            >
              <Repeat2 className="size-4" />
              Book Another Car
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CheckoutView;
