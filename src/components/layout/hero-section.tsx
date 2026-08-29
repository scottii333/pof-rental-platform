"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import BrandMarquee from "./brand-marquee";
import DateTimePicker from "./date-time-picker";

const LOCATION = "Dubai Sheikh Zayed Road (POF Rental)";

const FIELDS = [
  {
    key: "pickupLocation",
    label: "Pickup location",
    placeholder: "Select location",
    type: "location" as const,
  },
  {
    key: "returnLocation",
    label: "Return location",
    placeholder: "Select location",
    type: "location" as const,
  },
  {
    key: "pickupDate",
    label: "Pickup date",
    placeholder: "Select a pickup date",
    type: "date" as const,
  },
  {
    key: "returnDate",
    label: "Return date",
    placeholder: "Select a return date",
    type: "date" as const,
  },
];

const HeroSection = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [dates, setDates] = useState<Record<string, Date>>({});
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
      <div className="relative h-[65dvh] max-h-[65dvh] w-full overflow-hidden">
        <Image
          src="/brand-logo/herosec.jpg"
          alt="Easy to Go car rental"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* gradient for legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* hero text */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-4 pb-40 sm:px-6 sm:pb-30">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl font-bold leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
              Drive the <span className="text-[#b0894f]">extraordinary</span>
            </h1>
            <p className="mt-3 text-sm text-white/85 sm:text-base">
              Luxury car rental in Dubai. Book in minutes.
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
                  <span
                    className={`truncate text-sm font-normal ${
                      values[field.key]
                        ? "text-black"
                        : "text-muted-foreground"
                    }`}
                  >
                    {values[field.key] || field.placeholder}
                  </span>
                </button>

                {open === field.key && (
                  <div
                    className={`absolute left-0 top-full z-30 mt-2 rounded-lg border border-black/10 bg-background p-3 shadow-lg ${
                      field.type === "date"
                        ? "w-full sm:w-md lg:w-120"
                        : "w-full lg:w-[200%] lg:min-w-[200%]"
                    }`}
                  >
                    {field.type === "location" ? (
                      <>
                      <p className="px-3 pb-2 pt-1 text-xs font-semibold text-muted-foreground">
                        Select location
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setValues((prev) => ({
                            ...prev,
                            [field.key]: LOCATION,
                          }));
                          setOpen(null);
                        }}
                        className={`flex w-full items-start gap-2 rounded-md px-3 py-2 text-left text-sm text-black transition-colors hover:bg-black/5 ${
                          values[field.key] === LOCATION
                            ? "font-semibold underline decoration-[#b0894f] underline-offset-4"
                            : ""
                        }`}
                      >
                        {LOCATION}
                      </button>
                      <p className="px-3 pb-1 pt-2 text-xs text-muted-foreground">
                        Operating hours: Mon–Sat, 9:00 AM – 6:00 PM
                      </p>
                      </>
                    ) : (
                      <DateTimePicker
                        minDate={
                          field.key === "returnDate"
                            ? dates.pickupDate
                            : undefined
                        }
                        onSelect={(display, date) => {
                          setValues((prev) => ({
                            ...prev,
                            [field.key]: display,
                          }));
                          setDates((prev) => ({ ...prev, [field.key]: date }));
                          setOpen(null);
                        }}
                      />
                    )}
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

      <BrandMarquee />
    </>
  );
};

export default HeroSection;
