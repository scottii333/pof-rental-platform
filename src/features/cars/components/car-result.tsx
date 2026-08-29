import React from "react";
import CarCard from "./car-card";
import { Car } from "@/shared/car";

type CarResultProps = {
  cars: Car[];
};

const CarResult = ({ cars }: CarResultProps) => {
  return (
    <section className="mx-auto my-4 w-[80%]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};

export default CarResult;
