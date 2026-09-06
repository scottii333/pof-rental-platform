export async function withMinLoadingTime<T>(
  promise: Promise<T>,
  minTimeMs: number,
): Promise<T> {
  const [result] = await Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, minTimeMs)),
  ]);
  return result;
}
