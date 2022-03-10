import { JSX } from "preact";
import { useState } from "preact/compat";
import { ReactNode } from "uploader/modules/common/React";

interface Props<T> {
  children?: ReactNode;
  className?: string;
  onMove: (xDelta: number, yDelta: number, start: T) => void;
  startingValue: T;
  style?: JSX.CSSProperties;
}

export const Draggable = <T extends unknown>({
  children,
  className,
  onMove: onMoveCallback,
  style,
  startingValue
}: Props<T>): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false);
  const [previousX, setStartX] = useState(0);
  const [previousY, setStartY] = useState(0);
  const [start, setStart] = useState(startingValue);
  const setPositionStart = (e: PointerEvent): void => {
    const x = e.pageX;
    const y = e.pageY;
    setStartX(x);
    setStartY(y);
  };
  const getPositionDelta = (e: PointerEvent): { x: number; y: number } => {
    return {
      x: e.pageX - previousX,
      y: e.pageY - previousY
    };
  };
  const onDown = (e: PointerEvent): void => {
    e.stopPropagation(); // Required so that if a draggable element exists within another draggable element, when the child element is dragged, the parent element is not.
    setIsDragging(true);
    (e.target as any).setPointerCapture(e.pointerId);
    setPositionStart(e);
    setStart(startingValue);
  };
  const onUp = (e: PointerEvent): void => {
    setIsDragging(false);
    (e.target as any).releasePointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent): void => {
    if (!isDragging) {
      return;
    }
    const { x, y } = getPositionDelta(e);
    onMoveCallback(x, y, start);
  };
  return (
    <div
      className={className}
      style={style}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}>
      {children}
    </div>
  );
};
