import { NextResponse } from "next/server";

import { createBooking } from "@/server/booking/booking.service";
import { HttpError } from "@/server/http-error";

/** POST /api/bookings */
export const POST = async (request: Request) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const confirmation = await createBooking(payload);
    return NextResponse.json(confirmation, { status: 201 });
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
