import Image from "next/image";

const HeroSection = () => {
  return (
    <>
      {" "}
      {/* hero image */}
      <div className="relative h-[70dvh] max-h-[70dvh] w-full overflow-hidden">
        <Image
          src="/brand-logo/herosec.jpg"
          alt="Easy to Go car rental"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* hero text */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-4 pb-40 sm:px-6 sm:pb-30">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Your road trip starts here.
            </h1>
            <p className="mt-3 text-sm text-white/80 sm:text-base">
              Rent a car in minutes. Free cancellation, no hidden fees, pickup
              wherever you are.
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-20 -mt-10 w-full px-4 flex justify-center sm:-mt-14">
        <div className="relative w-full max-w-250 rounded-xl border border-black/10 bg-background pt-9 pb-4 px-4 shadow-lg">
          {/* Tab label */}
          <div className="absolute left-4 top-0 -translate-y-1/2">
            <div className="inline-flex items-center rounded-full bg-background p-1.5 shadow">
              <span className="inline-flex items-center rounded-full bg-slate-700 px-6 py-2 text-sm font-bold text-white">
                Rent a Car
              </span>
            </div>
          </div>

          {/* Search bar  */}
          <div className="h-12 w-full" />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
