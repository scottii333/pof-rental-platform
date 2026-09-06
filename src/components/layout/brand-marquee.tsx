import Image from "next/image";

import { CAR_BRANDS } from "@/features/cars/brands";

const MarqueeTrack = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
  <div
    aria-hidden={ariaHidden || undefined}
    className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-16 pr-16"
  >
    {CAR_BRANDS.map((brand) => (
      <Image
        key={brand.name}
        src={brand.logo}
        alt={ariaHidden ? "" : brand.name}
        width={120}
        height={56}
        className="h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 sm:h-14"
      />
    ))}
  </div>
);

const BrandMarquee = () => {
  return (
    <section className=" overflow-hidden py-12">
      <div className="relative mx-auto flex w-full max-w-250 overflow-hidden px-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <MarqueeTrack />
        <MarqueeTrack ariaHidden />
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};

export default BrandMarquee;
