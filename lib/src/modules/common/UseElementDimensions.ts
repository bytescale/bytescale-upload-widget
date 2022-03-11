import { useLayoutEffect, useState } from "preact/compat";
import { RectWithPos } from "uploader/modules/common/Rect";

export function useElementDimensions(element: HTMLElement | undefined): RectWithPos | undefined {
  const getLatestSize = (): RectWithPos | undefined => {
    if (element === undefined) {
      return undefined;
    }

    const domRect = element.getBoundingClientRect();
    return {
      width: domRect.width,
      height: domRect.height,
      x: element.offsetLeft,
      y: element.offsetTop
    };
  };

  const [dimensions, setDimensions] = useState<RectWithPos | undefined>(getLatestSize());

  useLayoutEffect(() => {
    const updateDimensions = (): void => setDimensions(getLatestSize());
    if (element === undefined) {
      return;
    }
    element.onload = updateDimensions;
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return dimensions;
}
