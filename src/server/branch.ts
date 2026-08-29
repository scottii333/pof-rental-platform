import { BRANCH_LOCATION } from "@/shared/search";

import { HttpError } from "./http-error";

export const assertBranch = (
  pickupLocation: string,
  returnLocation: string,
): void => {
  if (
    pickupLocation !== BRANCH_LOCATION ||
    returnLocation !== BRANCH_LOCATION
  ) {
    throw new HttpError(422, "We only operate from the Dubai branch");
  }
};
