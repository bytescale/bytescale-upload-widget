import { JSX } from "preact";
import { useState } from "preact/compat";
import { ReactNode } from "uploader/modules/common/React";

export interface GeometryWithProvenance<K> {
  lastUpdatedBy: K;
}

interface Props<T extends GeometryWithProvenance<K>, K extends string> {
  children?: ReactNode;
  className?: string;
  geometryMutatorId: K;
  onMove: (xDelta: number, yDelta: number, start: T) => void;
  startingValue: T;
  style?: JSX.CSSProperties;
}

export const Draggable = <T extends GeometryWithProvenance<K>, K extends string>({
  children,
  className,
  onMove: onMoveCallback,
  style,
  startingValue,
  geometryMutatorId
}: Props<T, K>): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [start, setStart] = useState(startingValue);

  const setPositionStart = (e: PointerEvent): void => {
    const x = e.pageX;
    const y = e.pageY;
    setStartX(x);
    setStartY(y);
  };
  const getPositionDelta = (e: PointerEvent): { x: number; y: number } => {
    return {
      x: e.pageX - startX + lastX,
      y: e.pageY - startY + lastY
    };
  };
  const onDown = (e: PointerEvent): void => {
    e.stopPropagation(); // Required so that if a draggable element exists within another draggable element, when the child element is dragged, the parent element is not.
    (e.target as any).setPointerCapture(e.pointerId);
    setIsDragging(true);
    setPositionStart(e);

    if (startingValue.lastUpdatedBy !== geometryMutatorId) {
      setLastX(0);
      setLastY(0);
      setStart(startingValue);
    }
  };
  const onUp = (e: PointerEvent): void => {
    setIsDragging(false);
    (e.target as any).releasePointerCapture(e.pointerId);
    const { x, y } = getPositionDelta(e);
    setLastY(y);
    setLastX(x);
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
