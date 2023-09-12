import { ReactNode } from "@bytescale/upload-widget/modules/common/React";
import { JSX } from "preact";
import cn from "classnames";
import "./WidgetBase.scss";
import { UploadWidgetLayout } from "@bytescale/upload-widget/config/UploadWidgetLayout";
import { WidgetBaseBackground } from "@bytescale/upload-widget/components/widgets/widgetBase/WidgetBaseBackground";
import { modalCloseButtonPadding, modalCloseButtonSize } from "@bytescale/upload-widget/components/modal/Modal";
import { getElementDimensionsOnResize } from "@bytescale/upload-widget/modules/common/UseDimensionsFromElement";

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
      className={cn("upload-widget__widget-base", `breakpoint-${breakpoint}`, {
        "upload-widget__widget-base--draggable": isDraggable === true && layout !== "modal",
        "upload-widget__widget-base--dragging": isDragging === true && layout !== "modal"
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
        className={cn("upload-widget__widget-base__children", {
          "upload-widget__widget-base__children--is-modal": layout === "modal"
        })}>
        {children}
      </div>
    </div>
  );
};
