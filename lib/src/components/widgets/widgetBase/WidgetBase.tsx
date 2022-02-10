import { ReactNode } from "uploader/common/React";
import { JSX } from "preact";
import cn from "classnames";

import "./WidgetBase.scss";

interface Props {
  children: ReactNode;
  htmlProps?: any;
  isDraggable?: boolean;
  isDragging?: boolean;
}

export const WidgetBase = ({ children, htmlProps, isDraggable, isDragging }: Props): JSX.Element => (
  <div
    className={cn("uploader__widget-base", {
      "uploader__widget-base--draggable": isDraggable,
      "uploader__widget-base--dragging": isDragging
    })}
    {...htmlProps}>
    {children}
  </div>
);
