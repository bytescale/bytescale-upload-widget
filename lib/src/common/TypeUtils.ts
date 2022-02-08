export type Endo<T> = (item: T) => T;
export function isDefined<T>(object: T | undefined): object is T {
  return object !== undefined;
}
