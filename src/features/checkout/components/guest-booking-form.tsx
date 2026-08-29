"use client";

import { useState } from "react";
import { Info, Loader2 } from "lucide-react";

import {
  guestBookingSchema,
  type GuestBookingInput,
} from "@/shared/guest-booking";
import { toast } from "@/components/ui/toast";
import { Switch } from "@/components/ui/switch";
import Disclosure from "@/features/booking/components/disclosure";
import PhoneField from "./phone-field";
import { fieldClass } from "./field-styles";

const notImplemented = (feature: string) =>
  toast.add({
    title: `${feature} coming soon`,
    description: "This is a mockup. The logic isn't implemented yet.",
    type: "info",
  });

type GuestBookingFormProps = {
  minLicenseYears: number;
  pending: boolean;
  onConfirm: (guest: GuestBookingInput) => void;
};

const GuestBookingForm = ({
  minLicenseYears,
  pending,
  onConfirm,
}: GuestBookingFormProps) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    retypeEmail: "",
    country: "",
    phone: "",
    agreeTerms: false,
    above25: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const parsed = guestBookingSchema.safeParse(values);
  const errors =
    submitted && !parsed.success ? parsed.error.flatten().fieldErrors : {};

  const set = <K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (!parsed.success || pending) return;
    onConfirm(parsed.data);
  };

  const fieldError = (key: string) =>
    (errors as Record<string, string[] | undefined>)[key]?.[0];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* <h1 className="text-center text-lg font-medium">
        Login to your account and use your membership discount if you have one
      </h1> */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => notImplemented("Login")}
          className="h-11 flex-1 rounded-md bg-[#c9a86a] text-sm font-medium text-white transition-colors hover:bg-[#c9a86a]/90"
        >
          Login
        </button>
        <span className="text-muted-foreground">|</span>
        <button
          type="button"
          onClick={() => notImplemented("Register")}
          className="h-11 flex-1 rounded-md border border-[#c9a86a]/40 text-sm font-medium transition-colors hover:bg-[#c9a86a]/10"
        >
          Register
        </button>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-[#c9a86a]/20" />
        Or
        <span className="h-px flex-1 bg-[#c9a86a]/20" />
      </div>

      <fieldset className="flex flex-col gap-4 rounded-lg border border-[#c9a86a]/40 p-4">
        <legend className="px-2 text-sm font-medium">Continue as guest</legend>

        <div className="flex flex-col gap-1">
          <input
            className={fieldClass}
            placeholder="Name"
            value={values.name}
            onChange={(event) => set("name", event.target.value)}
          />
          {fieldError("name") && (
            <span className="text-xs text-red-600">{fieldError("name")}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            className={fieldClass}
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={(event) => set("email", event.target.value)}
          />
          {fieldError("email") && (
            <span className="text-xs text-red-600">{fieldError("email")}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            className={fieldClass}
            type="email"
            placeholder="Retype Email"
            value={values.retypeEmail}
            onChange={(event) => set("retypeEmail", event.target.value)}
          />
          {fieldError("retypeEmail") && (
            <span className="text-xs text-red-600">
              {fieldError("retypeEmail")}
            </span>
          )}
        </div>

        <PhoneField
          country={values.country}
          phone={values.phone}
          onCountryChange={(country) => set("country", country)}
          onPhoneChange={(phone) => set("phone", phone)}
          error={fieldError("country") ?? fieldError("phone")}
        />

        <label className="flex items-center gap-3 text-sm">
          <Switch
            checked={values.agreeTerms}
            onCheckedChange={(checked) => set("agreeTerms", checked)}
            className="data-checked:bg-[#c9a86a]"
          />
          I agree to the terms and conditions
        </label>

        <label className="flex items-center gap-3 text-sm">
          <Switch
            checked={values.above25}
            onCheckedChange={(checked) => set("above25", checked)}
            className="data-checked:bg-[#c9a86a]"
          />
          I&apos;m above 25 years old.
        </label>

        {(fieldError("agreeTerms") || fieldError("above25")) && (
          <span className="text-xs text-red-600">
            {fieldError("agreeTerms") ?? fieldError("above25")}
          </span>
        )}

        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-[#c9a86a]" />
          Drivers must have held their UAE driving license for at least{" "}
          {minLicenseYears} year(s) for this vehicle. Other countries, please
          contact us for more info.
        </p>

        <Disclosure label="Important information about your reservation">
          <p>
            Bring the driver&apos;s license, a valid ID or passport, and the
            payment card used for the booking when collecting the car. The
            reservation is a prepaid rate and is charged immediately.
          </p>
        </Disclosure>

        <p className="text-xs text-muted-foreground">
          I have read and accept the{" "}
          <button
            type="button"
            onClick={() => notImplemented("Terms and Conditions")}
            className="underline underline-offset-2"
          >
            Terms and Conditions
          </button>
          , and the{" "}
          <button
            type="button"
            onClick={() => notImplemented("Privacy Policy")}
            className="underline underline-offset-2"
          >
            Privacy Policy
          </button>{" "}
          and I acknowledge that I am booking a prepaid rate, where the total
          reservation price is immediately charged to the payment method I
          provided.
        </p>

        <button
          type="submit"
          disabled={!parsed.success || pending}
          className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#c9a86a] text-sm font-medium text-white transition-colors hover:bg-[#c9a86a]/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending && <Loader2 className="size-4 animate-spin" />}
          {pending ? "Confirming…" : "Confirm Booking"}
        </button>

        <p className="text-xs text-muted-foreground">
          The email will be used to send you the booking confirmation.
        </p>
      </fieldset>
    </form>
  );
};

export default GuestBookingForm;
