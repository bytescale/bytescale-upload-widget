import { useEffect, useState } from "preact/compat";

const transientFlagTimeout = 1500;

export function useTransientFlag(): [boolean, (onTimeout?: () => void) => void] {
  const [onTimeout, setOnTimeout] = useState<undefined | (() => void)>(undefined);

  useEffect(() => {
    if (onTimeout !== undefined) {
      const handle = setTimeout(() => {
        setOnTimeout(undefined);
        onTimeout();
      }, transientFlagTimeout);

      return () => clearTimeout(handle);
    }
    return () => {};
  }, [onTimeout]);

  return [onTimeout !== undefined, onTimeout => setOnTimeout(onTimeout ?? (() => {}))];
}
