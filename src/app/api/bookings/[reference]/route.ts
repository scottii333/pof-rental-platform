import { NextResponse } from "next/server";

import { getBooking } from "@/server/booking/booking.service";
import { toApiError } from "@/server/api";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ reference: string }> },
): Promise<Response> => {
  try {
    const { reference } = await params;
    const booking = await getBooking(reference);
    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    return toApiError(error);
  }
};
