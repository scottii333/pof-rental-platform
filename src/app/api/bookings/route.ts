import { NextResponse } from "next/server";

import { createBooking } from "@/server/booking/booking.service";
import { readBody, toApiError } from "@/server/api";

export const POST = async (request: Request): Promise<Response> => {
  try {
    const confirmation = await createBooking(await readBody(request));
    return NextResponse.json(confirmation, { status: 201 });
  } catch (error) {
    return toApiError(error);
  }
};
