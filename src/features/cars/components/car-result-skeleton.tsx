import CarCardSkeleton from "./car-card-skeleton";

const CarResultSkeleton = ({ count = 8 }: { count?: number }) => (
  <section className="mx-auto my-4 w-[80%]">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <CarCardSkeleton key={index} />
      ))}
    </div>
  </section>
);

export default CarResultSkeleton;
