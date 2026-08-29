import Image from "next/image";
import { MapPin } from "lucide-react";

import type { Addon } from "@/shared/addon";
import type { Car } from "@/shared/car";
import type { ProtectionPackage } from "@/shared/protection-package";
import { formatAed } from "@/features/booking/pricing";

type Schedule = {
  location: string;
  pickup: string;
  return: string;
  days: number;
};

type BookingSummaryPanelProps = {
  car: Car;
  schedule: Schedule;
  protection: ProtectionPackage | null;
  addons: Addon[];
  paymentOption: string;
  mileageOption: string;
  total: number;
  onPriceDetails: () => void;
};

const MomentRow = ({
  label,
  location,
  moment,
}: {
  label: string;
  location: string;
  moment: string;
}) => (
  <div className="flex gap-2">
    <MapPin className="mt-0.5 size-4 shrink-0 text-[#c9a86a]" />
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{location}</span>
      <span className="text-sm text-muted-foreground">{moment}</span>
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4 py-2 text-sm">
    <dt className="text-muted-foreground">{label}</dt>
    <dd className="text-right font-medium">{value}</dd>
  </div>
);

const BookingSummaryPanel = ({
  car,
  schedule,
  protection,
  addons,
  paymentOption,
  mileageOption,
  total,
  onPriceDetails,
}: BookingSummaryPanelProps) => (
  <aside className="flex h-fit flex-col gap-5 rounded-lg border border-[#c9a86a]/40 p-4 md:sticky md:top-6 md:gap-6 md:p-6 md:text-base">
    <div className="flex items-center gap-3">
      <Image
        src={car.imageUrl}
        alt={`${car.brand} ${car.name}`}
        width={160}
        height={112}
        className="h-16 w-24 shrink-0 rounded-md object-cover md:h-24 md:w-36"
      />
      <div className="flex flex-col">
        <span className="font-semibold md:text-lg">
          {car.brand} {car.name} {car.year}
        </span>
        <span className="text-sm text-muted-foreground">
          {schedule.days} Day(s)
        </span>
      </div>
    </div>

    <div className="flex flex-col gap-3 border-t border-[#c9a86a]/20 pt-4">
      <MomentRow
        label="Pickup"
        location={schedule.location}
        moment={schedule.pickup}
      />
      <MomentRow
        label="Return"
        location={schedule.location}
        moment={schedule.return}
      />
    </div>

    <dl className="flex flex-col divide-y divide-border border-t border-[#c9a86a]/20 pt-2">
      <DetailRow
        label="Insurance"
        value={protection ? protection.name : "Basic Protection"}
      />
      <DetailRow
        label="Add-ons"
        value={
          addons.length > 0
            ? addons.map((addon) => addon.name).join(", ")
            : "None"
        }
      />
      <DetailRow label="Payment option" value={paymentOption} />
      <DetailRow label="Mileage option" value={mileageOption} />
    </dl>

    <div className="flex items-end justify-between gap-4 border-t border-[#c9a86a]/20 pt-4">
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Total (Incl. Tax)</span>
        <span className="text-xl font-bold tabular-nums md:text-2xl">
          {formatAed(total)}
        </span>
        <button
          type="button"
          onClick={onPriceDetails}
          className="w-fit text-sm underline underline-offset-2"
        >
          Price details
        </button>
      </div>
    </div>
  </aside>
);

export default BookingSummaryPanel;
