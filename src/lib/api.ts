export const readApiError = async (res: Response): Promise<string> => {
  const body = (await res.json().catch(() => null)) as {
    error?: string;
  } | null;
  return body?.error ?? `Request failed (${res.status})`;
};
