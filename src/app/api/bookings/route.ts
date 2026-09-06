import { NextResponse } from "next/server";

import { createBooking } from "@/server/booking/booking.service";
import { handleApiError } from "@/lib/error-handler";
import { parseRequestBody } from "@/lib/request-parser";

export const POST = async (request: Request): Promise<Response> => {
  try {
    const payload = await parseRequestBody(request);
    const confirmation = await createBooking(payload);

    return NextResponse.json(confirmation, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
};
