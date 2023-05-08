import { useCallback, useLayoutEffect, useState } from "preact/compat";
import { RectWithPos } from "uploader/modules/common/Rect";

export function useElementRef(): [HTMLElement | undefined, (e: HTMLElement | null) => void] {
  const [element, setElement] = useState<HTMLElement | undefined>(undefined);
  const elementRef = useCallback((e: HTMLElement | null) => {
    setElement(e ?? undefined);
  }, []);

  return [element, elementRef];
}

export function getElementDimensionsOnResize(
  isElementReady: boolean,
  imageSizeDeps: unknown[]
): [RectWithPos | undefined, (element: HTMLElement | null) => void] {
  const [element, elementRef] = useElementRef();
  const dimensions = doGetElementDimensionsOnResize(isElementReady, element, element, imageSizeDeps);
  return [dimensions, elementRef];
}

export function getElementDimensionsOnParentResize(
  isElementReady: boolean,
  imageSizeDeps: unknown[]
): [RectWithPos | undefined, (element: HTMLElement | null) => void, (parentElement: HTMLElement | null) => void] {
  const [element, elementRef] = useElementRef();
  const [parentElement, parentElementRef] = useElementRef();
  const dimensions = doGetElementDimensionsOnResize(isElementReady, element, parentElement, imageSizeDeps);
  return [dimensions, elementRef, parentElementRef];
}

function doGetElementDimensionsOnResize(
  isElementReady: boolean,
  element: HTMLElement | undefined,
  parentElement: HTMLElement | undefined,
  imageSizeDeps: unknown[]
): RectWithPos | undefined {
  // Must be 'undefined' to begin with, as these dimensions will be zero'd if the element isn't ready (i.e. it's an image and hasn't loaded yet).
  // IMPORTANT: do not override 'onload' for an image to achieve this, as we're already setting the attribute elsewhere, so don't want to overwrite the handler.
  const [dimensions, setDimensions] = useState<RectWithPos | undefined>(undefined);

  useLayoutEffect(() => {
    const updateDimensions = (): void => {
      if (isElementReady) {
        setDimensions(getDimensionsFromElement(element));
      }
    };

    if (element === undefined || parentElement === undefined) {
      return;
    }

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(parentElement);
    return () => observer.disconnect();
  }, [element, isElementReady, ...imageSizeDeps]);

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
