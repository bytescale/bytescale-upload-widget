import { ConfigError } from "uploader/components/widgets/configError/ConfigError";
import { UploaderWidget } from "uploader/components/widgets/uploader/UploaderWidget";
import { JSX } from "preact";
import { UploadInstanceMaybe } from "uploader/UploadInstanceMaybe";
import { UploaderParamsRequired } from "uploader/UploaderParams";
import { UploadedFile } from "upload-js";

export interface UploaderOrConfigErrorProps {
  params: UploaderParamsRequired;
  reject: (error: Error) => void;
  resolve: (files: UploadedFile[]) => void;
  upload: UploadInstanceMaybe;
}

export const UploaderOrConfigError = ({ upload, resolve, reject, params }: UploaderOrConfigErrorProps): JSX.Element => (
  <>
    {upload.type === "error" ? (
      <ConfigError error={upload.value} />
    ) : (
      <UploaderWidget resolve={resolve} reject={reject} params={params} upload={upload.value} />
    )}
  </>
);
