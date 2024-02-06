import { JSX, Fragment } from "preact";
import {
  UploadWidgetContainer,
  UploadWidgetContainerProps
} from "@bytescale/upload-widget/components/widgets/uploadWidget/UploadWidgetContainer";
import { ModalContainer } from "@bytescale/upload-widget/components/modal/ModalContainer";
import { useEffect, useState } from "preact/compat";
import cn from "classnames";
import { UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";
import { getElementDimensionsOnResize } from "@bytescale/upload-widget/modules/common/UseDimensionsFromElement";

interface Props {
  widgetProps: UploadWidgetContainerProps;
}

export const RootContainer = ({ widgetProps }: Props): JSX.Element => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [options, setOptions] = useState(widgetProps.options);
  const [dimensions, containerRef] = getElementDimensionsOnResize(true, []);
  const widgetPropsUpdated: UploadWidgetContainerProps = {
    ...widgetProps,
    options
  };

  useEffect(() => {
    options.onInit({
      close: () => {
        widgetProps.resolve([]);
      },
      reset: () => {
        setRefreshKey(x => x + 1);
        if (widgetProps.upload.type === "success") {
          widgetProps.upload.value.cancelAll();
        }
      },
      updateConfig: newOptionsPartial => {
        setOptions(UploadWidgetConfigRequired.from(newOptionsPartial));
      }
    });
  }, []);

  const isFullScreen =
    dimensions !== undefined &&
    (dimensions.width <= options.styles.breakpoints.fullScreenWidth ||
      dimensions.height <= options.styles.breakpoints.fullScreenHeight);

  return (
    <Fragment key={refreshKey}>
      <div
        ref={containerRef}
        className={cn("upload-widget", {
          "upload-widget--with-modal": options.layout === "modal",
          "upload-widget--full-screen": isFullScreen
        })}
        style={{
          "--error-color": options.styles.colors.error,
          "--primary-color": options.styles.colors.primary,
          "--primary-active-color": options.styles.colors.active,
          "--shade-100": options.styles.colors.shade100,
          "--shade-200": options.styles.colors.shade200,
          "--shade-300": options.styles.colors.shade300,
          "--shade-400": options.styles.colors.shade400,
          "--shade-500": options.styles.colors.shade500,
          "--shade-600": options.styles.colors.shade600,
          "--shade-700": options.styles.colors.shade700,
          "--shade-800": options.styles.colors.shade800,
          "--shade-900": options.styles.colors.shade900,
          "--base-font-family": options.styles.fontFamilies.base,
          "--base-font-size": `${options.styles.fontSizes.base}px`
        }}>
        {options.layout === "modal" ? (
          <ModalContainer widgetProps={widgetPropsUpdated} />
        ) : (
          <UploadWidgetContainer {...widgetPropsUpdated} />
        )}
      </div>
    </Fragment>
  );
};
