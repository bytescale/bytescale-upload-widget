// Put this first, so other components' stylesheets can override the default styles.
import "./UploaderRoot.scss";

import { ConfigError } from "uploader/components/widgets/configError/ConfigError";
import { UploaderWidget } from "uploader/components/widgets/uploader/UploaderWidget";
import { JSX } from "preact";
import { UploadInstanceMaybe } from "uploader/UploadInstanceMaybe";
import { UploaderOptionsRequired } from "uploader/UploaderOptions";
import { UploaderResult } from "uploader/components/modal/UploaderResult";

export interface UploaderRootProps {
  options: UploaderOptionsRequired;
  reject: (error: Error) => void;
  resolve: (files: UploaderResult[]) => void;
  upload: UploadInstanceMaybe;
}

export const UploaderRoot = ({ upload, resolve, reject, options }: UploaderRootProps): JSX.Element => (
  <>
    {upload.type === "error" ? (
      <ConfigError error={upload.value} layout={options.layout} />
    ) : (
      <UploaderWidget resolve={resolve} reject={reject} options={options} upload={upload.value} />
    )}
  </>
);
