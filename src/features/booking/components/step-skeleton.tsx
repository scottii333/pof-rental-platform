import { Skeleton } from "@/components/ui/skeleton";

const StepSkeleton = () => (
  <div className="mx-auto w-[80%]">
    <div className="my-6 flex flex-col gap-6 pb-24">
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-6 w-72" />
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-28 w-full" />
        ))}
      </div>
    </div>

    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#c9a86a]/30 bg-background/95">
      <div className="mx-auto flex w-[80%] items-center justify-between gap-3 py-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  </div>
);

export default StepSkeleton;
