import { NextResponse } from "next/server";

import { getBooking } from "@/server/booking/booking.service";
import { HttpError } from "@/server/http-error";

/** GET /api/bookings/:reference */
export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ reference: string }> }
) => {
  const { reference } = await params;

  try {
    const booking = await getBooking(reference);
    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
};
