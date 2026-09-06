import { useMutation } from "@tanstack/react-query";

import type { BookingConfirmation, CreateBookingInput } from "@/shared/booking";
import { config } from "@/config";
import { withMinLoadingTime } from "@/lib/async";

import { createBookingRequest } from "./checkout.api";

export const useCreateBookingMutation = (
  onSuccess?: (confirmation: BookingConfirmation) => void,
) =>
  useMutation<BookingConfirmation, Error, CreateBookingInput>({
    mutationFn: (input) =>
      withMinLoadingTime(createBookingRequest(input), config.loading.minDelay),
    onSuccess,
  });
