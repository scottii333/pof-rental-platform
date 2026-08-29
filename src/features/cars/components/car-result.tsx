import type { Car } from "@/shared/car";
import type { RentalOption } from "@/shared/rental-options";

import CarCard from "./car-card";

type CarResultProps = {
  cars: Car[];
  paymentOptions: RentalOption[];
  mileageOptions: RentalOption[];
};

const CarResult = ({ cars, paymentOptions, mileageOptions }: CarResultProps) => {
  return (
    <section className="mx-auto my-4 w-[80%]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            paymentOptions={paymentOptions}
            mileageOptions={mileageOptions}
          />
        ))}
      </div>
    </section>
  );
};

export default CarResult;
