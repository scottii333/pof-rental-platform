/** Helpers for reading Next.js `searchParams` values in Server Components. */

type ParamValue = string | string[] | undefined;

/** A single string value, or `undefined` when absent or repeated. */
export const readParam = (value: ParamValue): string | undefined =>
  typeof value === "string" ? value : undefined;

/** A comma-separated list (`"a,b,c"`) as an array; `[]` when absent. */
export const readParamList = (value: ParamValue): string[] =>
  typeof value === "string" && value.length > 0 ? value.split(",") : [];
