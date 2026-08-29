"use client";

import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import type { RentalOption } from "@/shared/rental-options";

import { useCarsQuery } from "../cars.queries";
import CarResult from "./car-result";
import CarResultSkeleton from "./car-result-skeleton";

type CarSearchResultsProps = {
  paymentOptions: RentalOption[];
  mileageOptions: RentalOption[];
};

const Message = ({ children }: { children: string }) => (
  <section className="mx-auto my-6 w-[80%] text-center text-sm text-muted-foreground duration-300 animate-in fade-in">
    {children}
  </section>
);

const CarSearchResults = ({
  paymentOptions,
  mileageOptions,
}: CarSearchResultsProps) => {
  const params = useSearchParams();

  const hasSearch =
    params.has("pickupDateTime") && params.has("returnDateTime");
  const input = hasSearch
    ? {
        pickupLocation: params.get("pickupLocation") ?? "",
        returnLocation: params.get("returnLocation") ?? "",
        pickupDateTime: params.get("pickupDateTime") ?? "",
        returnDateTime: params.get("returnDateTime") ?? "",
      }
    : null;

  const query = useCarsQuery(input);

  if (!hasSearch) {
    return (
      <Message>
        Choose your locations and dates, then search to see available cars.
      </Message>
    );
  }

  if (query.isLoading) {
    return (
      <div className="duration-300 animate-in fade-in">
        <CarResultSkeleton />
      </div>
    );
  }

  if (query.isError && !query.data) {
    return (
      <Message>We couldn&apos;t load cars right now. Please try again.</Message>
    );
  }

  const cars = query.data ?? [];
  if (cars.length === 0) {
    return <Message>No cars available for these dates.</Message>;
  }

  const refreshing = query.isFetching;

  return (
    <div className="relative duration-300 animate-in fade-in">
      {refreshing && (
        <div className="pointer-events-none absolute inset-x-0 top-2 z-10 flex justify-center">
          <span className="flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs text-muted-foreground shadow">
            <Loader2 className="size-3.5 animate-spin" />
            Updating results…
          </span>
        </div>
      )}
      <div
        className={
          refreshing
            ? "opacity-60 transition-opacity duration-200"
            : "transition-opacity duration-200"
        }
      >
        <CarResult
          cars={cars}
          paymentOptions={paymentOptions}
          mileageOptions={mileageOptions}
        />
      </div>
    </div>
  );
};

export default CarSearchResults;
