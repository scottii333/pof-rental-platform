import type { ZodType } from "zod";

export async function apiFetch<T>(
  path: string,
  schema: ZodType<T>,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(path, init);

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

  return schema.parse(await res.json());
}

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: unknown };
    if (typeof body.error === "string") return body.error;
  } catch {}
  return `Request failed (${res.status})`;
}
