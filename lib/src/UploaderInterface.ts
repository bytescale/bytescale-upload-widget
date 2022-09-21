import { UploaderOptions } from "uploader/UploaderOptions";
import { UploaderResult } from "uploader/components/modal/UploaderResult";

export interface UploaderInterface {
  open: (options?: UploaderOptions) => Promise<UploaderResult[]>;
}
