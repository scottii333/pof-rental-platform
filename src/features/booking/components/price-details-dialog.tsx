"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatAed, getPriceBreakdown } from "@/features/booking/pricing";

type PriceDetailsDialogProps = {
  dailyPrice: number;
  rentalDays: number;
  protectionPerDay?: number;
  addonsPerDay?: number;
  addonsOneTime?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PriceDetailsDialog = ({
  dailyPrice,
  rentalDays,
  protectionPerDay = 0,
  addonsPerDay = 0,
  addonsOneTime = 0,
  open,
  onOpenChange,
}: PriceDetailsDialogProps) => {
  const { tax, total, vatRate } = getPriceBreakdown({
    dailyPrice,
    protectionPerDay,
    addonsPerDay,
    addonsOneTime,
    rentalDays,
  });

  const rows: { label: string; value: string }[] = [
    { label: "Daily Average Price", value: `${formatAed(dailyPrice)}/Day` },
    { label: "Payment Option", value: formatAed(0) },
    { label: "Mileage Option", value: formatAed(0) },
    { label: "Protection", value: formatAed(protectionPerDay * rentalDays) },
    {
      label: "Extra AddsOn",
      value: formatAed(addonsPerDay * rentalDays + addonsOneTime),
    },
    { label: "Membership discount", value: "0.00 %" },
    { label: "Rental days", value: `${rentalDays} Day(s)` },
    { label: `Tax Amount (${vatRate * 100}%)`, value: formatAed(tax) },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] max-w-lg gap-4 p-4">
        <DialogHeader>
          <DialogTitle>Price Details</DialogTitle>
          <DialogDescription className="sr-only">
            Breakdown of the rental charges, taxes included.
          </DialogDescription>
        </DialogHeader>

        <section className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Rental charges</h3>
          <dl className="flex flex-col divide-y divide-border text-sm">
            {rows.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 py-2">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="text-right tabular-nums">{row.value}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 pt-2 font-semibold">
              <dt>Total (incl. tax)</dt>
              <dd className="text-right tabular-nums">{formatAed(total)}</dd>
            </div>
          </dl>
        </section>

        <p className="text-xs text-muted-foreground">
          <span className="underline">Note:</span> Prices include VAT at the
          current rate. Total may include fees like pickup and return location
          charges.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default PriceDetailsDialog;
