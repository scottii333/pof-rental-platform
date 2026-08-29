import { NextResponse } from "next/server";

import { carsResponseSchema } from "@/shared/car";
import { searchCars } from "@/server/cars/cars.service";
import { HttpError } from "@/server/http-error";

/** GET /api/cars?pickupLocation=&returnLocation=&pickupDateTime=&returnDateTime= */
export const GET = async (request: Request) => {
  const params = new URL(request.url).searchParams;

  try {
    const cars = await searchCars({
      pickupLocation: params.get("pickupLocation") ?? "",
      returnLocation: params.get("returnLocation") ?? "",
      pickupDateTime: params.get("pickupDateTime") ?? "",
      returnDateTime: params.get("returnDateTime") ?? "",
    });

    const body = carsResponseSchema.parse({ cars });
    return NextResponse.json(body, { status: 200 });
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
