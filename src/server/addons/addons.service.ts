import type { Addon } from "@/shared/addon";

import { HttpError, HttpStatus } from "../http-error";
import { addonsStore } from "./addons.store";

export const listAddons = async (): Promise<Addon[]> => addonsStore.list();

export const resolveAddons = async (ids: string[]): Promise<Addon[]> => {
  if (ids.length === 0) return [];

  const found = await addonsStore.findByIds(ids);
  if (found.length !== new Set(ids).size) {
    throw new HttpError(
      HttpStatus.Unprocessable,
      "One or more add-ons are invalid",
    );
  }
  return found;
};
