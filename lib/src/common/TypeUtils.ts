export type Endo<T> = (item: T) => T;
export function isDefined<T>(object: T | undefined): object is T {
  return object !== undefined;
}
export function assertUnreachable(_x: never): never {
  throw new Error(`Didn't expect to get here: ${JSON.stringify(_x)}`);
}
