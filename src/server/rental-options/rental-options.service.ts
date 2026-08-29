import type { RentalOption } from "@/shared/rental-options";

import { HttpError } from "../http-error";
import { rentalOptionsStore } from "./rental-options.store";

export const listPaymentOptions = (): Promise<RentalOption[]> =>
  rentalOptionsStore.listPayment();

export const listMileageOptions = (): Promise<RentalOption[]> =>
  rentalOptionsStore.listMileage();

export const getPaymentOption = async (
  id: string | null | undefined,
): Promise<RentalOption> => {
  const list = await rentalOptionsStore.listPayment();
  return (id && list.find((option) => option.id === id)) || list[0];
};

export const getMileageOption = async (
  id: string | null | undefined,
): Promise<RentalOption> => {
  const list = await rentalOptionsStore.listMileage();
  return (id && list.find((option) => option.id === id)) || list[0];
};

export const assertPaymentOption = async (
  id: string,
): Promise<RentalOption> => {
  const option = await rentalOptionsStore.findPayment(id);
  if (!option) throw new HttpError(422, "Invalid payment option");
  return option;
};

export const assertMileageOption = async (
  id: string,
): Promise<RentalOption> => {
  const option = await rentalOptionsStore.findMileage(id);
  if (!option) throw new HttpError(422, "Invalid mileage option");
  return option;
};
