import { JSX, Fragment } from "preact";
import {
  UploadWidgetContainer,
  UploadWidgetContainerProps
} from "uploader/components/widgets/uploader/UploadWidgetContainer";
import { ModalContainer } from "uploader/components/modal/ModalContainer";
import { useEffect, useState } from "preact/compat";

interface Props {
  widgetProps: UploadWidgetContainerProps;
}

export const RootContainer = ({ widgetProps }: Props): JSX.Element => {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    widgetProps.options.onInit({
      close: () => {
        widgetProps.resolve([]);
      },
      reset: () => {
        setRefreshKey(x => x + 1);
      }
    });
  }, []);

  return (
    <Fragment key={refreshKey}>
      {widgetProps.options.layout === "modal" ? (
        <ModalContainer widgetProps={widgetProps} />
      ) : (
        <UploadWidgetContainer {...widgetProps} />
      )}
    </Fragment>
  );
};
