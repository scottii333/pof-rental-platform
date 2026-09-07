import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => (
  <>
    <Skeleton className="h-[70dvh] max-h-[70dvh] w-full rounded-none" />

    <div className="relative z-20 -mt-10 flex w-full justify-center px-4 sm:-mt-14">
      <div className="w-full max-w-250 rounded-xl border border-black/10 bg-background px-4 pt-9 pb-4 shadow-lg">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
          <Skeleton className="h-14 w-full sm:col-span-2 lg:col-span-1" />
        </div>
      </div>
    </div>

    <div className="py-12">
      <div className="mx-auto flex w-full max-w-250 items-center gap-16 px-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-28 shrink-0" />
        ))}
      </div>
    </div>
  </>
);

export default HeroSkeleton;
