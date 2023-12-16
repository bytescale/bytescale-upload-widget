import { JSX } from "preact";
import { useState } from "preact/compat";
import { ReactNode } from "@bytescale/upload-widget/modules/common/React";
import { Rect } from "@bytescale/upload-widget/modules/common/Rect";

export interface GeometryWithProvenance<K> {
  lastUpdatedBy: K;
}

interface Props<T extends GeometryWithProvenance<K>, K extends string> {
  boundary: Rect;
  children?: ReactNode;
  className?: string;
  deltaCacheKey: K | undefined;
  onMove: (xDelta: number, yDelta: number, start: T) => void;
  startingValue: T;
  style?: JSX.CSSProperties;
}

export const Draggable = <T extends GeometryWithProvenance<K>, K extends string>({
  boundary,
  children,
  className,
  onMove: onMoveCallback,
  style,
  startingValue,
  deltaCacheKey
}: Props<T, K>): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [lastXDelta, setLastXDelta] = useState(0);
  const [lastYDelta, setLastYDelta] = useState(0);
  const [start, setStart] = useState(startingValue);

  const clip = (min: number, max: number, value: number): number => Math.min(Math.max(value, min), max);
  const clipDimension = (length: number, value: number): number => clip(length * -1, length, value);

  const setPositionStart = (e: PointerEvent): void => {
    setStartX(e.pageX);
    setStartY(e.pageY);
  };
  const getPositionDelta = (e: PointerEvent): { x: number; y: number } => {
    return {
      x: e.pageX - startX + lastXDelta,
      y: e.pageY - startY + lastYDelta
    };
  };
  const onDown = (e: PointerEvent): void => {
    e.stopPropagation(); // Required so that if a draggable element exists within another draggable element, when the child element is dragged, the parent element is not.
    (e.target as any).setPointerCapture(e.pointerId);
    setIsDragging(true);
    setPositionStart(e);

    if (deltaCacheKey === undefined || startingValue.lastUpdatedBy !== deltaCacheKey) {
      setLastXDelta(0);
      setLastYDelta(0);
      setStart(startingValue);
    }
  };
  const onUp = (e: PointerEvent): void => {
    setIsDragging(false);
    (e.target as any).releasePointerCapture(e.pointerId);
    const { x, y } = getPositionDelta(e);
    setLastYDelta(clipDimension(boundary.height, y));
    setLastXDelta(clipDimension(boundary.width, x));
  };
  const onMove = (e: PointerEvent): void => {
    if (!isDragging) {
      return;
    }
    const { x, y } = getPositionDelta(e);
    onMoveCallback(x, y, start);
  };
  const onTouchStart = (e: TouchEvent): void => {
    // Cancel scrolling on mobile, which causes dragging to immediately halt after it's started.
    e.preventDefault();
  };
  return (
    <div
      className={className}
      style={style}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onTouchStart={onTouchStart}>
      {children}
    </div>
  );
};
