export type MaybeError<T> =
  | {
      type: "success";
      value: T;
    }
  | {
      type: "error";
      value: Error;
    };
