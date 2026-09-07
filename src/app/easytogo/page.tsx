import { Suspense } from "react";

import HeroSection from "@/components/layout/hero-section";
import HeroSkeleton from "@/components/layout/hero-skeleton";
import CarSearchResults from "@/features/cars/components/car-search-results";
import {
  listMileageOptions,
  listPaymentOptions,
} from "@/server/rental-options/rental-options.service";

const EasyToGoPage = async () => {
  const [paymentOptions, mileageOptions] = await Promise.all([
    listPaymentOptions(),
    listMileageOptions(),
  ]);

  return (
    <main>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
        <CarSearchResults
          paymentOptions={paymentOptions}
          mileageOptions={mileageOptions}
        />
      </Suspense>
    </main>
  );
};

export default EasyToGoPage;
