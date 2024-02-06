import { ReactNode } from "@bytescale/upload-widget/modules/common/React";
import { JSX } from "preact";
import cn from "classnames";
import "./UploadWidgetInternal.scss";
import { UploadWidgetLayout } from "@bytescale/upload-widget/config/UploadWidgetLayout";
import { UploadWidgetInternalBorder } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/internal/border/UploadWidgetInternalBorder";
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

export const UploadWidgetInternal = ({ children, htmlProps, isDraggable, isDragging, layout }: Props): JSX.Element => {
  const [dimensions, containerRef] = getElementDimensionsOnResize(true, []);

  // Size is relative to the internal dimensions of the upload widget, as opposed to the screen. This caters for the
  // widget entering "full screen" mode when being shrunk, which causes the internal dimensions of the widget to become
  // larger. Hence, we measure these breakpoints based off the internal widget size, rather than the screen size.
  const internalBreakpoints = [
    { width: 650, value: "md" },
    { width: 930, value: "lg" }
  ];

  const lastBreakpoint = "xl";
  const breakpoint =
    (dimensions === undefined ? undefined : internalBreakpoints.find(x => dimensions.width <= x.width)?.value) ??
    lastBreakpoint;

  return (
    <div
      ref={containerRef}
      className={cn("upload-widget__internal", `upload-widget__internal--${breakpoint}`, {
        "upload-widget__internal--draggable": isDraggable === true && layout !== "modal",
        "upload-widget__internal--dragging": isDragging === true && layout !== "modal"
      })}
      {...htmlProps}>
      {isDraggable === true && layout === "modal" && (
        <UploadWidgetInternalBorder
          isDragging={isDragging === true}
          dimensions={dimensions}
          closeButtonSize={modalCloseButtonSize + modalCloseButtonPadding}
        />
      )}
      <div
        className={cn("upload-widget__internal__children", {
          "upload-widget__internal__children--is-modal": layout === "modal"
        })}>
        {children}
      </div>
    </div>
  );
};
