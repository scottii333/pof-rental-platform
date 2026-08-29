"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  validatePhoneNumberLength,
  type CountryCode,
} from "libphonenumber-js";

import { cn } from "@/lib/utils";
import { fieldClass } from "./field-styles";

const toFlag = (cc: string) =>
  cc.replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

type CountryOption = { cc: string; name: string; calling: string };

const SERVER_OPTIONS: CountryOption[] = [];
let clientOptions: CountryOption[] | null = null;

const getClientOptions = (): CountryOption[] => {
  if (!clientOptions) {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    clientOptions = getCountries()
      .map((cc) => ({
        cc,
        name: regionNames.of(cc) ?? cc,
        calling: getCountryCallingCode(cc),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  return clientOptions;
};

const subscribe = () => () => {};

type PhoneFieldProps = {
  country: string;
  phone: string;
  onCountryChange: (country: string) => void;
  onPhoneChange: (phone: string) => void;
  error?: string;
};

const PhoneField = ({
  country,
  phone,
  onCountryChange,
  onPhoneChange,
  error,
}: PhoneFieldProps) => {
  const options = useSyncExternalStore(
    subscribe,
    getClientOptions,
    () => SERVER_OPTIONS,
  );

  const callingCode = useMemo(
    () => (country ? getCountryCallingCode(country as CountryCode) : undefined),
    [country],
  );

  const handleCountry = (next: string) => {
    onCountryChange(next);
    if (next && phone) {
      onPhoneChange(new AsYouType(next as CountryCode).input(phone));
    }
  };

  const handlePhone = (raw: string) => {
    if (!country) {
      onPhoneChange(raw);
      return;
    }
    // Reject digits beyond this country's maximum length.
    if (
      raw.length > phone.length &&
      validatePhoneNumberLength(raw, country as CountryCode) === "TOO_LONG"
    ) {
      return;
    }
    onPhoneChange(new AsYouType(country as CountryCode).input(raw));
  };

  const isComplete = Boolean(
    country && phone && isValidPhoneNumber(phone, country as CountryCode),
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          className={cn(fieldClass, "sm:w-56")}
          value={country}
          onChange={(event) => handleCountry(event.target.value)}
          aria-label="Country"
        >
          <option value="">Select Country</option>
          {options.map((option) => (
            <option key={option.cc} value={option.cc}>
              {toFlag(option.cc)} {option.name} (+{option.calling})
            </option>
          ))}
        </select>

        <div className="relative flex-1">
          {callingCode && (
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-muted-foreground">
              +{callingCode}
            </span>
          )}
          <input
            className={cn(
              fieldClass,
              callingCode && "pl-14",
              isComplete && "pr-10",
            )}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(event) => handlePhone(event.target.value)}
          />
          {isComplete && (
            <Check className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#c9a86a]" />
          )}
        </div>
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};

export default PhoneField;
