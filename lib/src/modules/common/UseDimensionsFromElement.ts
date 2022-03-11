import { useCallback, useLayoutEffect, useState } from "preact/compat";
import { RectWithPos } from "uploader/modules/common/Rect";

export function useElementRef(): [HTMLElement | undefined, (e: HTMLElement | null) => void] {
  const [element, setElement] = useState<HTMLElement | undefined>(undefined);
  const elementRef = useCallback((e: HTMLElement | null) => {
    setElement(e ?? undefined);
  }, []);

  return [element, elementRef];
}

export function getElementDimensionsOnResize(): [RectWithPos | undefined, (element: HTMLElement | null) => void] {
  const [element, elementRef] = useElementRef();
  const dimensions = doGetElementDimensionsOnResize(element, element);
  return [dimensions, elementRef];
}

export function getElementDimensionsOnParentResize(): [
  RectWithPos | undefined,
  (element: HTMLElement | null) => void,
  (parentElement: HTMLElement | null) => void
] {
  const [element, elementRef] = useElementRef();
  const [parentElement, parentElementRef] = useElementRef();
  const dimensions = doGetElementDimensionsOnResize(element, parentElement);
  return [dimensions, elementRef, parentElementRef];
}

function doGetElementDimensionsOnResize(
  element: HTMLElement | undefined,
  parentElement: HTMLElement | undefined
): RectWithPos | undefined {
  const [dimensions, setDimensions] = useState<RectWithPos | undefined>(getDimensionsFromElement(element));

  useLayoutEffect(() => {
    const updateDimensions = (): void => setDimensions(getDimensionsFromElement(element));
    if (element === undefined || parentElement === undefined) {
      return;
    }
    element.onload = updateDimensions;
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(parentElement);
    return () => observer.disconnect();
  }, [element]);

  return dimensions;
}

function getDimensionsFromElement(element: HTMLElement | undefined): RectWithPos | undefined {
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
}
