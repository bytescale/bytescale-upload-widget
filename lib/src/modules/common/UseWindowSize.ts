import { isBrowser } from "uploader/modules/common/Constants";
import { useEffect, useState } from "preact/compat";

export interface WindowSize {
  windowHeight: number | undefined;
  windowWidth: number | undefined;
}

// Author: https://usehooks.com/useWindowSize/
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowWidth: isBrowser ? window.innerWidth : undefined,
    windowHeight: isBrowser ? window.innerHeight : undefined
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
