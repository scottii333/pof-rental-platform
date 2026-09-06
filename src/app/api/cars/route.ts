import { NextResponse } from "next/server";

import { carsResponseSchema } from "@/shared/car";
import { searchCars } from "@/server/cars/cars.service";
import { handleApiError } from "@/lib/error-handler";
import { parseQueryParams } from "@/lib/request-parser";

interface GetCarsParams {
  pickupLocation: string;
  returnLocation: string;
  pickupDateTime: string;
  returnDateTime: string;
}

export const GET = async (request: Request): Promise<Response> => {
  try {
    const params = parseQueryParams<GetCarsParams>(request, [
      "pickupLocation",
      "returnLocation",
      "pickupDateTime",
      "returnDateTime",
    ]);

    const cars = await searchCars(params);
    const body = carsResponseSchema.parse({ cars });

    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
};
