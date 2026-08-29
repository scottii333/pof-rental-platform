import React from "react";
import HeroSection from "@/components/layout/hero-section";
import CarResult from "@/features/cars/components/car-result";
import { MOCK_CARS } from "@/features/cars/mock-cars";

const easytogo = () => {
  return (
    <main>
      <HeroSection />
      <CarResult cars={MOCK_CARS} />
    </main>
  );
};

export default easytogo;
