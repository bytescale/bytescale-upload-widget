// Put this first, so other components' stylesheets can override the default styles.
import "./UploadWidgetContainer.scss";

import { ConfigError } from "uploader/components/widgets/configError/ConfigError";
import { UploadWidget } from "uploader/components/widgets/uploader/UploadWidget";
import { JSX } from "preact";
import { UploadInstanceMaybe } from "uploader/UploadInstanceMaybe";
import { UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";
import { UploadWidgetResult } from "uploader/components/modal/UploadWidgetResult";

export interface UploadWidgetContainerProps {
  options: UploadWidgetConfigRequired;
  reject: (error: Error) => void;
  resolve: (files: UploadWidgetResult[]) => void;
  upload: UploadInstanceMaybe;
}

export const UploadWidgetContainer = ({
  upload,
  resolve,
  reject,
  options
}: UploadWidgetContainerProps): JSX.Element => (
  <>
    {upload.type === "error" ? (
      <ConfigError error={upload.value} layout={options.layout} />
    ) : (
      <UploadWidget resolve={resolve} reject={reject} options={options} upload={upload.value} />
    )}
  </>
);
