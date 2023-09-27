// Put this first, so other components' stylesheets can override the default styles.
import "./UploadWidgetContainer.scss";

import { ConfigError } from "@bytescale/upload-widget/components/widgets/configError/ConfigError";
import { UploadWidget } from "@bytescale/upload-widget/components/widgets/uploadWidget/UploadWidget";
import { JSX } from "preact";
import { MaybeError } from "@bytescale/upload-widget/MaybeError";
import { UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";
import { UploadWidgetResult } from "@bytescale/upload-widget/model/UploadWidgetResult";
import { UploadTracker } from "@bytescale/upload-widget/modules/UploadTracker";

export interface UploadWidgetContainerProps {
  options: UploadWidgetConfigRequired;
  reject: (error: Error) => void;
  resolve: (files: UploadWidgetResult[]) => void;
  upload: MaybeError<UploadTracker>;
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
