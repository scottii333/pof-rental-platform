import { BRANCH_LOCATION } from "@/shared/search";

import { HttpError, HttpStatus } from "./http-error";

export const assertDubaiBranch = (
  pickupLocation: string,
  returnLocation: string,
): void => {
  if (
    pickupLocation !== BRANCH_LOCATION ||
    returnLocation !== BRANCH_LOCATION
  ) {
    throw new HttpError(
      HttpStatus.Unprocessable,
      "We only operate from the Dubai branch",
    );
  }
};
