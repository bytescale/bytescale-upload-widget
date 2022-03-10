import cn from "classnames";
import { DashedBackgroundSvg } from "uploader/assets/svgs/DashedBackgroundSvg";
import { JSX } from "preact";
import { Rect } from "uploader/modules/common/Rect";

interface Props {
  closeButtonSize: number;
  dimensions: Rect | undefined;
  isDragging: boolean;
}

export const WidgetBaseBackground = ({ closeButtonSize, isDragging, dimensions }: Props): JSX.Element => {
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
