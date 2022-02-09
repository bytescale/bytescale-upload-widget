import { ConfigError } from "uploader/components/widgets/configError/ConfigError";
import { UploaderWidget } from "uploader/components/widgets/uploader/UploaderWidget";
import { JSX } from "preact";
import { UploadInstanceMaybe } from "uploader/UploadInstanceMaybe";
import { UploaderParamsRequired } from "uploader/UploaderParams";
import { UploadedFile } from "upload-js";

import "./UploaderRoot.scss";

export interface UploaderRootProps {
  params: UploaderParamsRequired;
  reject: (error: Error) => void;
  resolve: (files: UploadedFile[]) => void;
  upload: UploadInstanceMaybe;
}

export const UploaderRoot = ({ upload, resolve, reject, params }: UploaderRootProps): JSX.Element => (
  <>
    {upload.type === "error" ? (
      <ConfigError error={upload.value} />
    ) : (
      <UploaderWidget resolve={resolve} reject={reject} params={params} upload={upload.value} />
    )}
  </>
);
