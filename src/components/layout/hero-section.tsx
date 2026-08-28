"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FIELDS = [
  {
    key: "pickupLocation",
    label: "Pickup location",
    placeholder: "City",
  },
  {
    key: "returnLocation",
    label: "Return location",
    placeholder: "Same as pickup",
  },
  { key: "pickupDate", label: "Pickup date", placeholder: "Add date" },
  { key: "returnDate", label: "Return date", placeholder: "Add date" },
];

const HeroSection = () => {
  const [open, setOpen] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(null);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <>
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
              <span className="inline-flex items-center rounded-full bg-[#b0894f] px-6 py-2 text-sm font-bold text-white">
                Rent a Car
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div
            ref={containerRef}
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-stretch"
          >
            {FIELDS.map((field) => (
              <div key={field.key} className="relative min-w-0">
                <button
                  type="button"
                  onClick={() =>
                    setOpen((prev) => (prev === field.key ? null : field.key))
                  }
                  className={`flex w-full flex-col rounded-lg border bg-background px-4 py-2 text-left transition-colors ${
                    open === field.key
                      ? "border-[#b0894f] ring-1 ring-[#b0894f]"
                      : "border-black/10"
                  }`}
                >
                  <span className="text-xs font-semibold text-muted-foreground">
                    {field.label}
                  </span>
                  <span className="truncate text-sm font-normal text-muted-foreground">
                    {field.placeholder}
                  </span>
                </button>

                {open === field.key && (
                  <div className="absolute left-0 top-full z-30 mt-2 w-full min-w-64 rounded-lg border border-black/10 bg-background p-4 shadow-lg">
                    <p className="text-sm font-semibold">{field.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Popover content for {field.label.toLowerCase()}.
                    </p>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              className="rounded-lg bg-[#b0894f] px-8 py-3 text-sm font-bold text-white hover:bg-[#9a763f] sm:col-span-2 lg:col-span-1"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
