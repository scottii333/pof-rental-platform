import { Skeleton } from "@/components/ui/skeleton";

const CarCardSkeleton = () => {
  return (
    <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg border border-[#c9a86a]/40 bg-muted">
      {/* image area */}
      <Skeleton className="h-full w-full rounded-none bg-muted-foreground/10" />

      {/* brand logo */}
      <Skeleton className="absolute left-3 top-3 size-14 rounded-full" />

      {/* car name */}
      <Skeleton className="absolute right-3 top-3 h-5 w-1/2" />

      {/* seats / transmission + price */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
};

export default CarCardSkeleton;
