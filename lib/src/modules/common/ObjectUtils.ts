export function removeUndefinedAndNullFields<T>(value: Partial<T>): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, value]) => (value ?? undefined) !== undefined)) as Partial<
    T
  >;
}
