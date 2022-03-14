import { useEffect, useState } from "preact/compat";

const transientFlagTimeout = 1500;

export function useTransientFlag(): [boolean, (onTimeout?: () => void) => void] {
  const [onTimeout, setOnTimeout] = useState<undefined | (() => void)>(undefined);
  const flag = onTimeout !== undefined;

  useEffect(() => {
    if (onTimeout !== undefined) {
      const handle = setTimeout(() => {
        setOnTimeout(undefined);
        onTimeout();
      }, transientFlagTimeout);

      return () => clearTimeout(handle);
    }
    return () => {};
  }, [flag]);

  return [flag, onTimeout => setOnTimeout(onTimeout ?? (() => {}))];
}
