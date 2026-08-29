import type { RentalOption } from "@/shared/rental-options";

type CarBookingOptionsProps = {
  paymentOptions: RentalOption[];
  mileageOptions: RentalOption[];
};

const OptionSection = ({
  legend,
  option,
}: {
  legend: string;
  option: RentalOption;
}) => (
  <section className="flex flex-col gap-2">
    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {legend}
    </h3>
    <div className="flex items-start gap-3 rounded-lg border border-[#c9a86a] bg-[#c9a86a]/10 p-4">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-[#c9a86a]">
        <span className="size-2.5 rounded-full bg-[#c9a86a]" />
      </span>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold">{option.title}</span>
        <span className="text-sm leading-snug text-muted-foreground">
          {option.description}
        </span>
      </div>
      <span className="shrink-0 text-sm font-semibold text-[#c9a86a]">
        {option.badge}
      </span>
    </div>
  </section>
);

const CarBookingOptions = ({
  paymentOptions,
  mileageOptions,
}: CarBookingOptionsProps) => (
  <div className="flex flex-col gap-5">
    <OptionSection legend="Payment option" option={paymentOptions[0]} />
    <OptionSection legend="Mileage allowance" option={mileageOptions[0]} />
  </div>
);

export default CarBookingOptions;
