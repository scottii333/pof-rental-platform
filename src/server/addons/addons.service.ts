import type { Addon } from "@/shared/addon";

import { HttpError } from "../http-error";
import { addonsStore } from "./addons.store";

export const listAddons = async (): Promise<Addon[]> => addonsStore.list();

/** Resolve add-on ids, rejecting the request if any id is unknown. */
export const resolveAddons = async (ids: string[]): Promise<Addon[]> => {
  if (ids.length === 0) return [];
  const found = await addonsStore.findByIds(ids);
  if (found.length !== new Set(ids).size) {
    throw new HttpError(422, "One or more add-ons are invalid");
  }
  return found;
};
