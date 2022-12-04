import { UploaderOptions } from "uploader/UploaderOptions";
import { UploaderResult } from "uploader/components/modal/UploaderResult";
import { UploadInterface } from "upload-js";

export interface UploaderInterface extends UploadInterface {
  open: (options?: UploaderOptions) => Promise<UploaderResult[]>;
}
