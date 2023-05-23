import { JSX, Fragment } from "preact";
import {
  UploadWidgetContainer,
  UploadWidgetContainerProps
} from "uploader/components/widgets/uploader/UploadWidgetContainer";
import { ModalContainer } from "uploader/components/modal/ModalContainer";
import { useEffect, useState } from "preact/compat";
import cn from "classnames";
import { UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";

interface Props {
  widgetProps: UploadWidgetContainerProps;
}

export const RootContainer = ({ widgetProps }: Props): JSX.Element => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [options, setOptions] = useState(widgetProps.options);

  useEffect(() => {
    options.onInit({
      close: () => {
        widgetProps.resolve([]);
      },
      reset: () => {
        setRefreshKey(x => x + 1);
      },
      updateConfig: newOptionsPartial => {
        setOptions(UploadWidgetConfigRequired.from(newOptionsPartial));
      }
    });
  }, []);

  return (
    <Fragment key={refreshKey}>
      <div
        className={cn("uploader", { "uploader--with-modal": options.layout === "modal" })}
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
          <ModalContainer widgetProps={widgetProps} />
        ) : (
          <UploadWidgetContainer {...widgetProps} />
        )}
      </div>
    </Fragment>
  );
};
