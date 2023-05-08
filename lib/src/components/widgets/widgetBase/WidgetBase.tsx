import { ReactNode } from "uploader/modules/common/React";
import { JSX } from "preact";
import cn from "classnames";
import "./WidgetBase.scss";
import { UploadWidgetLayout } from "uploader/config/UploadWidgetLayout";
import { WidgetBaseBackground } from "uploader/components/widgets/widgetBase/WidgetBaseBackground";
import { modalCloseButtonPadding, modalCloseButtonSize } from "uploader/components/modal/Modal";
import { getElementDimensionsOnResize } from "uploader/modules/common/UseDimensionsFromElement";

interface Props {
  children: ReactNode;
  htmlProps?: any;
  isDraggable?: boolean;
  isDragging?: boolean;
  layout: UploadWidgetLayout;
  multi: boolean;
}

export const WidgetBase = ({ children, htmlProps, isDraggable, isDragging, layout }: Props): JSX.Element => {
  const [dimensions, containerRef] = getElementDimensionsOnResize(true, []);
  const breakpoints = [
    { width: 650, value: "md" },
    { width: 930, value: "lg" }
  ];
  const lastBreakpoint = "xl";
  const breakpoint =
    (dimensions === undefined ? undefined : breakpoints.find(x => dimensions.width <= x.width)?.value) ??
    lastBreakpoint;

  return (
    <div
      ref={containerRef}
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
          "uploader__widget-base__children--is-modal": layout === "modal"
        })}>
        {children}
      </div>
    </div>
  );
};
