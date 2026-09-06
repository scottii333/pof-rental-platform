import { NextResponse } from "next/server";

import { carsResponseSchema } from "@/shared/car";
import { searchCars } from "@/server/cars/cars.service";
import { parseQuery, toApiError } from "@/server/api";

type CarSearchQuery = {
  pickupLocation: string;
  returnLocation: string;
  pickupDateTime: string;
  returnDateTime: string;
};

export const GET = async (request: Request): Promise<Response> => {
  try {
    const query = parseQuery<CarSearchQuery>(request, [
      "pickupLocation",
      "returnLocation",
      "pickupDateTime",
      "returnDateTime",
    ]);

    const cars = await searchCars(query);

    return NextResponse.json(carsResponseSchema.parse({ cars }), { status: 200 });
  } catch (error) {
    return toApiError(error);
  }
};
