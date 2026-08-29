import { Loader2 } from "lucide-react";

import { formatAed } from "@/features/booking/pricing";

type BookingSummaryBarProps = {
  total: number;
  loading?: boolean;
  nextLabel?: string;
  onPriceDetails: () => void;
  onNext: () => void;
};

const BookingSummaryBar = ({
  total,
  loading = false,
  nextLabel = "Next",
  onPriceDetails,
  onNext,
}: BookingSummaryBarProps) => (
  <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#c9a86a]/30 bg-background/95 backdrop-blur duration-300 animate-in fade-in slide-in-from-bottom-4">
    <div className="mx-auto grid w-[80%] grid-cols-[1fr_auto] items-center gap-3 py-4">
      <div className="flex min-w-0 flex-col">
        <span className="text-xs text-muted-foreground sm:text-sm">
          Total Price
        </span>
        <span
          key={total}
          className="truncate text-lg font-bold tabular-nums duration-200 animate-in fade-in sm:text-xl"
        >
          {formatAed(total)}
        </span>
        <button
          type="button"
          onClick={onPriceDetails}
          className="w-fit text-xs underline underline-offset-2 sm:text-sm"
        >
          Price details
        </button>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={loading}
        className="inline-flex h-10 min-w-24 items-center justify-center rounded-md bg-[#c9a86a] px-6 text-sm font-medium text-white transition-colors hover:bg-[#c9a86a]/90 disabled:opacity-80 sm:px-8"
      >
        {loading ? <Loader2 className="size-4 animate-spin" /> : nextLabel}
      </button>
    </div>
  </div>
);

export default BookingSummaryBar;
