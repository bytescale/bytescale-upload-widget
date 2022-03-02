import { ReactNode } from "uploader/common/React";
import { JSX } from "preact";
import cn from "classnames";
import "./WidgetBase.scss";
import { UploaderLayout } from "uploader/UploaderLayout";
import { WidgetBaseBackground } from "uploader/components/widgets/widgetBase/WidgetBaseBackground";
import { useState } from "preact/compat";
import { modalCloseButtonPadding, modalCloseButtonSize } from "uploader/components/modal/Modal";

interface Props {
  children: ReactNode;
  htmlProps?: any;
  isDraggable?: boolean;
  isDragging?: boolean;
  layout: UploaderLayout;
}

export const WidgetBase = ({ children, htmlProps, isDraggable, isDragging, layout }: Props): JSX.Element => {
  const [containerId] = useState(`uploader__widget-base-${Math.round(Math.random() * 100000)}`);
  return (
    <div
      id={containerId}
      className={cn("uploader__widget-base", {
        "uploader__widget-base--draggable": isDraggable === true && layout !== "modal",
        "uploader__widget-base--dragging": isDragging === true && layout !== "modal"
      })}
      {...htmlProps}>
      {isDraggable === true && layout === "modal" && (
        <WidgetBaseBackground
          isDragging={isDragging === true}
          containerElementId={containerId}
          closeButtonSize={modalCloseButtonSize + modalCloseButtonPadding}
        />
      )}
      <div
        className={cn("uploader__widget-base__children", {
          "uploader__widget-base__children--has-modal": layout === "modal"
        })}>
        {children}
      </div>
    </div>
  );
};
