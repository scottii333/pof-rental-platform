import "server-only";

import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { HttpError, HttpStatus } from "./http-error";

export function parseQuery<T extends Record<string, string>>(
  request: Request,
  keys: (keyof T)[],
): T {
  const search = new URL(request.url).searchParams;
  const result = {} as Record<string, string>;
  for (const key of keys) {
    result[key as string] = search.get(key as string) ?? "";
  }
  return result as T;
}

export async function readBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

interface ApiErrorBody {
  error: string;
  code: number;
  details?: unknown;
}

export function toApiError(error: unknown): NextResponse<ApiErrorBody> {
  if (error instanceof HttpError) {
    return NextResponse.json(
      { error: error.message, code: error.status, details: error.details },
      { status: error.status },
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Invalid input provided",
        code: HttpStatus.Unprocessable,
        details: error.flatten(),
      },
      { status: HttpStatus.Unprocessable },
    );
  }

  console.error("Unexpected API error:", error);
  return NextResponse.json(
    { error: "An unexpected error occurred", code: HttpStatus.ServerError },
    { status: HttpStatus.ServerError },
  );
}
