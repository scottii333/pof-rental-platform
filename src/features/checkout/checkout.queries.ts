import { useMutation } from "@tanstack/react-query";

import type { BookingConfirmation, CreateBookingInput } from "@/shared/booking";

import { createBookingRequest } from "./checkout.api";

const MIN_SUBMIT_MS = 2000;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useCreateBookingMutation = (
  onSuccess?: (confirmation: BookingConfirmation) => void,
) =>
  useMutation<BookingConfirmation, Error, CreateBookingInput>({
    mutationFn: async (input) => {
      const [confirmation] = await Promise.all([
        createBookingRequest(input),
        wait(MIN_SUBMIT_MS),
      ]);
      return confirmation;
    },
    onSuccess,
  });
