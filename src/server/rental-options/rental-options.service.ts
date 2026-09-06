import type { RentalOption } from "@/shared/rental-options";

import { HttpError, HttpStatus } from "../http-error";
import { rentalOptionsStore } from "./rental-options.store";

export const listPaymentOptions = (): Promise<RentalOption[]> =>
  rentalOptionsStore.listPayment();

export const listMileageOptions = (): Promise<RentalOption[]> =>
  rentalOptionsStore.listMileage();

export const getPaymentOption = async (
  id: string | null | undefined,
): Promise<RentalOption> => {
  const options = await rentalOptionsStore.listPayment();
  return options.find((option) => option.id === id) ?? options[0];
};

export const getMileageOption = async (
  id: string | null | undefined,
): Promise<RentalOption> => {
  const options = await rentalOptionsStore.listMileage();
  return options.find((option) => option.id === id) ?? options[0];
};

export const assertPaymentOption = async (
  id: string,
): Promise<RentalOption> => {
  const option = await rentalOptionsStore.findPayment(id);
  if (!option) {
    throw new HttpError(HttpStatus.Unprocessable, "Invalid payment option");
  }
  return option;
};

export const assertMileageOption = async (
  id: string,
): Promise<RentalOption> => {
  const option = await rentalOptionsStore.findMileage(id);
  if (!option) {
    throw new HttpError(HttpStatus.Unprocessable, "Invalid mileage option");
  }
  return option;
};
