import cn from "classnames";
import { DashedBackgroundSvg } from "uploader/assets/svgs/DashedBackgroundSvg";
import { JSX } from "preact";
import { useWindowSize } from "uploader/common/UseWindowSize";
import { useLayoutEffect, useState } from "preact/compat";

interface Props {
  closeButtonSize: number;
  containerElementId: string;
  isDragging: boolean;
}

interface Rect {
  height: number;
  width: number;
}

export const WidgetBaseBackground = ({ closeButtonSize, containerElementId, isDragging }: Props): JSX.Element => {
  const windowSize = useWindowSize();
  const [dimensions, setDimensions] = useState<Rect | undefined>(undefined);

  useLayoutEffect(() => {
    setDimensions(document.querySelector(`#${containerElementId}`)?.getBoundingClientRect() ?? undefined);
  }, [windowSize]);

  if (dimensions === undefined) {
    return <></>;
  }

  return (
    <DashedBackgroundSvg
      width={dimensions.width}
      height={dimensions.height}
      notchSize={closeButtonSize}
      className={cn("uploader__widget-base__modal-bg", { "uploader__widget-base__modal-bg--dragging": isDragging })}
    />
  );
};
