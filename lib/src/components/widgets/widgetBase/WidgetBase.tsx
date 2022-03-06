import { ReactNode } from "uploader/common/React";
import { JSX } from "preact";
import cn from "classnames";
import "./WidgetBase.scss";
import { UploaderLayout } from "uploader/UploaderLayout";
import { WidgetBaseBackground } from "uploader/components/widgets/widgetBase/WidgetBaseBackground";
import { useState } from "preact/compat";
import { modalCloseButtonPadding, modalCloseButtonSize } from "uploader/components/modal/Modal";
import { useWindowSize } from "uploader/common/UseWindowSize";
import { useLayoutEffect } from "react";
import { Rect } from "uploader/common/Rect";

interface Props {
  children: ReactNode;
  htmlProps?: any;
  isDraggable?: boolean;
  isDragging?: boolean;
  layout: UploaderLayout;
}

export const WidgetBase = ({ children, htmlProps, isDraggable, isDragging, layout }: Props): JSX.Element => {
  const windowSize = useWindowSize();
  const [containerId] = useState(`uploader__widget-base-${Math.round(Math.random() * 100000)}`);
  const [dimensions, setDimensions] = useState<Rect | undefined>(undefined);
  const breakpoints = [
    { width: 650, value: "md" },
    { width: 930, value: "lg" }
  ];
  const lastBreakpoint = "xl";
  const breakpoint =
    (dimensions === undefined ? undefined : breakpoints.find(x => dimensions.width <= x.width)?.value) ??
    lastBreakpoint;

  useLayoutEffect(() => {
    setDimensions(document.querySelector(`#${containerId}`)?.getBoundingClientRect() ?? undefined);
  }, [windowSize]);

  return (
    <div
      id={containerId}
      className={cn("uploader__widget-base", `breakpoint-${breakpoint}`, {
        "uploader__widget-base--draggable": isDraggable === true && layout !== "modal",
        "uploader__widget-base--dragging": isDragging === true && layout !== "modal"
      })}
      {...htmlProps}>
      {isDraggable === true && layout === "modal" && (
        <WidgetBaseBackground
          isDragging={isDragging === true}
          dimensions={dimensions}
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
